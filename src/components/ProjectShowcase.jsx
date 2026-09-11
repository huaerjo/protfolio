import React, {useEffect, useRef, useState} from 'react';
import {ArrowUpRight,ChevronLeft,ChevronRight,Play,Pause} from 'lucide-react';
import './ProjectShowcase.css';
export default function ProjectShowcase({projects,stories,cover,onOpen,paused=false}){
 const [{selected,leaving},setSlide]=useState({selected:0,leaving:null}),[playing,setPlaying]=useState(false),[visible,setVisible]=useState(false),[pageVisible,setPageVisible]=useState(!document.hidden);
 useEffect(()=>{const sync=()=>setPageVisible(!document.hidden);document.addEventListener('visibilitychange',sync);return()=>document.removeEventListener('visibilitychange',sync);},[]);
 const root=useRef(null),touch=useRef(null);
 useEffect(()=>{const query=matchMedia('(prefers-reduced-motion: reduce)');setPlaying(!query.matches);const change=()=>setPlaying(!query.matches);query.addEventListener('change',change);const io=new IntersectionObserver(([entry])=>setVisible(entry.isIntersecting),{threshold:.25});io.observe(root.current);return()=>{query.removeEventListener('change',change);io.disconnect()}},[]);
 useEffect(()=>{if(!playing||paused||!visible||!pageVisible)return;const timer=setInterval(()=>{if(!document.hidden)setSlide(s=>({selected:(s.selected+1)%projects.length,leaving:s.selected}))},3000);return()=>clearInterval(timer)},[playing,paused,visible,pageVisible,projects.length,selected]);
 useEffect(()=>{if(leaving===null)return;const timer=setTimeout(()=>setSlide(s=>({...s,leaving:null})),1100);return()=>clearTimeout(timer)},[selected,leaving]);
 const select=i=>{const next=(i+projects.length)%projects.length;if(next!==selected)setSlide({selected:next,leaving:selected});};
 useEffect(()=>{const section=root.current?.closest('#work');if(section)section.dataset.motionPaused=String(!visible||!pageVisible||paused);},[visible,pageVisible,paused]);
 const project=projects[selected];
 return <div className="project-showcase" ref={root}>
 <div className="showcase-layout"><div className="showcase-steps" aria-label="选择项目">{projects.map((p,i)=><button key={p.id} className={i===selected?'is-current':''} aria-label={`选择${p.name}`} aria-pressed={i===selected} onClick={()=>select(i)}><span className="step-dot"/><span className="step-number">{String(i+1).padStart(2,'0')}</span></button>)}</div>
 <div className="showcase-copy" key={project.id}><span className="showcase-eyebrow">PROJECT {String(selected+1).padStart(2,'0')}</span><h3>{project.name}</h3><span className="showcase-english">{project.en}</span><div className="project-summary"><span>{stories[selected].category}</span><p>{stories[selected].summary}</p><strong>设计成果</strong><p>{stories[selected].outcome}</p></div><div className="showcase-tags">{project.tags.map(t=><span key={t}>{t}</span>)}</div><p className="showcase-note">{project.note}</p><button className="showcase-open" onClick={()=>onOpen(project)}><span className="button-arrow"><ArrowUpRight size={18}/></span>查看完整案例</button></div>
 <div className="showcase-cards" aria-label="六个精选项目" onTouchStart={e=>{touch.current=e.touches[0].clientX}} onTouchEnd={e=>{if(touch.current!==null){const delta=touch.current-e.changedTouches[0].clientX;if(Math.abs(delta)>55)select(selected+(delta>0?1:-1));touch.current=null}}}>{projects.map((p,i)=>{const offset=(i-selected+projects.length)%projects.length;const exiting=i===leaving;return <button key={p.id} className={`showcase-card ${offset===0?'is-current':''} ${exiting?'is-leaving':''} ${offset>=3&&!exiting?'is-offstage':''}`} style={{'--slot':offset}} tabIndex={offset<3&&!exiting?0:-1} aria-hidden={offset>=3||exiting} aria-label={i===selected?`查看${p.name}完整案例`:`展示${p.name}`} aria-pressed={i===selected} onClick={()=>{if(i===selected)onOpen(p);else select(i)}}><img loading="lazy" decoding="async" src={cover(p.cover)} alt={`${p.name}封面`}/></button>})}</div></div>
 <div className="showcase-bottom"><span>{String(selected+1).padStart(2,'0')} <i>/</i> 06</span><span>选择卡片探索项目 · 再次点击查看案例</span></div>
 </div>
}
