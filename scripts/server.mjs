import http from 'node:http';
import { readFile } from 'node:fs/promises';
const root = new URL('../', import.meta.url);
const files = new Map([['/','index.html'],['/index.html','index.html'],['/styles.css','styles.css'],['/app.js','app.js'],['/assets/ribbon.webp','assets/ribbon.webp'],['/assets/favicon.svg','assets/favicon.svg'],['/assets/manrope-regular.ttf','assets/manrope-regular.ttf'],['/assets/manrope-bold.ttf','assets/manrope-bold.ttf']]);
const types={html:'text/html; charset=utf-8',css:'text/css; charset=utf-8',js:'text/javascript; charset=utf-8',webp:'image/webp',svg:'image/svg+xml',ttf:'font/ttf'};
// Local-only responsive harness; excluded from the static build.
files.set('/__preview/mobile','tests/mobile.html');
files.set('/background.js','background.js');
export const server=http.createServer(async(req,res)=>{
  const headers={'X-Content-Type-Options':'nosniff','Referrer-Policy':'no-referrer','Content-Security-Policy':"default-src 'self'; script-src 'self'; style-src 'self'; img-src 'self'; font-src 'self'; connect-src 'none'; object-src 'none'; base-uri 'none'; frame-ancestors 'none'; form-action 'none'",'Permissions-Policy':'camera=(), microphone=(), geolocation=()','Cache-Control':'no-cache'};
  if(!['GET','HEAD'].includes(req.method)){res.writeHead(405,{...headers,Allow:'GET, HEAD'});res.end();return;}
  let route;try{route=new URL(req.url,'http://localhost').pathname;}catch{res.writeHead(400,headers);res.end();return;}
  const file=files.get(route);if(!file){res.writeHead(404,headers);res.end('Not found');return;}
  try{const data=await readFile(new URL(file,root));const csp=headers['Content-Security-Policy'].replace("frame-ancestors 'none'", "frame-ancestors 'self'");res.writeHead(200,{...headers,'Content-Security-Policy':csp,'Content-Type':types[file.split('.').pop()]});res.end(req.method==='HEAD'?undefined:data);}catch{res.writeHead(500,headers);res.end('Preview unavailable');}
});
if(process.argv[1]?.replaceAll('\\','/').endsWith('/scripts/server.mjs'))server.listen(Number(process.env.PORT||4173),'127.0.0.1',()=>console.log('Elle arrive: http://127.0.0.1:4173'));
