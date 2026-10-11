import http from 'node:http'
import fs from 'node:fs'
import path from 'node:path'
const root = process.cwd()
const types = {'.html':'text/html; charset=utf-8','.js':'text/javascript; charset=utf-8','.css':'text/css; charset=utf-8','.json':'application/json; charset=utf-8','.webmanifest':'application/manifest+json; charset=utf-8','.svg':'image/svg+xml'}
const port=Number(process.env.PORT)||5173
const server=http.createServer((req,res)=>{
  const pathname=new URL(req.url,'http://localhost').pathname
  const target=path.resolve(root,'.'+decodeURIComponent(pathname === '/'? '/index.html':pathname))
  if(!(target===root||target.startsWith(root+path.sep))){res.writeHead(403).end('Forbidden');return}
  fs.readFile(target,(err,data)=>{
    if(err){res.writeHead(404).end('Not found');return}
    res.writeHead(200,{'Content-Type':types[path.extname(target)]||'application/octet-stream','Cache-Control':'no-store','X-Content-Type-Options':'nosniff'})
    res.end(data)
  })
})
server.listen(port,'0.0.0.0',()=>console.log(`RayoMed Discovery: http://localhost:${port}`))
