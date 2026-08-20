const LINKEDIN_URL = 'https://www.linkedin.com/in/csamk/';
const MCA_URL = 'https://www.mca.gov.in/';

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
  addMcaBlock();
}

document.addEventListener('DOMContentLoaded', enhance);
const observer = new MutationObserver(enhance);
observer.observe(document.documentElement, { childList: true, subtree: true });
setTimeout(() => observer.disconnect(), 12000);
