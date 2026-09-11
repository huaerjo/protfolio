const { chromium } = require('/Users/daijinju/.cache/codex-runtimes/codex-primary-runtime/dependencies/node/node_modules/playwright');
const fs = require('fs');
(async()=>{
 const browser=await chromium.launch({executablePath:'/Applications/Google Chrome.app/Contents/MacOS/Google Chrome',headless:true});
 const page=await browser.newPage();
 const result=await page.evaluate(async()=>{
  const canvas=document.createElement('canvas');canvas.width=1600;canvas.height=900;
  const ctx=canvas.getContext('2d');
  function draw(t){
   ctx.fillStyle='#080e1c';ctx.fillRect(0,0,1600,900);
   for(let j=0;j<4;j++){
    const x=1120+Math.sin(t+j*1.5)*180,y=430+Math.cos(t+j)*160;
    const g=ctx.createRadialGradient(x,y,0,x,y,560);
    g.addColorStop(0,`rgba(${45+j*10},${70-j*7},190,0.28)`);g.addColorStop(1,'rgba(10,20,60,0)');ctx.fillStyle=g;ctx.fillRect(0,0,1600,900);
   }
   ctx.save();ctx.translate(1130,450);ctx.rotate(-.35+Math.sin(t)*.1);
   for(let i=0;i<16;i++){ctx.beginPath();ctx.ellipse(0,0,380-i*9,305-i*9,0,0,Math.PI*2);ctx.strokeStyle=`rgba(125,161,245,${.08+i*.006})`;ctx.lineWidth=1;ctx.stroke()}
   ctx.restore();
  }
  draw(0);const poster=canvas.toDataURL('image/png').split(',')[1];
  const stream=canvas.captureStream(24),chunks=[];
  const recorder=new MediaRecorder(stream,{mimeType:'video/webm;codecs=vp9',videoBitsPerSecond:1600000});
  const done=new Promise(resolve=>recorder.onstop=resolve);recorder.ondataavailable=e=>{if(e.data.size)chunks.push(e.data)};recorder.start();
  const start=performance.now();await new Promise(resolve=>{function tick(now){const elapsed=now-start;draw(elapsed/10000*Math.PI*2);if(elapsed<10000)requestAnimationFrame(tick);else resolve()}requestAnimationFrame(tick)});
  recorder.stop();await done;stream.getTracks().forEach(t=>t.stop());
  const blob=new Blob(chunks,{type:'video/webm'});const data=await new Promise(resolve=>{const r=new FileReader();r.onload=()=>resolve(r.result.split(',')[1]);r.readAsDataURL(blob)});
  return {poster,data};
 });
 fs.writeFileSync('public/video/hero-ambient.webm',Buffer.from(result.data,'base64'));fs.writeFileSync('public/video/hero-poster.png',Buffer.from(result.poster,'base64'));
 await browser.close();console.log('Created 10-second 1600×900 looping WebM and poster.');
})().catch(e=>{console.error(e);process.exit(1)});
