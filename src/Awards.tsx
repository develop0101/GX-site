import { useState } from 'react';
import { ArrowUpRight, X } from 'lucide-react';

const awards = [
  { image:'/images/awards/award-01-tongue-twister-judge.png', year:'2025', title:'Hon. Judge — Tongue Twister Competition', org:'Hooghly Chapter of EIRC of ICSI · Mega Student Carnival' },
  { image:'/images/awards/award-02-pcs-day.png', year:'2025', title:'PCS Day Recognition', org:'Hosted by EIRC of ICSI' },
  { image:'/images/awards/award-03-mega-student-conference.png', year:'2023', title:"Mega Student's Conference", org:'ICSI · Presented to CS Arisankala Manish Kumar' },
  { image:'/images/awards/award-04-hooghly-chapter.png', year:'Professional engagement', title:'Hooghly Chapter Recognition', org:'ICSI · Hooghly Chapter' },
  { image:'/images/awards/award-05-posh-session.png', year:'2026', title:'Professional Knowledge Session', org:'Madhya Kolkata Study Circle for Members of ICSI-EIRC · POSH' },
  { image:'/images/awards/award-06-adapting-mca-v3.png', year:'2025', title:'Adapting to MCA V3', org:'ICMAI Howrah Chapter · ROC Transition & Compliance Challenges' },
  { image:'/images/awards/award-07-gst-input-tax-credit.png', year:'2026', title:'Input Tax Credit under GST', org:'ICMAI Howrah Chapter · Eligibility, Restrictions, Reversal & Judicial Trends' },
  { image:'/images/awards/award-08-gst-rate-cuts.png', year:'2025', title:'Impact of GST Rate Cuts', org:'ICMAI Howrah Chapter · Insights from the 56th GST Council Meeting' },
  { image:'/images/awards/award-09-mca-v3-solutions.png', year:'Professional engagement', title:'MCA-V3 Portal: Common Errors & Practical Solutions', org:'ICMAI Howrah Chapter' },
  { image:'/images/awards/award-10-hooghly-chapter-gratitude.png', year:'2024', title:'Knowledge-Sharing Recognition', org:'Hooghly Chapter of ICSI · Full Day Seminar' },
  { image:'/images/awards/award-11-bhawanipur-education-appreciation.png', year:'Professional engagement', title:'Appreciation for Support in Education', org:'The Bhawanipur Education Society College' },
  { image:'/images/awards/award-12-moot-court-competition.png', year:'2026', title:'24th All India Moot Court Competition', org:'Chapter Level — Kolkata · ICSI-EIRC, CCGR&T Kolkata Campus' },
  { image:'/images/awards/award-13-regional-conference.png', year:'2017', title:'9th Regional Conference of Student Company Secretaries', org:'ICSI-EIRC jointly with Hooghly Chapter · Synergy — Unleash Your Potential' },
  { image:'/images/awards/award-14-3rd-best-participant.png', year:'2016', title:'3rd Best Participant — 112th MSOP', org:'ICSI-EIRC · Management Skills Orientation Programme · Kolkata' },
];

export default function Awards(){
 const [active,setActive]=useState<number|null>(null);
 return <div className="awards-page">
  <header className="awards-header"><a href="/" className="awards-brand"><b>CS</b><span>ARISANKALA<br/>MANISH KUMAR</span></a><nav><a href="/">Home</a><a href="/about">About</a><a href="/vision">Vision</a><a href="/commitments">Commitments</a><a className="active" href="/awards">Awards</a><a href="/connect">Connect</a></nav><a className="awards-cta" href="/commitments">Explore Commitments <ArrowUpRight size={15}/></a></header>
  <main>
   <section className="awards-hero"><div className="awards-container"><p className="awards-eyebrow">Professional record · Recognition</p><h1>A record of <em>recognition.</em></h1><p>Selected awards, acknowledgements and professional recognitions reflecting years of participation, knowledge-sharing, institutional engagement and service to the professional community.</p></div></section>
   <section className="awards-gallery"><div className="awards-container"><div className="awards-gallery-head"><div><span>01 — 14</span><h2>Professional<br/><em>milestones.</em></h2></div><p>Each recognition is presented individually — preserving the original award, inscription and context rather than reducing the record to a single collage.</p></div><div className="awards-grid">{awards.map((a,i)=><article className="award-card" key={a.image} onClick={()=>setActive(i)}><div className="award-media"><img src={a.image} alt={`${a.title} — ${a.org}`} loading="lazy"/><span className="award-open">View <ArrowUpRight size={15}/></span></div><div className="award-meta"><span>{a.year}</span><small>{String(i+1).padStart(2,'0')}</small></div><h3>{a.title}</h3><p>{a.org}</p></article>)}</div></div></section>
   <section className="awards-close"><div className="awards-container"><span>Recognition is part of the record.<br/>The work behind it is the story.</span><a href="/engagements">Explore professional engagements <ArrowUpRight size={16}/></a></div></section>
  </main>
  <footer className="awards-footer"><span>© {new Date().getFullYear()} CS Arisankala Manish Kumar</span><span>Company Secretary · Kolkata</span></footer>
  {active!==null&&<div className="award-lightbox" role="dialog" aria-modal="true" onClick={()=>setActive(null)}><button aria-label="Close" onClick={()=>setActive(null)}><X size={22}/></button><div onClick={e=>e.stopPropagation()}><img src={awards[active].image} alt={awards[active].title}/><h3>{awards[active].title}</h3><p>{awards[active].org}</p></div></div>}
 </div>
}
