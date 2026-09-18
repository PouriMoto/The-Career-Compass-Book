import fs from 'node:fs';
import path from 'node:path';
import crypto from 'node:crypto';
const root=path.resolve('../ai-studio-for-making-digital-product');const release=path.join(root,'releases/career-compass-0.2.0');
const entries=JSON.parse(fs.readFileSync(path.join(root,'career-compass-0.2.0-manifest.json'),'utf8'));
for(const entry of entries){const hash=crypto.createHash('sha256').update(fs.readFileSync(path.join(release,entry.file))).digest('hex');if(hash!==entry.sha256)throw Error('Mismatch: '+entry.file);}
if(!fs.existsSync(path.join(root,'projects/remember-phase-1.md')))throw Error('Remember reference missing');
console.log(`Verified ${entries.length} checksums; Remember reference preserved.`);
