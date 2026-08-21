const WHATSAPP_NUMBER='916291109642';
function addWhatsApp(){
 if(document.getElementById('site-whatsapp')) return;
 const a=document.createElement('a');
 a.id='site-whatsapp';
 a.href=`https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent('Hello CS Manish Kumar, I would like to connect with you.')}`;
 a.target='_blank'; a.rel='noopener noreferrer'; a.setAttribute('aria-label','Chat on WhatsApp');
 a.innerHTML='<span class="wa-icon">◔</span><span class="wa-label">WhatsApp</span>';
 const s=document.createElement('style');
 s.textContent=`#site-whatsapp{position:fixed;right:22px;bottom:22px;z-index:99999;display:flex;align-items:center;gap:9px;padding:11px 15px;border-radius:999px;background:#168b52;color:#fff;text-decoration:none;font:600 13px/1 Arial,sans-serif;box-shadow:0 8px 24px rgba(0,0,0,.18);transition:transform .2s ease,box-shadow .2s ease}#site-whatsapp:hover{transform:translateY(-2px);box-shadow:0 11px 28px rgba(0,0,0,.24)}.wa-icon{width:22px;height:22px;border:2px solid #fff;border-radius:50%;display:grid;place-items:center;font-size:16px;line-height:1}.wa-label{letter-spacing:.2px}@media(max-width:600px){#site-whatsapp{right:15px;bottom:15px;padding:12px;width:48px;height:48px;justify-content:center}.wa-label{display:none}.wa-icon{width:23px;height:23px}}`;
 document.head.appendChild(s);document.body.appendChild(a);
}
if(document.readyState==='loading') document.addEventListener('DOMContentLoaded',addWhatsApp,{once:true}); else addWhatsApp();
