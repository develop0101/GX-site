const LINKEDIN_URL = 'https://www.linkedin.com/in/csamk/';
const MCA_URL = 'https://www.mca.gov.in/';
const HERO_IMAGE = '/images/CS%20manish%20website.png';

function addLinkedIn() {
  const cta = document.querySelector('.header-cta');
  if (!cta || document.querySelector('.linkedin-link')) return;
  const link = document.createElement('a');
  link.className = 'linkedin-link';
  link.href = LINKEDIN_URL;
  link.target = '_blank';
  link.rel = 'noopener noreferrer';
  link.textContent = 'LinkedIn';
  cta.parentElement?.insertBefore(link, cta);
}

function addAwardsLink() {
  const nav = document.querySelector('.desktop-nav');
  if (!nav || nav.querySelector('.awards-nav-link')) return;
  const link = document.createElement('a');
  link.className = 'awards-nav-link';
  link.href = '/awards';
  link.textContent = 'Awards';
  nav.insertBefore(link, nav.querySelector('a[href="/connect"]') || null);
}

function fixImageAssets() {
  const hero = document.querySelector<HTMLImageElement>('.hero-frame img');
  if (hero && (hero.src.endsWith('/CS_manish_website.png') || hero.naturalWidth === 0)) {
    if (!hero.dataset.assetFixed) {
      hero.src = HERO_IMAGE;
      hero.dataset.assetFixed = 'true';
    }
  }
  document.querySelectorAll<HTMLImageElement>('.award-media img, .award-lightbox img').forEach(img => {
    const match = img.getAttribute('src')?.match(/\/images\/awards\/(award-[^?]+)$/);
    if (match) img.src = `/images/${match[1]}`;
  });
}

function addLayoutFixes() {
  if (document.getElementById('final-layout-fixes')) return;
  const style = document.createElement('style');
  style.id = 'final-layout-fixes';
  style.textContent = `
    .header-inner{gap:18px!important}
    .linkedin-link{flex:0 0 auto!important;margin-right:8px!important;white-space:nowrap!important}
    .header-cta{flex:0 0 auto!important;white-space:nowrap!important}
    .hero-footer{position:relative!important;z-index:4!important;display:flex!important;align-items:center!important;justify-content:space-between!important;gap:28px!important;margin-top:-12px!important;padding-bottom:28px!important;min-height:52px!important}
    .hero-footer>span:first-child{max-width:72%!important;line-height:1.45!important}
    .hero-footer .scroll-hint{white-space:nowrap!important;display:inline-flex!important;align-items:center!important;gap:7px!important}
    .hero-copy .arrow-link{position:relative!important;z-index:6!important;margin-bottom:18px!important}
    .hero-grid{padding-bottom:0!important}
    @media(max-width:1000px){.linkedin-link{display:none!important}.header-inner{gap:12px!important}}
    @media(max-width:700px){.hero-footer{display:none!important}}
  `;
  document.head.appendChild(style);
}

function addMcaBlock() {
  const host = document.querySelector('.post-narrative');
  if (!host || document.querySelector('.mca-source-block')) return;
  const section = document.createElement('section');
  section.className = 'mca-source-block';
  section.innerHTML = `
    <div class="container mca-source-inner">
      <div>
        <p class="eyebrow"><span></span>Corporate Affairs</p>
        <h2>MCA updates, from the official source.</h2>
        <p>Keep the professional context current with a direct link to the Ministry of Corporate Affairs portal. No unofficial summaries or scraped content are presented as official updates.</p>
      </div>
      <a class="mca-source-link" href="${MCA_URL}" target="_blank" rel="noopener noreferrer">
        Open MCA Portal <span>↗</span>
      </a>
    </div>`;
  host.insertBefore(section, host.firstElementChild?.nextElementSibling || host.firstChild);
}

function enhance() {
  addLinkedIn();
  addAwardsLink();
  addMcaBlock();
  addLayoutFixes();
  fixImageAssets();
}

document.addEventListener('DOMContentLoaded', enhance);
const observer = new MutationObserver(enhance);
observer.observe(document.documentElement, { childList: true, subtree: true });
setTimeout(() => observer.disconnect(), 12000);
