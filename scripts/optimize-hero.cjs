const sharp = require('sharp')
const fs = require('fs')
const path = require('path')

const src = path.join(process.cwd(), 'public/hero-banner.png')
const out = path.join(process.cwd(), 'public/hero-banner.webp')

sharp(src)
  .webp({ quality: 88 })
  .toFile(out)
  .then(() => {
    const before = (fs.statSync(src).size / 1024 / 1024).toFixed(2)
    const after = (fs.statSync(out).size / 1024).toFixed(0)
    console.log(`hero: ${before}MB (png) -> ${after}KB (webp)`)
  })
  .catch((e) => { console.error('FAIL', e.message); process.exit(1) })
