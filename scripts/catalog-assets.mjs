import fs from 'node:fs';
import path from 'node:path';
import crypto from 'node:crypto';
const root=path.resolve('assets');
function walk(dir){return fs.readdirSync(dir,{withFileTypes:true}).flatMap(e=>e.isDirectory()?walk(path.join(dir,e.name)):[path.join(dir,e.name)]);}
const assets=walk(root).sort().map(file=>{const data=fs.readFileSync(file);const relative=path.relative(process.cwd(),file).replaceAll('\\','/');return {id:relative.replace(/^assets\//,'').replace(/[^a-zA-Z0-9]+/g,'-').toLowerCase(),sourcePath:relative,bytes:data.length,sha256:crypto.createHash('sha256').update(data).digest('hex'),kind:file.endsWith('.mp3')?'audio':'image',dimensions:file.endsWith('.png')?{width:data.readUInt32BE(16),height:data.readUInt32BE(20)}:null,license:'unknown',sourceUrl:null,reviewStatus:'not-previewed',approvedUses:[],suggestedUses:file.endsWith('.mp3')?['optional-feedback-review-required']:['illustration-review-required'],inUse:false};});
fs.mkdirSync('studio',{recursive:true});fs.writeFileSync('studio/asset-catalog.json',JSON.stringify({version:1,sourceProject:'The-Career-Compass-Book',assets},null,2)+'\n');
console.log(JSON.stringify({assets:assets.length,audio:assets.filter(a=>a.kind==='audio').length,bytes:assets.reduce((n,a)=>n+a.bytes,0)}));
