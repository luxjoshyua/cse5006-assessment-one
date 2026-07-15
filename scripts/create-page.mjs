import { existsSync, mkdirSync, writeFileSync } from "node:fs"
import { join } from "node:path"

const route = process.argv[2]

if (!route) {
  console.error("Usage: pnpm page route-name")
  process.exit(1)
}

if (!/^[a-z0-9-]+$/.test(route)) {
  console.error(
    "Route must be lowercase kebab-case, for example: settings or user-profile",
  )
  process.exit(1)
}

const title = route
  .split("-")
  .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
  .join(" ")

const componentName = `${title.replaceAll(" ", "")}Page`
const pageDir = join("app", route)
const pageFile = join(pageDir, "page.tsx")

if (existsSync(pageFile)) {
  console.error(`Page already exists: ${pageFile}`)
  process.exit(1)
}

mkdirSync(pageDir, { recursive: true })

writeFileSync(
  pageFile,
  `export default function ${componentName}() {
  return (
    <section>
      <h1>${title}</h1>
    </section>
  )
}
`,
)

console.log(`Created ${pageFile}`)
