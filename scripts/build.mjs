import fs from 'node:fs'
fs.rmSync('dist', { recursive: true, force: true })
fs.mkdirSync('dist', { recursive: true })
for (const file of ['index.html', 'app.js', 'lib.js', 'styles.css', 'favicon.svg', 'questions.json', 'sw.js', 'manifest.webmanifest']) {
  const source = fs.existsSync(file) ? file : `public/${file}`
  fs.copyFileSync(source, `dist/${file}`)
}
fs.writeFileSync('dist/.nojekyll','')
console.log('Publicación estática preparada en dist/')
