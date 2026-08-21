const LINKEDIN_URL = 'https://www.linkedin.com/in/csamk/';
const HERO_IMAGE = '/images/CS%20manish%20website.png';
const recognitionItems = [
  ['/images/award-13-regional-conference.png','2017','9th Regional Conference of Student Company Secretaries'],
  ['/images/award-14-3rd-best-participant.png','2016','3rd Best Participant — 112th MSOP'],
  ['/images/award-01-tongue-twister-judge.png','2025','Tongue Twister Competition'],
  ['/images/award-02-pcs-day.png','2025','PCS Day Recognition'],
  ['/images/award-03-mega-student-conference.png','2023',"Mega Student's Conference"],
  ['/images/award-04-hooghly-chapter.png','Professional','Hooghly Chapter Recognition']
];

function redirectRetiredRoutes(){
  if(location.pathname==='/engagements'||location.pathname==='/awards') location.replace('/gallery');
}

function addLinkedIn(){
  const c=document.querySelector('.header-cta');
  if(!c||document.querySelector('.linkedin-link')) return;
  const a=document.createElement('a');
  a.className='linkedin-link'; a.href=LINKEDIN_URL; a.target='_blank'; a.rel='noopener noreferrer';
  a.innerHTML='<span class="linkedin-mark">in</span><span>LinkedIn</span>';
  c.parentElement?.insertBefore(a,c);
}

function replaceNavigation(){
  const n=document.querySelector('.desktop-nav');
  if(!n) return;
  n.querySelectorAll('a[href="/engagements"],a[href="/awards"]').forEach(a=>a.remove());
  if(!n.querySelector('a[href="/gallery"]')){
    const a=document.createElement('a'); a.href='/gallery'; a.textContent='Galleries';
    n.insertBefore(a,n.querySelector('a[href="/connect"]')||null);
  }
  document.querySelectorAll('.mobile-nav a[href="/engagements"],.mobile-nav a[href="/awards"]').forEach(a=>a.remove());
  const m=document.querySelector('.mobile-nav');
  if(m&&!m.querySelector('a[href="/gallery"]')){
    const a=document.createElement('a'); a.href='/gallery'; a.textContent='Galleries';
    m.insertBefore(a,m.querySelector('a[href="/connect"]')||null);
  }
}

function addConnectLinkedIn(){
  if(location.pathname!=='/connect'||document.querySelector('.connect-linkedin')) return;
  const p=document.querySelector('.connect-panel'); if(!p) return;
  const a=document.createElement('a'); a.className='connect-linkedin';
  a.href=LINKEDIN_URL; a.target='_blank'; a.rel='noopener noreferrer';
  a.innerHTML='<span class="linkedin-mark">in</span><span><strong>LinkedIn</strong><small>Connect on LinkedIn</small></span><span class="linkedin-arrow">↗</span>';
  p.appendChild(a);
}

function fixImageAssets(){
  document.querySelectorAll('.hero-frame img,.about-image img').forEach(i=>{
    if(!i.dataset.assetFixed&&(i.naturalWidth===0||i.src.includes('CS_manish_website'))){
      i.src=HERO_IMAGE; i.dataset.assetFixed='true';
    }
  });
}

function addRecognitionStrip(){
  if(location.pathname!=='/'||document.querySelector('.home-recognition-strip')) return;
  const host=document.querySelector('.post-narrative');
  if(!host) return;
  const s=document.createElement('section'); s.className='home-recognition-strip';
  const cards=[...recognitionItems,...recognitionItems].map(([im,y,t])=>`<a class="home-recognition-card" href="/gallery" aria-label="View ${t}"><span class="home-recognition-image"><img src="${im}" alt="" loading="lazy"></span><span class="home-recognition-copy"><small>${y}</small><strong>${t}</strong></span></a>`).join('');
  s.innerHTML=`<div class="home-recognition-head"><span>Selected recognitions</span><small>Professional milestones & recognition</small></div><div class="home-recognition-window"><div class="home-recognition-track">${cards}</div></div>`;
  host.insertBefore(s,host.firstElementChild||null);
}

function trimImageToContent(img){
  if(img.dataset.trimmed==='true'||img.dataset.trimming==='true'||!img.complete||!img.naturalWidth) return;
  img.dataset.trimming='true';
  try{
    const canvas=document.createElement('canvas'); canvas.width=img.naturalWidth; canvas.height=img.naturalHeight;
    const ctx=canvas.getContext('2d',{willReadFrequently:true}); if(!ctx) return; ctx.drawImage(img,0,0);
    const px=ctx.getImageData(0,0,canvas.width,canvas.height).data;
    let minX=canvas.width,minY=canvas.height,maxX=-1,maxY=-1;
    for(let y=0;y<canvas.height;y++) for(let x=0;x<canvas.width;x++){
      const p=(y*canvas.width+x)*4,r=px[p],g=px[p+1],b=px[p+2],a=px[p+3];
      if(a>18&&!(r>247&&g>247&&b>247)){minX=Math.min(minX,x);maxX=Math.max(maxX,x);minY=Math.min(minY,y);maxY=Math.max(maxY,y)}
    }
    if(maxX<0) return;
    const pad=Math.round(Math.min(canvas.width,canvas.height)*.025);
    minX=Math.max(0,minX-pad); minY=Math.max(0,minY-pad); maxX=Math.min(canvas.width-1,maxX+pad); maxY=Math.min(canvas.height-1,maxY+pad);
    const w=maxX-minX+1,h=maxY-minY+1; if(w>canvas.width*.96&&h>canvas.height*.96) return;
    const out=document.createElement('canvas'); out.width=w; out.height=h;
    out.getContext('2d')?.drawImage(canvas,minX,minY,w,h,0,0,w,h);
    img.src=out.toDataURL('image/png'); img.dataset.trimmed='true';
  }catch{} finally{delete img.dataset.trimming;}
}

function trimGalleryImages(){
  if(!location.pathname.includes('/gallery')) return;
  document.querySelectorAll('.gallery-media img,.marquee-image img,.gallery-lightbox img').forEach(img=>{
    if(!img.dataset.trimListener){img.dataset.trimListener='true';img.addEventListener('load',()=>trimImageToContent(img),{once:true});}
    trimImageToContent(img);
  });
}

function addLayoutFixes(){
  if(document.getElementById('final-layout-fixes')) return;
  const st=document.createElement('style'); st.id='final-layout-fixes';
  st.textContent=`
.header-inner{gap:18px!important}
.linkedin-link{flex:0 0 auto!important;display:inline-flex!important;align-items:center!important;gap:7px!important;margin-right:8px!important;white-space:nowrap!important;text-decoration:none!important}
.linkedin-mark{display:inline-grid!important;place-items:center!important;width:20px!important;height:20px!important;border-radius:3px!important;background:#102a43!important;color:#fff!important;font-size:13px!important;font-weight:800!important;line-height:1!important;font-family:Arial,sans-serif!important}
.header-cta{flex:0 0 auto!important;white-space:nowrap!important}
.hero-footer{position:relative!important;z-index:4!important;display:flex!important;align-items:center!important;justify-content:space-between!important;gap:28px!important;margin-top:0!important;padding-bottom:28px!important;min-height:52px!important}
.hero-footer>span:first-child{max-width:72%!important;line-height:1.45!important}
.hero-footer .scroll-hint{white-space:nowrap!important;display:inline-flex!important;align-items:center!important;gap:7px!important}
.hero-copy .arrow-link{position:relative!important;z-index:6!important;margin-bottom:24px!important}
.hero-grid{padding-bottom:0!important}.layer-identity{padding-top:150px!important}.site-header{z-index:100!important}
.connect-linkedin{margin-top:14px!important;display:grid!important;grid-template-columns:28px 1fr 20px!important;align-items:center!important;gap:12px!important;padding:16px 0!important;border-top:1px solid rgba(16,42,67,.12)!important;color:#102a43!important;text-decoration:none!important}
.connect-linkedin .linkedin-mark{width:24px!important;height:24px!important;border-radius:3px!important}.connect-linkedin strong{display:block!important;font-size:14px!important}.connect-linkedin small{display:block!important;margin-top:3px!important;color:#6d7d8c!important;font-size:11px!important}.linkedin-arrow{font-size:18px!important}
.home-recognition-strip{position:relative!important;display:block!important;visibility:visible!important;opacity:1!important;height:auto!important;min-height:142px!important;max-height:none!important;clear:both!important;background:#102a43!important;color:#fff!important;padding:28px 0 30px!important;overflow:hidden!important;border-top:1px solid rgba(255,255,255,.08)!important;border-bottom:1px solid rgba(255,255,255,.08)!important;z-index:50!important}
.post-narrative{overflow:visible!important}
.home-recognition-head{width:min(1180px,calc(100% - 96px));margin:0 auto 15px;display:flex;justify-content:space-between;align-items:center;gap:20px}
.home-recognition-head>span{font:700 10px 'DM Mono';letter-spacing:.16em;text-transform:uppercase;color:#e0a979}.home-recognition-head>small{font:10px 'DM Mono';letter-spacing:.06em;color:rgba(255,255,255,.5)}
.home-recognition-window{display:block!important;height:88px!important;overflow:hidden!important}.home-recognition-track{display:flex!important;width:max-content!important;gap:14px!important;animation:homeRecognition 38s linear infinite!important}
.home-recognition-track:hover{animation-play-state:paused}.home-recognition-card{width:255px!important;height:80px!important;flex:0 0 255px!important;display:grid!important;grid-template-columns:78px 1fr!important;align-items:center!important;gap:12px!important;padding:9px!important;background:rgba(255,255,255,.055)!important;border:1px solid rgba(255,255,255,.12)!important;color:#fff!important;text-align:left!important}
.home-recognition-image{height:60px!important;display:flex!important;align-items:center!important;justify-content:center!important;overflow:hidden!important;background:transparent!important}.home-recognition-image img{width:100%!important;height:100%!important;object-fit:contain!important;mix-blend-mode:normal!important}.home-recognition-copy small{display:block;color:#e0a979;font:9px 'DM Mono';letter-spacing:.1em;text-transform:uppercase;margin-bottom:5px}.home-recognition-copy strong{display:block;font-size:12px;line-height:1.25;font-weight:650}@keyframes homeRecognition{from{transform:translateX(0)}to{transform:translateX(-50%)}}
.gallery-media{overflow:hidden!important}.gallery-media img{transform:scale(1.08)!important;transform-origin:center!important}
@media(max-width:1000px){.linkedin-link{display:none!important}.header-inner{gap:12px!important}.home-recognition-head{width:calc(100% - 40px)}}
@media(max-width:700px){.hero-footer{display:none!important}.layer-identity{padding-top:95px!important}.home-recognition-head{display:block}.home-recognition-head small{display:block;margin-top:7px}.home-recognition-track{animation-duration:30s!important}.home-recognition-card{width:215px!important;flex-basis:215px!important;grid-template-columns:66px 1fr!important}.home-recognition-image{height:58px!important}}
`;
  document.head.appendChild(st);
}

function enhance(){
  redirectRetiredRoutes(); addLinkedIn(); replaceNavigation(); addConnectLinkedIn(); addRecognitionStrip(); addLayoutFixes(); fixImageAssets(); trimGalleryImages();
}

document.addEventListener('DOMContentLoaded',enhance);
const observer=new MutationObserver(enhance); observer.observe(document.documentElement,{childList:true,subtree:true});
setTimeout(()=>observer.disconnect(),12000);
