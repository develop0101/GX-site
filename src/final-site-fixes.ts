const CANONICAL_ORIGIN = 'https://csmanishkumar.com';
const LINKEDIN_URL = 'https://www.linkedin.com/in/csamk/';

function fixHeroEyebrow(){
  document.querySelectorAll('.hero-copy .eyebrow').forEach(el=>{
    if(el.textContent?.includes('Professional profile') || el.textContent?.includes('Upcoming candidate')){
      el.textContent='Company Secretary · Professional Leadership · Institutional Development';
    }
  });
}

function removeUnnecessaryCTAs(){
  document.querySelectorAll('.header-cta').forEach(el=>el.remove());
}

function normalizeUrls(){
  document.querySelectorAll<HTMLAnchorElement>('a[href]').forEach(a=>{
    const raw=a.getAttribute('href');
    if(!raw) return;
    try{
      const url=new URL(raw,window.location.origin);
      const path=url.pathname;
      const text=(a.textContent||'').trim().toLowerCase();

      if(path==='/engagements'||path==='/awards'){
        if(a.getAttribute('href')!=='/gallery') a.href='/gallery';
        if(text==='engagements'||text==='awards') a.textContent='Galleries';
        return;
      }

      if(url.hostname.endsWith('.vercel.app')){
        const next=`${CANONICAL_ORIGIN}${path}${url.search}${url.hash}`;
        if(a.href!==next) a.href=next;
      }
    }catch{}
  });

  document.querySelectorAll<HTMLElement>('footer a').forEach(a=>{
    const text=(a.textContent||'').trim().toLowerCase();
    if(text==='engagements'||text==='awards'){
      a.textContent='Galleries';
      if(a.getAttribute('href')!=='/gallery') a.href='/gallery';
    }
    if(text.includes('linkedin')){
      if(a.href!==LINKEDIN_URL) a.href=LINKEDIN_URL;
      a.target='_blank';
      a.rel='noopener noreferrer';
    }
  });
}

function fixCanonicalMeta(){
  let canonical=document.querySelector<HTMLLinkElement>('link[rel="canonical"]');
  if(!canonical){
    canonical=document.createElement('link');
    canonical.rel='canonical';
    document.head.appendChild(canonical);
  }
  const next=`${CANONICAL_ORIGIN}${location.pathname}`;
  if(canonical.href!==next) canonical.href=next;
}

function applyFinalSiteFixes(){
  fixHeroEyebrow();
  removeUnnecessaryCTAs();
  normalizeUrls();
  fixCanonicalMeta();
}

if(document.readyState==='loading'){
  document.addEventListener('DOMContentLoaded',applyFinalSiteFixes,{once:true});
}else{
  applyFinalSiteFixes();
}
