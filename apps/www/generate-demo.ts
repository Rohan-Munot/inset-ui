import fs from 'fs'
import path from 'path'

const REGISTRY_DIR = path.join(process.cwd(), 'registry', 'default')
const DEMO_DIR = path.join(process.cwd(), 'components', 'demo')

async function generateDemoFiles() {
  try {
    // Ensure demo directory exists
    if (!fs.existsSync(DEMO_DIR)) {
      fs.mkdirSync(DEMO_DIR, { recursive: true })
      console.log('✅ Created demo directory')
    }

    // Read all files from registry/default
    const registryFiles = fs.readdirSync(REGISTRY_DIR)
    const tsxFiles = registryFiles.filter((file) => file.endsWith('.tsx'))

    console.log(`📁 Found ${tsxFiles.length} registry files`)

    for (const file of tsxFiles) {
      const sourcePath = path.join(REGISTRY_DIR, file)
      const fileName = path.basename(file, '.tsx')
      const demoFileName = `${fileName}-demo.tsx`
      const targetPath = path.join(DEMO_DIR, demoFileName)

      // Read the source file content
      const sourceContent = fs.readFileSync(sourcePath, 'utf-8')

      // Write to demo directory
      fs.writeFileSync(targetPath, sourceContent)

      console.log(`✅ Generated: ${demoFileName}`)
    }

    console.log(`\n🎉 Successfully generated ${tsxFiles.length} demo files!`)
    console.log(`📍 Demo files location: ${DEMO_DIR}`)
  } catch (error) {
    console.error('❌ Error generating demo files:', error)
    process.exit(1)
  }
}

// Run the script
generateDemoFiles()
