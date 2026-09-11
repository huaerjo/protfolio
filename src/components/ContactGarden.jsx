import React,{useEffect,useRef,useState} from 'react';
import './ContactGarden.css';

function Flower({x,y,size=1,delay=0,id,cup=false}){
 return <g transform={`translate(${x} ${y}) scale(${size})`}>
  <g className="garden-flower" style={{'--bloom-delay':`${delay}s`}}>
   {cup?<>{[-48,-24,0,24,48].map((angle,i)=><path key={angle} transform={`rotate(${angle})`} d="M0 8 C-34 -9 -27 -58 -15 -79 C5 -70 24 -25 0 8" fill={`url(#${id}-petal)`}/>)}</>:<>{[0,72,144,216,288].map(angle=><ellipse key={angle} cx="0" cy="-27" rx="24" ry="38" transform={`rotate(${angle})`} fill={`url(#${id}-petal)`}/>)}</>}
   <circle r="14" fill={`url(#${id}-heart)`}/>
  </g>
 </g>;
}
function Side({side}){
 const id=`garden-${side}`;
 return <svg className={`contact-garden contact-garden-${side}`} viewBox="0 0 240 510" fill="none" aria-hidden="true">
  <defs>
   <linearGradient id={`${id}-petal`} x1="-22" y1="-60" x2="23" y2="9" gradientUnits="userSpaceOnUse"><stop stopColor="#F6A4FF"/><stop offset=".4" stopColor="#AF79F6"/><stop offset=".72" stopColor="#5253F5"/><stop offset="1" stopColor="#202477"/></linearGradient>
   <linearGradient id={`${id}-leaf`} x1="0" y1="0" x2="65" y2="50" gradientUnits="userSpaceOnUse"><stop stopColor="#173171"/><stop offset=".5" stopColor="#554BED"/><stop offset="1" stopColor="#F5B8DA"/></linearGradient>
   <linearGradient id={`${id}-heart`} x2="0" y2="1"><stop stopColor="#FFB7E9"/><stop offset="1" stopColor="#FFD15B"/></linearGradient>
   <linearGradient id={`${id}-stem`} x2="0" y2="1"><stop stopColor="#8470D6"/><stop offset="1" stopColor="#977758" stopOpacity=".2"/></linearGradient>
  </defs>
  <g className="garden-stems" stroke={`url(#${id}-stem)`} strokeWidth="1.1">
   <path d="M94 510 V126 M94 410 C49 376 26 340 24 299 M94 331 C139 300 162 264 166 231 M94 254 C61 230 42 218 42 187 M195 510 C188 425 187 367 217 329"/>
  </g>
  {[[91,378,-150],[96,317,-35],[91,455,-155],[191,448,-45]].map(([x,y,r],i)=><g key={i} transform={`translate(${x} ${y}) rotate(${r})`}><path className="garden-leaf" style={{'--bloom-delay':`${.3+i*.15}s`}} d="M0 0 C1 -30 29 -42 60 -43 C59 -12 27 8 0 0Z" fill={`url(#${id}-leaf)`}/></g>)}
  <Flower x={94} y={126} size={side==='left'?.88:.78} delay={side==='left'?.2:.65} id={id} cup={side==='right'}/>
  <Flower x={184} y={291} size={.55} delay={1.1} id={id}/>
  <g fill={`url(#${id}-heart)`}><circle cx="42" cy="187" r="4"/><circle cx="166" cy="231" r="4"/><circle cx="24" cy="299" r="3"/></g>
  <g transform="translate(217 329)"><path className="garden-flower" style={{'--bloom-delay':'1.4s'}} d="M0 0 C-29 -12 -20 -38 -5 -43 C17 -43 29 -12 0 0" fill={`url(#${id}-petal)`}/></g>
 </svg>;
}
export default function ContactGarden(){
 const ref=useRef(null),[visible,setVisible]=useState(false),[seen,setSeen]=useState(false);
 useEffect(()=>{let inView=false;const update=()=>{setVisible(inView&&!document.hidden);if(inView)setSeen(true);};const io=new IntersectionObserver(([e])=>{inView=e.isIntersecting;update();},{threshold:.1});io.observe(ref.current);document.addEventListener('visibilitychange',update);return()=>{io.disconnect();document.removeEventListener('visibilitychange',update);};},[]);
 return <div ref={ref} className={`contact-gardens ${seen?'has-bloomed':''} ${visible?'is-visible':''}`} aria-hidden="true"><Side side="left"/><Side side="right"/></div>;
}
