import { useState } from 'react';
import { ArrowUpRight, X } from 'lucide-react';

const galleryItems = [
  { image:'/images/award-01-tongue-twister-judge.png', year:'2025', title:'Tongue Twister Competition', caption:'Hon. Judge · Hooghly Chapter of EIRC of ICSI · Mega Student Carnival' },
  { image:'/images/award-02-pcs-day.png', year:'2025', title:'PCS Day Recognition', caption:'EIRC of ICSI · Professional recognition' },
  { image:'/images/award-03-mega-student-conference.png', year:'2023', title:"Mega Student's Conference", caption:'ICSI · Presented to CS Arisankala Manish Kumar' },
  { image:'/images/award-04-hooghly-chapter.png', year:'Professional', title:'Hooghly Chapter Recognition', caption:'ICSI · Hooghly Chapter' },
  { image:'/images/award-05-posh-session.png', year:'2026', title:'Professional Knowledge Session', caption:'Madhya Kolkata Study Circle for Members of ICSI-EIRC · POSH' },
  { image:'/images/award-06-adapting-mca-v3.png', year:'2025', title:'Adapting to MCA V3', caption:'ICMAI Howrah Chapter · ROC transition & compliance' },
  { image:'/images/award-07-gst-input-tax-credit.png', year:'2026', title:'Input Tax Credit under GST', caption:'ICMAI Howrah Chapter · Knowledge session' },
  { image:'/images/award-08-gst-rate-cuts.png', year:'2025', title:'Impact of GST Rate Cuts', caption:'ICMAI Howrah Chapter · GST Council insights' },
  { image:'/images/award-09-mca-v3-solutions.png', year:'Professional', title:'MCA-V3 Portal: Common Errors & Solutions', caption:'ICMAI Howrah Chapter' },
  { image:'/images/award-10-hooghly-chapter-gratitude.png', year:'2024', title:'Knowledge-Sharing Recognition', caption:'Hooghly Chapter of ICSI · Full Day Seminar' },
  { image:'/images/award-11-bhawanipur-education-appreciation.png', year:'Professional', title:'Appreciation for Support in Education', caption:'The Bhawanipur Education Society College' },
  { image:'/images/award-12-moot-court-competition.png', year:'2026', title:'24th All India Moot Court Competition', caption:'ICSI-EIRC · CCGR&T Kolkata Campus' },
  { image:'/images/award-13-regional-conference.png', year:'2017', title:'9th Regional Conference of Student Company Secretaries', caption:'ICSI-EIRC jointly with Hooghly Chapter' },
  { image:'/images/award-14-3rd-best-participant.png', year:'2016', title:'3rd Best Participant — 112th MSOP', caption:'ICSI-EIRC · Management Skills Orientation Programme · Kolkata' },
];

export default function Gallery(){
 const [active,setActive]=useState<number|null>(null);
 return <div className="gallery-page">
  <header className="gallery-header"><a href="/" className="gallery-brand"><b>CS</b><span>ARISANKALA<br/>MANISH KUMAR</span></a><nav><a href="/">Home</a><a href="/about">About</a><a href="/vision">Vision</a><a href="/commitments">Commitments</a><a className="active" href="/gallery">Galleries</a><a href="/connect">Connect</a></nav><a className="gallery-cta" href="/commitments">Explore Commitments <ArrowUpRight size={15}/></a></header>
  <main>
   <section className="gallery-hero"><div className="gallery-container"><p className="gallery-eyebrow">Professional life · Moments · Events</p><h1>A visual record of<br/><em>the journey.</em></h1><p>A growing collection of photographs from professional events, knowledge-sharing sessions, institutional engagements and moments of recognition.</p></div></section>
   <section className="gallery-moments"><div className="gallery-container"><div className="gallery-heading"><div><span>01 — MOMENTS & EVENTS</span><h2>Moments from<br/><em>the profession.</em></h2></div><p>Photographs are kept as individual moments rather than compressed into a single collage, so the people, setting and recognition remain visually distinct.</p></div><div className="gallery-grid">{galleryItems.map((item,i)=><article className="gallery-card" key={item.image} onClick={()=>setActive(i)}><div className="gallery-media"><img src={item.image} alt={item.title} loading="lazy"/><span>Open <ArrowUpRight size={14}/></span></div><div className="gallery-meta"><small>{item.year}</small><small>{String(i+1).padStart(2,'0')}</small></div><h3>{item.title}</h3><p>{item.caption}</p></article>)}</div></div></section>
   <section className="gallery-awards"><div className="gallery-container"><div className="gallery-awards-heading"><span>02 — INDIVIDUAL RECOGNITIONS</span><h2>The recognitions<br/><em>behind the photographs.</em></h2><p>Individual awards remain available here as a clean archive, while the main gallery keeps the focus on the wider professional journey.</p></div><div className="recognition-list">{galleryItems.map((item,i)=><button key={item.image} onClick={()=>setActive(i)}><span>{String(i+1).padStart(2,'0')}</span><strong>{item.title}</strong><small>{item.year}</small><ArrowUpRight size={16}/></button>)}</div></div></section>
  </main>
  <footer className="gallery-footer"><span>© {new Date().getFullYear()} CS Arisankala Manish Kumar</span><span>Company Secretary · Kolkata</span></footer>
  {active!==null&&<div className="gallery-lightbox" role="dialog" aria-modal="true" onClick={()=>setActive(null)}><button aria-label="Close" onClick={()=>setActive(null)}><X size={22}/></button><div onClick={e=>e.stopPropagation()}><img src={galleryItems[active].image} alt={galleryItems[active].title}/><h3>{galleryItems[active].title}</h3><p>{galleryItems[active].caption}</p></div></div>}
 </div>
}
