import React from 'react';
const paths=[
'M 330 700 C 175 565 35 340 35 65',
'M 440 700 C 305 555 195 335 195 65',
'M 550 700 C 455 545 355 340 355 65',
'M 625 700 C 600 560 500 410 500 110',
'M 650 700 L 650 0',
'M 675 700 C 700 560 800 410 800 110',
'M 750 700 C 845 545 945 340 945 65',
'M 860 700 C 995 555 1105 335 1105 65',
'M 970 700 C 1125 565 1265 340 1265 65'
];
export default function HeroLightPaths(){return <div className="hero-light-paths" aria-hidden="true"><svg viewBox="0 0 1300 700" preserveAspectRatio="none"><defs><linearGradient id="hero-line-color" x1="0" y1="1" x2="0" y2="0"><stop stopColor="#8adbe8" stopOpacity=".45"/><stop offset=".45" stopColor="#b678d5" stopOpacity=".55"/><stop offset="1" stopColor="#384ba4" stopOpacity="0"/></linearGradient><filter id="hero-light-glow" x="-400%" y="-400%" width="900%" height="900%"><feGaussianBlur stdDeviation="3"/></filter></defs>{paths.map((d,i)=><g key={d}><path d={d} fill="none" stroke="url(#hero-line-color)" strokeWidth="1" vectorEffect="non-scaling-stroke"/><g className="hero-path-spark"><animateMotion path={d} dur={`${6+i*.65}s`} begin={`${-i*1.7}s`} repeatCount="indefinite"/><animate attributeName="opacity" values="0;.9;.8;0;0" keyTimes="0;.12;.6;.88;1" dur={`${6+i*.65}s`} begin={`${-i*1.7}s`} repeatCount="indefinite"/><circle r="7" fill={i%2?'#b391ff':'#bddfff'} filter="url(#hero-light-glow)"/><circle r="2" fill="#f6f0ff"/></g></g>)}</svg></div>}
