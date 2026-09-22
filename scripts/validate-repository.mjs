#!/usr/bin/env node

import fs from 'node:fs'
import path from 'node:path'
import process from 'node:process'
import { fileURLToPath } from 'node:url'

const scriptDirectory = path.dirname(fileURLToPath(import.meta.url))
const repositoryRoot = path.resolve(scriptDirectory, '..')
const skillRoot = path.join(repositoryRoot, 'skills', 'omega-panel')
const codeQualitySkillRoot = path.join(repositoryRoot, 'skills', 'code-quality')
const failures = []

function fail(message) {
  failures.push(message)
}

function collectMarkdownFiles(directory) {
  const files = []

  for (const entry of fs.readdirSync(directory, { withFileTypes: true })) {
    if (entry.name === '.git' || entry.name === 'node_modules') continue

    const target = path.join(directory, entry.name)
    if (entry.isDirectory()) files.push(...collectMarkdownFiles(target))
    else if (entry.isFile() && entry.name.endsWith('.md')) files.push(target)
  }

  return files
}

const requiredPaths = [
  'SKILL.md',
  'agents/openai.yaml',
  'assets/omega-panel-logo.png',
  'references/application-shell-and-forms.md',
  'references/dashboard-design.md',
  'references/form-controls.md',
  'references/initial-app-loader.md',
  'references/package-selection.md',
  'references/skeleton-loaders.md',
  'templates/dashboard-plan.md',
  'checklists/dashboard-review.md',
]

for (const relativePath of requiredPaths) {
  const absolutePath = path.join(skillRoot, relativePath)
  if (!fs.existsSync(absolutePath)) fail(`Missing required skill file: ${relativePath}`)
}

const skillPath = path.join(skillRoot, 'SKILL.md')
if (fs.existsSync(skillPath)) {
  const skill = fs.readFileSync(skillPath, 'utf8')
  const frontmatter = skill.match(/^---\r?\n([\s\S]*?)\r?\n---/)

  if (!frontmatter) {
    fail('SKILL.md must begin with YAML frontmatter')
  } else {
    const metadata = frontmatter[1]
    if (!/^name:\s*omega-panel\s*$/m.test(metadata)) {
      fail('SKILL.md frontmatter name must be omega-panel')
    }
    if (!/^description:\s*\S.+$/m.test(metadata)) {
      fail('SKILL.md frontmatter must include a non-empty description')
    }
  }
}

const codeQualityRequiredPaths = [
  'SKILL.md',
  'agents/openai.yaml',
  'references/react-typescript-structure.md',
]

for (const relativePath of codeQualityRequiredPaths) {
  const absolutePath = path.join(codeQualitySkillRoot, relativePath)
  if (!fs.existsSync(absolutePath)) {
    fail(`Missing required code-quality skill file: ${relativePath}`)
  }
}

const codeQualitySkillPath = path.join(codeQualitySkillRoot, 'SKILL.md')
if (fs.existsSync(codeQualitySkillPath)) {
  const skill = fs.readFileSync(codeQualitySkillPath, 'utf8')
  const frontmatter = skill.match(/^---\r?\n([\s\S]*?)\r?\n---/)

  if (!frontmatter) {
    fail('code-quality/SKILL.md must begin with YAML frontmatter')
  } else {
    const metadata = frontmatter[1]
    if (!/^name:\s*code-quality\s*$/m.test(metadata)) {
      fail('code-quality/SKILL.md frontmatter name must be code-quality')
    }
    if (!/^description:\s*\S.+$/m.test(metadata)) {
      fail('code-quality/SKILL.md frontmatter must include a non-empty description')
    }
  }
}

const logoPath = path.join(skillRoot, 'assets', 'omega-panel-logo.png')
if (fs.existsSync(logoPath)) {
  const signature = fs.readFileSync(logoPath).subarray(0, 8).toString('hex')
  if (signature !== '89504e470d0a1a0a') fail('omega-panel-logo.png is not a valid PNG file')
}

const markdownFiles = collectMarkdownFiles(repositoryRoot)
let relativeLinkCount = 0
const markdownLink = /!?\[[^\]]*\]\(([^)]+)\)/g

for (const markdownPath of markdownFiles) {
  const markdown = fs.readFileSync(markdownPath, 'utf8')

  for (const match of markdown.matchAll(markdownLink)) {
    let target = match[1].trim()
    if (/^(?:https?:|mailto:|#)/i.test(target)) continue

    target = target.replace(/^<|>$/g, '').split('#')[0]
    if (!target) continue

    relativeLinkCount += 1
    const resolved = path.resolve(path.dirname(markdownPath), decodeURIComponent(target))
    if (!fs.existsSync(resolved)) {
      fail(
        `Broken relative link in ${path.relative(repositoryRoot, markdownPath)}: ${match[1]}`,
      )
    }
  }
}

if (failures.length > 0) {
  for (const message of failures) console.error(`ERROR: ${message}`)
  process.exit(1)
}

console.log('Omega Panel repository validation passed.')
console.log(`Checked ${markdownFiles.length} Markdown files and ${relativeLinkCount} relative links.`)
