const sharp = require('/Users/daijinju/.cache/codex-runtimes/codex-primary-runtime/dependencies/node/node_modules/sharp');
const fs = require('fs');
(async()=>{fs.mkdirSync('public/images/responsive',{recursive:true});let total=0;
for(const name of fs.readdirSync('public/images').filter(n=>/^page-\d+\.webp$/.test(n))){
for(const width of [960,1920]){const out=`public/images/responsive/${name.replace('.webp',`-${width}.webp`)}`;if(!fs.existsSync(out))await sharp(`public/images/${name}`).resize({width,withoutEnlargement:true}).webp({quality:82,effort:4}).toFile(out);total+=fs.statSync(out).size;}}
console.log('Responsive variants MB:',(total/1048576).toFixed(1));})();
