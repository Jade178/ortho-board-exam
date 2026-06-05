const http=require('http'),fs=require('fs'),path=require('path');
const root=__dirname,types={'.html':'text/html','.js':'text/javascript','.css':'text/css','.json':'application/json'};
http.createServer((req,res)=>{let p=decodeURIComponent(req.url.split('?')[0]);if(p==='/')p='/index.html';const fp=path.join(root,p);fs.readFile(fp,(e,d)=>{if(e){res.writeHead(404);res.end('404');return;}res.writeHead(200,{'Content-Type':types[path.extname(fp)]||'text/plain'});res.end(d);});}).listen(8753,()=>console.log('Ortho On-Call running at http://localhost:8753'));
