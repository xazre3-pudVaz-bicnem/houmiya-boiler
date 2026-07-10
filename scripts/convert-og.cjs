const sharp = require('sharp')
const fs = require('fs')
const path = require('path')

const svgPath = path.join(process.cwd(), 'public/og-image.svg')
const outPath = path.join(process.cwd(), 'public/og-image.png')
const svg = fs.readFileSync(svgPath)

sharp(svg, { density: 200 })
  .resize(1200, 630)
  .png()
  .toFile(outPath)
  .then((info) => console.log('OK', info.width + 'x' + info.height, outPath))
  .catch((e) => { console.error('FAIL', e.message); process.exit(1) })
