import Link from "next/link";
import { ArrowRight, MapPin, Radio, ShieldCheck, Navigation } from "lucide-react";

export default function Home() {
  return <main className="min-h-screen overflow-hidden">
    <nav className="mx-auto flex max-w-7xl items-center justify-between px-6 py-6">
      <Link href="/" className="flex items-center gap-3 font-black tracking-tight text-xl"><span className="grid h-10 w-10 place-items-center rounded-2xl bg-ink text-mint"><Navigation size={21}/></span>live-track<span className="text-emerald-500">.</span></Link>
      <Link href="/track" className="rounded-full border border-slate-200 bg-white px-5 py-2.5 text-sm font-bold hover:border-emerald-400">Open dashboard ↗</Link>
    </nav>
    <section className="mx-auto grid max-w-7xl items-center gap-12 px-6 pb-20 pt-10 lg:grid-cols-[1.05fr_.95fr] lg:pt-20">
      <div>
        <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-emerald-100 bg-emerald-50 px-4 py-2 text-sm font-semibold text-emerald-800"><span className="h-2 w-2 animate-pulse rounded-full bg-emerald-500"/> Your journey, on the map</div>
        <h1 className="max-w-2xl text-5xl font-black leading-[1.08] tracking-tight sm:text-6xl">Know the journey.<br/><span className="text-emerald-500">Follow the route.</span></h1>
        <p className="mt-6 max-w-xl text-lg leading-8 text-slate-600">Share a person's location with their permission and follow their trip on a live map—from Mirpur 1 to Mirpur 2 and beyond.</p>
        <div className="mt-9 flex flex-wrap gap-3"><Link href="/start" className="inline-flex items-center gap-3 rounded-2xl bg-ink px-6 py-4 font-bold text-white shadow-soft transition hover:-translate-y-0.5">Start tracking <ArrowRight size={18}/></Link><Link href="/track" className="rounded-2xl border border-slate-200 bg-white px-6 py-4 font-bold hover:bg-slate-50">View dashboard</Link></div>
        <div className="mt-9 flex flex-wrap gap-5 text-sm text-slate-500"><span className="flex items-center gap-2"><ShieldCheck size={17} className="text-emerald-600"/> Permission-based location</span><span className="flex items-center gap-2"><Radio size={17} className="text-emerald-600"/> Live updates when configured</span></div>
      </div>
      <div className="relative">
        <div className="absolute -inset-5 rounded-[3rem] bg-emerald-100/70 blur-2xl"/>
        <div className="relative overflow-hidden rounded-[2rem] border border-white bg-white p-4 shadow-soft">
          <div className="relative h-[390px] overflow-hidden rounded-[1.5rem] bg-[#e5f0e9]">
            <div className="absolute inset-0 opacity-70" style={{backgroundImage:"linear-gradient(25deg, transparent 45%, white 46%, white 49%, transparent 50%),linear-gradient(115deg, transparent 35%, white 36%, white 39%, transparent 40%),linear-gradient(165deg, transparent 65%, #c5dfd0 66%, #c5dfd0 69%, transparent 70%)",backgroundSize:"190px 170px,220px 180px,240px 160px"}}/>
            <div className="absolute left-[15%] top-[22%] rounded-xl bg-white px-3 py-2 text-xs font-bold shadow">Mirpur 1</div><div className="absolute bottom-[19%] right-[12%] rounded-xl bg-white px-3 py-2 text-xs font-bold shadow">Mirpur 2</div>
            <svg className="absolute inset-0 h-full w-full" viewBox="0 0 400 390" fill="none"><path d="M80 105 C130 115 130 185 210 180 S270 260 320 290" stroke="#10b981" strokeWidth="5" strokeLinecap="round" strokeDasharray="9 10"/><circle cx="80" cy="105" r="9" fill="#10223b" stroke="white" strokeWidth="4"/><circle cx="320" cy="290" r="11" fill="#10b981" stroke="white" strokeWidth="4"/></svg>
            <div className="absolute bottom-4 left-4 right-4 rounded-2xl bg-white/95 p-4 shadow"><div className="flex items-center justify-between"><div><p className="text-xs text-slate-500">JOURNEY STATUS</p><p className="mt-1 font-bold">On the way</p></div><span className="rounded-full bg-emerald-100 px-3 py-1 text-xs font-bold text-emerald-700">● Live-ready</span></div></div>
          </div>
          <div className="flex items-center justify-between px-2 pb-1 pt-4"><div><p className="font-bold">Journey overview</p><p className="mt-1 text-sm text-slate-500">A clear view from start to destination</p></div><MapPin className="text-emerald-500"/></div>
        </div>
      </div>
    </section>
    <section className="border-y border-slate-200 bg-white"><div className="mx-auto grid max-w-7xl gap-6 px-6 py-8 md:grid-cols-3">{[["01","Enter details","Add a name and share the current GPS location."],["02","Share the journey","Allow location access on the device being tracked."],["03","Follow on the map","Watch location updates and see the route on the dashboard."]].map(x=><div key={x[0]} className="flex gap-4"><span className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-emerald-50 font-black text-emerald-700">{x[0]}</span><div><h3 className="font-bold">{x[1]}</h3><p className="mt-1 text-sm leading-6 text-slate-500">{x[2]}</p></div></div>)}</div></section>
    <footer className="mx-auto flex max-w-7xl flex-wrap justify-between gap-3 px-6 py-7 text-xs text-slate-500"><span>© 2026 Live-Track</span><span>Location sharing should always be consensual.</span></footer>
  </main>;
}