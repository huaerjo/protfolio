import {useLayoutEffect} from 'react';
import {gsap} from 'gsap';
import {ScrollTrigger} from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

// Animations own only their targets; reverting restores all original inline styles.
export default function usePortfolioMotion(active) {
  useLayoutEffect(() => {
    const media = gsap.matchMedia();
    media.add('(prefers-reduced-motion: no-preference)', () => {
      const mobile = matchMedia('(max-width: 760px)').matches;
      const ease = 'power4.inOut';
      const reveal = {clipPath:'inset(100% 0% 0% 0%)', y:mobile ? 48 : 100, scaleX:.9, scaleY:1.12, transformOrigin:'50% 100%'};
      const settled = {clipPath:'inset(0% 0% 0% 0%)',y:0,scaleX:1,scaleY:1,duration:1.65,ease,clearProps:'transform,clipPath'};
      const home = document.querySelector('#home');
      if (home.getBoundingClientRect().bottom > 0 && !location.hash.startsWith('#project/')) {
        const opening = gsap.timeline({defaults:{ease}});
        opening.fromTo('.hero h1', reveal, {...settled,duration:1.85}, .15)
          .from('.hero .intro',{y:26,clipPath:'inset(100% 0 0 0)',duration:1,clearProps:'all'},.05)
          .from('.hero-video',{clipPath:'inset(0 0 100% 0)',duration:2.2,clearProps:'clipPath'},.1)
          .from('.hero-roles',{y:32,clipPath:'inset(100% 0 0 0)',duration:1.1,clearProps:'all'},.8)
          .from('.hero-description',{y:30,clipPath:'inset(100% 0 0 0)',duration:1.1,clearProps:'all'},1.05)
          .from('.hero .primary',{y:38,scale:.86,opacity:0,duration:1.15,clearProps:'transform,opacity'},1.25)
          .from('.hero-facts>div',{y:42,clipPath:'inset(100% 0 0 0)',duration:1.1,stagger:.16,clearProps:'all'},1.5);
        // Complete promptly if navigation takes the visitor away during opening.
        ScrollTrigger.create({trigger:home,start:'bottom top',once:true,onEnter:()=>opening.progress(1)});
      }
      document.querySelectorAll('#about .section-heading,#work .section-heading,#strengths .section-heading,.contact-heading').forEach(header => {
        const title = header.querySelector('h2');
        gsap.fromTo(title,reveal,{...settled,scrollTrigger:{trigger:header,start:'top 88%',once:true}});
      });
      const enter = (selector,delay=0) => {
        const nodes = gsap.utils.toArray(selector);
        nodes.forEach((node,i) => gsap.from(node,{
          y:mobile?48:85,clipPath:'inset(12% 0 100% 0)',duration:1.5,ease,
          delay:mobile?0:delay+(i%4)*.15,clearProps:'transform,clipPath',
          scrollTrigger:{trigger:node,start:'top 91%',once:true}
        }));
      };
      enter('.portrait-panel',.2);
      enter('.about-copy',.3);
      enter('.metrics>div');
      enter('.strength-glow',.25);
      enter('.contact-description,.contact-links',.25);
      // Reveal the gallery as one surface, leaving card transforms to its carousel.
      gsap.from('.showcase-cards',{clipPath:'inset(100% 0 0 0)',duration:1.8,ease,delay:.35,clearProps:'clipPath',scrollTrigger:{trigger:'#work',start:'top 75%',once:true}});
      if (!mobile) {
        document.querySelectorAll('.strength-visual').forEach(image => {
          gsap.fromTo(image,{y:24},{y:-18,ease:'none',scrollTrigger:{trigger:image.closest('.strength-card'),start:'top bottom',end:'bottom top',scrub:1.5}});
        });
      }
      let disposed = false;
      const refresh = () => {if(!disposed) ScrollTrigger.refresh();};
      document.fonts.ready.then(refresh);
      window.addEventListener('load',refresh,{once:true});
      return () => {disposed=true;window.removeEventListener('load',refresh);};
    });
    return () => media.revert();
  },[]);

  useLayoutEffect(() => {
    if (!active) {ScrollTrigger.refresh();return;}
    const media = gsap.matchMedia();
    media.add('(prefers-reduced-motion: no-preference)', () => {
      gsap.from('.case-heading',{y:45,clipPath:'inset(100% 0 0 0)',duration:1.3,ease:'power4.inOut',clearProps:'all'});
      document.querySelectorAll('.case-pages figure').forEach(figure => gsap.from(figure,{
        y:35,duration:1.25,ease:'power3.out',clearProps:'all',
        scrollTrigger:{scroller:'.modal',trigger:figure,start:'top 95%',once:true}
      }));
    });
    return () => media.revert();
  },[active]);
}
