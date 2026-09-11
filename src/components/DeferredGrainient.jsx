import React,{lazy,Suspense,useEffect,useRef,useState} from 'react';
const Grainient = lazy(()=>import('./Grainient'));
export default function DeferredGrainient(props){
 const ref=useRef(null),[ready,setReady]=useState(false);
 useEffect(()=>{const io=new IntersectionObserver(([e])=>{if(e.isIntersecting){setReady(true);io.disconnect();}},{rootMargin:'200px'});io.observe(ref.current);return()=>io.disconnect();},[]);
 return <div ref={ref} style={{width:'100%',height:'100%'}}>{ready&&<Suspense fallback={null}><Grainient {...props}/></Suspense>}</div>;
}
