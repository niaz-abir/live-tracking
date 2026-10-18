 "use client";
import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { ArrowLeft, LocateFixed, MapPin, Navigation } from "lucide-react";
import { supabase } from "../../lib/supabase";

export default function StartPage() {
  const router = useRouter();
  const [name,setName] = useState("");
  const [location,setLocation] = useState("");
  const [coords,setCoords] = useState(null);
  const [busy,setBusy] = useState(false);
  const [message,setMessage] = useState("");
  function useLiveLocation() {
    setMessage("");
    if (!navigator.geolocation) { setMessage("Your browser does not support GPS location."); return; }
    setBusy(true);
    navigator.geolocation.getCurrentPosition(async p => {
      const c={lat:p.coords.latitude,lng:p.coords.longitude};
      setCoords(c); setLocation(`${c.lat.toFixed(6)}, ${c.lng.toFixed(6)}`); setBusy(false);
    }, e => { setBusy(false); setMessage(e.code===1?"Location permission was denied. Allow it in your browser settings and try again.":"Could not get location. Check GPS and try again."); }, {enableHighAccuracy:true,timeout:15000,maximumAge:0});
  }
  async function submit(e) {
    e.preventDefault(); setMessage("");
    if (!name.trim() || !coords) { setMessage("Enter a name and use the live-location button first."); return; }
    const id=crypto.randomUUID();
    const payload={id,name:name.trim(),lat:coords.lat,lng:coords.lng,updated_at:new Date().toISOString(),status:"Sharing location"};
    if (supabase) {
      const {error}=await supabase.from("trackers").upsert(payload);
      if (error) { setMessage("Could not save to the live database. Check your Supabase setup and table permissions."); return; }
    } else {
      localStorage.setItem("live-track-demo",JSON.stringify(payload));
    }
    localStorage.setItem("live-track-active-id",id);
    localStorage.setItem("live-track-demo",JSON.stringify(payload));
    router.push("/track");
  }
  return <main className="min-h-screen px-5 py-8 sm:px-8"><div className="mx-auto max-w-5xl"><Link href="/" className="inline-flex items-center gap-2 text-sm font-bold text-slate-500 hover:text-ink"><ArrowLeft size={16}/> Back home</Link>
    <div className="mt-8 grid overflow-hidden rounded-[2rem] bg-white shadow-soft md:grid-cols-[.85fr_1.15fr]">
      <aside className="relative flex min-h-[300px] flex-col justify-between overflow-hidden bg-ink p-8 text-white sm:p-10"><div className="absolute -right-16 -top-16 h-64 w-64 rounded-full bg-emerald-400/20 blur-2xl"/><Link href="/" className="relative flex items-center gap-2 text-lg font-black"><Navigation className="text-mint"/> live-track.</Link><div className="relative"><span className="rounded-full bg-white/10 px-3 py-2 text-xs font-bold uppercase tracking-widest text-mint">Step 01 / Details</span><h1 className="mt-6 text-4xl font-black leading-tight">Start a new<br/>journey.</h1><p className="mt-4 max-w-xs leading-7 text-slate-300">Tell us who is travelling, then share the device's current GPS location.</p></div><p className="relative text-xs text-slate-400">The device owner must grant location permission.</p></aside>
      <section className="p-7 sm:p-10"><h2 className="text-2xl font-black">Person details</h2><p className="mt-2 text-sm leading-6 text-slate-500">Use the location button to fill in your current coordinates.</p>
        <form onSubmit={submit} className="mt-8 space-y-6">
          <div><label htmlFor="name" className="mb-2 block text-sm font-bold">Person's name</label><input id="name" value={name} onChange={e=>setName(e.target.value)} placeholder="e.g. Rahim" className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-4 outline-none transition focus:border-emerald-500 focus:bg-white focus:ring-4 focus:ring-emerald-50" required/></div>
          <div><label htmlFor="location" className="mb-2 block text-sm font-bold">Live location</label><div className="flex gap-2"><input id="location" value={location} onChange={e=>setLocation(e.target.value)} placeholder="Tap the button to get GPS" readOnly className="min-w-0 flex-1 rounded-2xl border border-slate-200 bg-slate-50 px-4 py-4 text-sm outline-none"/><button type="button" onClick={useLiveLocation} disabled={busy} className="inline-flex shrink-0 items-center gap-2 rounded-2xl bg-emerald-500 px-4 font-bold text-ink transition hover:bg-emerald-400 disabled:opacity-60"><LocateFixed size={18}/><span className="hidden sm:inline">{busy?"Locating…":"Use GPS"}</span></button></div><p className="mt-2 text-xs leading-5 text-slate-500">GPS works on HTTPS (Vercel) or localhost. Your browser will ask permission.</p></div>
          {coords && <div className="flex items-center gap-3 rounded-2xl bg-emerald-50 p-4 text-sm text-emerald-800"><MapPin size={19}/><div><p className="font-bold">Location captured</p><p className="mt-1">{coords.lat.toFixed(5)}, {coords.lng.toFixed(5)}</p></div></div>}
          {message && <p role="alert" className="rounded-xl bg-rose-50 p-3 text-sm text-rose-700">{message}</p>}
          <button disabled={busy} className="flex w-full items-center justify-center gap-3 rounded-2xl bg-ink px-5 py-4 font-bold text-white transition hover:bg-slate-800 disabled:opacity-50">Open tracking dashboard <Navigation size={18}/></button>
        </form>
      </section>
    </div></div></main>;
}