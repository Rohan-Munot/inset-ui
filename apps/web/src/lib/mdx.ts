import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';

const DOCS_DIR = path.join(process.cwd(), 'content/docs');

export interface Doc {
  slug: string[];
  slugString: string;
  url: string;
  frontmatter: {
    title: string;
    description?: string;
    [key: string]: any;
  };
  content: string;
  toc: TOCItem[];
}

export interface TOCItem {
  title: string;
  url: string;
  depth: number;
}

export interface TreeNode {
  type: 'page' | 'folder';
  name: string;
  url?: string;
  children?: TreeNode[];
  description?: string;
}

// Get all MDX files recursively
function getMdxFiles(dir: string): string[] {
  if (!fs.existsSync(dir)) return [];
  
  const entries = fs.readdirSync(dir, { withFileTypes: true });
  let files: string[] = [];

  for (const entry of entries) {
    const fullPath = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      files = [...files, ...getMdxFiles(fullPath)];
    } else if (entry.isFile() && entry.name.endsWith('.mdx')) {
      files.push(fullPath);
    }
  }

  return files;
}

export async function getDocBySlug(slug: string[]): Promise<Doc | null> {
  const slugPath = slug.join('/');
  const filePath = path.join(DOCS_DIR, `${slugPath}.mdx`);
  const indexPath = path.join(DOCS_DIR, `${slugPath}/index.mdx`);

  let finalPath = filePath;
  if (!fs.existsSync(finalPath)) {
    if (fs.existsSync(indexPath)) {
      finalPath = indexPath;
    } else {
      return null;
    }
  }

  const fileContent = fs.readFileSync(finalPath, 'utf8');
  const { data, content } = matter(fileContent);
  const toc = extractTOC(content);

  return {
    slug,
    slugString: slugPath,
    url: `/docs/${slugPath}`,
    frontmatter: data as any,
    content,
    toc,
  };
}

export function getAllDocs(): Doc[] {
  const files = getMdxFiles(DOCS_DIR);
  return files.map((file) => {
    const relativePath = path.relative(DOCS_DIR, file);
    const slugString = relativePath.replace(/\/index\.mdx$/, '').replace(/\.mdx$/, '');
    const slug = slugString.split(path.sep);
    
    // Normalize slug for Windows paths
    const normalizedSlug = slug.map(s => s.replace(/\\/g, '/'));
    const normalizedSlugString = normalizedSlug.join('/');

    const fileContent = fs.readFileSync(file, 'utf8');
    const { data, content } = matter(fileContent);
    const toc = extractTOC(content);

    return {
      slug: normalizedSlug,
      slugString: normalizedSlugString,
      url: `/docs/${normalizedSlugString === 'index' ? '' : normalizedSlugString}`,
      frontmatter: data as any,
      content,
      toc,
    };
  });
}

// Simple TOC extractor (matches ## headings)
function extractTOC(content: string): TOCItem[] {
  const headings: TOCItem[] = [];
  const lines = content.split('\n');
  const codeBlockRegex = /^```/;
  let inCodeBlock = false;

  for (const line of lines) {
    if (codeBlockRegex.test(line)) {
      inCodeBlock = !inCodeBlock;
      continue;
    }

    if (inCodeBlock) continue;

    // Match ## Heading
    const match = line.match(/^(#{2,4})\s+(.+)$/);
    if (match) {
      const depth = match[1].length;
      const title = match[2].trim();
      // Simple slugify
      const url = '#' + title
        .toLowerCase()
        .replace(/[^a-z0-9\s-]/g, '')
        .replace(/\s+/g, '-');

      headings.push({
        title,
        url,
        depth,
      });
    }
  }
  return headings;
}

export function getDocsTree(): TreeNode[] {
  const docs = getAllDocs();
  const root: TreeNode[] = [];

  // Sort docs by url length to process parents first (naive approach, better to build tree)
  // Actually, let's build a proper tree from paths
  
  const folders: Record<string, TreeNode> = {};

  // First pass: Create folders and pages
  docs.forEach(doc => {
    // Skip root index for now, handle it separately if needed
    if (doc.slugString === 'index') return;

    const parts = doc.slug;
    const isIndex = doc.slug[doc.slug.length - 1] === 'index';
    
    // For "components/button", parts are ["components", "button"]
    
    let currentLevel = root;
    let pathAcc = '';

    parts.forEach((part, index) => {
      pathAcc = pathAcc ? `${pathAcc}/${part}` : part;
      const isLast = index === parts.length - 1;

      // Check if existing node at this level
      let existing = currentLevel.find(n => n.name === part || (n.type === 'page' && n.url?.endsWith(`/${part}`)));

      if (existing) {
        if (existing.type === 'folder') {
          currentLevel = existing.children!;
        }
      } else {
        if (isLast) {
           // It's a page
           const newNode: TreeNode = {
             type: 'page',
             name: doc.frontmatter.title || part,
             url: doc.url,
             description: doc.frontmatter.description
           };
           currentLevel.push(newNode);
        } else {
          // It's a folder (intermediate path)
          // Check if we already have a folder for this (maybe created by index.mdx of that folder)
          
          const newFolder: TreeNode = {
            type: 'folder',
            name: part.charAt(0).toUpperCase() + part.slice(1), // Capitalize folder name as fallback
            children: []
          };
          currentLevel.push(newFolder);
          currentLevel = newFolder.children!;
        }
      }
    });
  });

  // Second pass: Sort (Folders first, then files? or alphabetical?)
  // Let's sort alphabetically for now
  const sortNodes = (nodes: TreeNode[]) => {
    nodes.sort((a, b) => {
       if (a.type === b.type) return a.name.localeCompare(b.name);
       return a.type === 'folder' ? 1 : -1; // Pages first? Or folders first? Usually mixed or explicit.
    });
    nodes.forEach(node => {
      if (node.children) sortNodes(node.children);
    });
  };
  
  sortNodes(root);

  return root;
}

export function getNeighbours(url: string): { previous?: TreeNode; next?: TreeNode } {
  const tree = getDocsTree();
  const flatNodes: TreeNode[] = [];

  function flatten(nodes: TreeNode[]) {
    for (const node of nodes) {
      if (node.type === 'page' && node.url) {
        flatNodes.push(node);
      } else if (node.type === 'folder' && node.children) {
        // If folder has index page, include it
        if (node.url) {
            flatNodes.push(node); // It acts as a page too
        }
        flatten(node.children);
      }
    }
  }

  flatten(tree);

  const index = flatNodes.findIndex((node) => node.url === url);
  if (index === -1) return {};

  return {
    previous: flatNodes[index - 1],
    next: flatNodes[index + 1],
  };
}
