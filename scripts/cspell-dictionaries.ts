/**
 * A simple script to generate CSpell dictionaries from dependencies in your package.json
 */
import pkg from '../package.json'
import { resolve, join } from 'path'
import { writeFile, mkdir, access } from 'fs/promises'

const CSPELL_DICTIONARIES_PATH = resolve(process.cwd(), '.cspell/dictionaries')
const CSPELL_SCOPES_DICTIONARY_PATH = join(
  CSPELL_DICTIONARIES_PATH,
  'scopes.txt',
)
const CSPELL_DEPENDENCIES_DICTIONARY_PATH = join(
  CSPELL_DICTIONARIES_PATH,
  'dependencies.txt',
)
const CSPELL_DEV_DEPENDENCIES_DICTIONARY_PATH = join(
  CSPELL_DICTIONARIES_PATH,
  'devDependencies.txt',
)

type Dependencies = Record<string, string>

function createScopesDict(deps: Dependencies): string[] {
  const scopes = new Set<string>()

  for (const dep of Object.keys(deps)) {
    const [scope, name] = dep.split('/')

    if (scope && name) {
      scopes.add(scope)
      scopes.add(scope.slice(1))
    }
  }

  return Array.from(scopes)
}

function createDepsDict(deps: Dependencies): string {
  return (
    Object.keys(deps)
      // Exclude scope names from the dictionary since they are already in the scopes dictionary
      .map((x) => (x.includes('/') ? x.split('/')[1] : x))
      .join('\n')
  )
}

async function main() {
  const allDependencies = { ...pkg.dependencies, ...pkg.devDependencies }
  const scopesDict = createScopesDict(allDependencies).join('\n')
  const cspellDict = createDepsDict(pkg.dependencies)
  const cspellDevDict = createDepsDict(pkg.devDependencies)

  try {
    await access(CSPELL_DICTIONARIES_PATH)
  } catch {
    await mkdir(CSPELL_DICTIONARIES_PATH, { recursive: true })
  }

  await Promise.all([
    writeFile(CSPELL_SCOPES_DICTIONARY_PATH, scopesDict),
    writeFile(CSPELL_DEPENDENCIES_DICTIONARY_PATH, cspellDict),
    writeFile(CSPELL_DEV_DEPENDENCIES_DICTIONARY_PATH, cspellDevDict),
  ])
}

// eslint-disable-next-line @typescript-eslint/no-floating-promises
main()
