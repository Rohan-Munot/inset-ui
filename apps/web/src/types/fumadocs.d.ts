import type { TOCItemType } from "fumadocs-core/toc";
import type { MDXContent } from "mdx/types";

declare module "fumadocs-core/source" {
  interface PageData {
    body: MDXContent;
    toc: TOCItemType[];
  }
}
