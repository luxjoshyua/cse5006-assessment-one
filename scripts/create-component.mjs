import { existsSync, mkdirSync, writeFileSync } from "node:fs"
import { join } from "node:path"

const name = process.argv[2]

if (!name) {
  console.error("Usage: pnpm component ComponentName")
  process.exit(1)
}

if (!/^[A-Z][A-Za-z0-9]*$/.test(name)) {
  console.error("Component name must be PascalCase, for example: Footer")
  process.exit(1)
}

const componentDir = join("components", name)
const componentFile = join(componentDir, `${name}.tsx`)
const indexFile = join(componentDir, "index.ts")

if (existsSync(componentDir)) {
  console.error(`Component already exists: ${componentDir}`)
  process.exit(1)
}

mkdirSync(componentDir, { recursive: true })

writeFileSync(
  componentFile,
  `export type Props = Record<string, never>

export default function ${name}() {
  return null
}
`,
)

writeFileSync(
  indexFile,
  `export { default } from "./${name}"
export type { Props as ${name}Props } from "./${name}"
`,
)

console.log(`Created ${componentDir}`)
