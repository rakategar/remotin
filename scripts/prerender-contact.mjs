// After `vite build`: write dist/contact/index.html with its own title, description and canonical,
// so /contact is indexed as its own page instead of a copy of the home page.
import { mkdirSync, readFileSync, writeFileSync } from 'node:fs'

const html = readFileSync('dist/index.html', 'utf8')
const title = 'Contact remot.in · PT Remotin Cloud Infrastructure'
const desc = 'Send a message to the remot.in team about Wanychat, Remotin Play, partnerships or cloud infrastructure. It goes straight to contact@remot.in.'

const out = html
  .replace(/<title>[^<]*<\/title>/, `<title>${title}</title>`)
  .replace(/(<meta name="description" content=")[^"]*/, `$1${desc}`)
  .replace(/(<meta property="og:title" content=")[^"]*/, `$1${title}`)
  .replace(/(<meta property="og:description" content=")[^"]*/, `$1${desc}`)
  .replace(/(<meta name="twitter:title" content=")[^"]*/, `$1${title}`)
  .replace(/(<meta name="twitter:description" content=")[^"]*/, `$1${desc}`)
  .replace(/(<meta property="og:url" content=")[^"]*/, '$1https://www.remot.in/contact')
  .replace(/<link rel="canonical" href="[^"]*" \/>/, '<link rel="canonical" href="https://www.remot.in/contact" />')
  .replace(/\s*<link rel="alternate" hreflang="[^"]*" href="[^"]*" \/>/g, '')
  .replace(/<h1>[^<]*<\/h1>/, '<h1>Contact remot.in</h1>')

mkdirSync('dist/contact', { recursive: true })
writeFileSync('dist/contact/index.html', out)
console.log('prerendered dist/contact/index.html')
