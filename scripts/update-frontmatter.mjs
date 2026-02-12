import fs from 'node:fs'
import path from 'node:path'
import { execSync } from 'node:child_process'
import matter from 'gray-matter'

const TARGET_EXTS = new Set(['.md', '.mdx'])

function formatIsoWithOffset(date) {
  const pad = (value) => String(value).padStart(2, '0')
  const offsetMinutes = -date.getTimezoneOffset()
  const sign = offsetMinutes >= 0 ? '+' : '-'
  const abs = Math.abs(offsetMinutes)
  const hours = pad(Math.floor(abs / 60))
  const minutes = pad(abs % 60)
  return `${date.getFullYear()}-${pad(date.getMonth() + 1)}-${pad(date.getDate())}T${pad(
    date.getHours()
  )}:${pad(date.getMinutes())}:${pad(date.getSeconds())}${sign}${hours}:${minutes}`
}

function getDefaultAuthor() {
  try {
    const name = execSync('git config user.name', { stdio: ['ignore', 'pipe', 'ignore'] })
      .toString()
      .trim()
    return name || 'unknown'
  } catch {
    return 'unknown'
  }
}

function listStagedFiles() {
  try {
    const output = execSync('git diff --cached --name-only --diff-filter=ACM', {
      stdio: ['ignore', 'pipe', 'ignore']
    })
      .toString()
      .trim()
    return output ? output.split(/\r?\n/) : []
  } catch {
    return []
  }
}

function resolveFiles(args) {
  const input = args.length ? args : listStagedFiles()
  return input
    .map((file) => file.trim())
    .filter(Boolean)
    .filter((file) => TARGET_EXTS.has(path.extname(file)))
}

function updateFile(file, now, author) {
  const raw = fs.readFileSync(file, 'utf8')
  const parsed = matter(raw)
  const data = { ...parsed.data }

  let changed = false

  if (!data.created) {
    data.created = now
    changed = true
  }

  if (!data.updated) {
    data.updated = now
    changed = true
  } else if (data.updated !== now) {
    data.updated = now
    changed = true
  }

  if (!data.author) {
    data.author = author
    changed = true
  }

  if (!changed) return false

  const next = matter.stringify(parsed.content, data)
  fs.writeFileSync(file, next)
  return true
}

const now = formatIsoWithOffset(new Date())
const author = getDefaultAuthor()
const files = resolveFiles(process.argv.slice(2))

if (files.length === 0) {
  process.exit(0)
}

const updated = []
for (const file of files) {
  if (!fs.existsSync(file)) continue
  if (updateFile(file, now, author)) {
    updated.push(file)
  }
}

if (updated.length > 0) {
  const inRepo = updated.filter((file) => !path.isAbsolute(file))
  if (inRepo.length > 0) {
    try {
      execSync(`git add ${inRepo.map((file) => `"${file}"`).join(' ')}`)
    } catch {
      // ignore staging errors
    }
  }
}
