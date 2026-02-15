import fs from 'node:fs'
import path from 'node:path'
import readline from 'node:readline'

const TEMPLATE_PATH = path.resolve('templates/page.mdx')

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

function prompt(question) {
  const rl = readline.createInterface({ input: process.stdin, output: process.stdout })
  return new Promise((resolve) => {
    rl.question(question, (answer) => {
      rl.close()
      resolve(answer.trim())
    })
  })
}

const routePath = await prompt('Route path (e.g. biology/new-topic or overview): ')
if (!routePath) {
  console.error('Route path is required.')
  process.exit(1)
}

const langInput = await prompt('Language (ja/en, empty = ja): ')
const lang = langInput || 'ja'
if (!['ja', 'en'].includes(lang)) {
  console.error('Language must be ja or en.')
  process.exit(1)
}

if (!fs.existsSync(TEMPLATE_PATH)) {
  console.error(`Template not found: ${TEMPLATE_PATH}`)
  process.exit(1)
}

const normalized = routePath.replace(/^\/+|\/+$/g, '')
if (!normalized) {
  console.error('Route path must not be empty.')
  process.exit(1)
}

const targetDir = path.resolve('pages', lang, normalized)
fs.mkdirSync(targetDir, { recursive: true })

const template = fs.readFileSync(TEMPLATE_PATH, 'utf8')
const created = formatIsoWithOffset(new Date())

const content = template.replace(/^created:\s*$/m, `created: ${created}`)

const targetPath = path.join(targetDir, 'index.mdx')
fs.writeFileSync(targetPath, content)

console.log(`Created: ${path.relative(process.cwd(), targetPath)}`)
