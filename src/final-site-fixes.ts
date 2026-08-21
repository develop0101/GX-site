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
  // The header already contains the primary navigation; remove the duplicate CTA.
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

      // Retired sections now live under Galleries.
      if(path==='/engagements'||path==='/awards'){
        a.href='/gallery';
        if(text==='engagements'||text==='awards') a.textContent='Galleries';
        return;
      }

      // Replace old Vercel/deployment links with the canonical domain while preserving paths.
      if(url.hostname.endsWith('.vercel.app') || url.hostname==='csmanishkumar.com'){
        a.href=`${CANONICAL_ORIGIN}${path}${url.search}${url.hash}`;
      }
    }catch{}
  });

  // Footer links are kept deliberately simple and point only to current site destinations.
  document.querySelectorAll<HTMLElement>('footer a').forEach(a=>{
    const text=(a.textContent||'').trim().toLowerCase();
    if(text==='engagements'||text==='awards'){
      a.textContent='Galleries';
      a.href='/gallery';
    }
    if(text.includes('linkedin')){
      a.href=LINKEDIN_URL;
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
  canonical.href=`${CANONICAL_ORIGIN}${location.pathname}`;
}

function applyFinalSiteFixes(){
  fixHeroEyebrow();
  removeUnnecessaryCTAs();
  normalizeUrls();
  fixCanonicalMeta();
}

document.addEventListener('DOMContentLoaded',applyFinalSiteFixes);
const finalFixObserver=new MutationObserver(applyFinalSiteFixes);
finalFixObserver.observe(document.documentElement,{childList:true,subtree:true});
setTimeout(()=>finalFixObserver.disconnect(),12000);
