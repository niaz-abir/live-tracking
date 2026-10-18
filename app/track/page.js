 "use client";
import { useCallback, useEffect, useState } from "react";
import Link from "next/link";
import dynamic from "next/dynamic";
import { ArrowLeft, LocateFixed, MapPin, Navigation, Radio, RefreshCw, ShieldCheck } from "lucide-react";
import { supabase } from "../../lib/supabase";
const LiveMap = dynamic(()=>import("../../components/LiveMap"),{ssr:false,loading:()=> <div className="grid h-full min-h-[420px] place-items-center bg-emerald-50 text-sm text-slate-500">Loading map…</div>});

export default function TrackPage() {
  const [person,setPerson]=useState(null);
  const [history,setHistory]=useState([]);
  const [live,setLive]=useState(false);
  const [notice,setNotice]=useState("Waiting for a tracking session.");
  const load=useCallback(async()=>{
    const id=typeof window!=="undefined"?localStorage.getItem("live-track-active-id"):null;
    if (supabase && id) {
      const {data,error}=await supabase.from("trackers").select("*").eq("id",id).maybeSingle();
      if (!error && data) { setPerson(data); setHistory(h=>[...h.slice(-49),{lat:data.lat,lng:data.lng}]); setNotice("Connected to shared tracker."); setLive(true); return; }
    }
    const demo=typeof window!=="undefined"?localStorage.getItem("live-track-demo"):null;
    if(demo){const d=JSON.parse(demo);setPerson(d);setHistory(h=>h.length?[...h.slice(-49),{lat:d.lat,lng:d.lng}]:[{lat:d.lat,lng:d.lng}]);setNotice(supabase?"Showing saved session; waiting for database sync.":"Demo mode: this browser only. Add Supabase to sync across devices.");}
    else {setPerson(null);setNotice("No journey found yet. Create one from the form page.");}
  },[]);
  useEffect(()=>{load(); const t=setInterval(load,5000); return ()=>clearInterval(t);},[load]);
  async function startSharing() {
    if(!person || !navigator.geolocation) {setNotice("Create a session first and use a GPS-capable browser.");return;}
    setLive(true); setNotice("Requesting location permission…");
    navigator.geolocation.watchPosition(async p=>{
      const next={...person,lat:p.coords.latitude,lng:p.coords.longitude,updated_at:new Date().toISOString()};
      setPerson(next); setHistory(h=>[...h.slice(-49),{lat:next.lat,lng:next.lng}]);
      localStorage.setItem("live-track-demo",JSON.stringify(next));
      if(supabase){const {error}=await supabase.from("trackers").upsert(next);setNotice(error?"GPS active, but database update failed. Check table permissions.":"Live GPS updates are being shared.");}
      else setNotice("GPS active in this browser. Configure Supabase to share live updates with other devices.");
    },e=>{setLive(false);setNotice(e.code===1?"Location permission denied. Enable it to share live movement.":"GPS unavailable. Check location services.");},{enableHighAccuracy:true,maximumAge:2000,timeout:15000});
  }
  return <main className="min-h-screen"><header className="border-b border-slate-200 bg-white"><div className="mx-auto flex max-w-7xl items-center justify-between px-5 py-5"><Link href="/" className="flex items-center gap-2 font-black text-xl"><span className="grid h-9 w-9 place-items-center rounded-xl bg-ink text-emerald-300"><Navigation size={18}/></span>live-track<span className="text-emerald-500">.</span></Link><Link href="/start" className="rounded-xl bg-ink px-4 py-2.5 text-sm font-bold text-white">+ New journey</Link></div></header>
    <div className="mx-auto max-w-7xl px-5 py-7"><Link href="/" className="inline-flex items-center gap-2 text-sm font-bold text-slate-500"><ArrowLeft size={15}/> Home</Link><div className="mt-5 flex flex-wrap items-end justify-between gap-4"><div><p className="text-xs font-black uppercase tracking-[.2em] text-emerald-600">Journey control</p><h1 className="mt-2 text-3xl font-black sm:text-4xl">Tracking dashboard</h1><p className="mt-2 text-sm text-slate-500">Follow the current GPS point on the map.</p></div><button onClick={load} className="inline-flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm font-bold"><RefreshCw size={16}/> Refresh</button></div>
    <div className="mt-7 grid gap-5 lg:grid-cols-[minmax(0,1fr)_320px]"><section className="overflow-hidden rounded-[1.7rem] border border-slate-200 bg-white shadow-soft"><div className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-100 p-5"><div className="flex items-center gap-3"><span className="grid h-11 w-11 place-items-center rounded-2xl bg-emerald-50 text-emerald-700"><MapPin size={21}/></span><div><p className="font-black">{person?.name||"No person selected"}</p><p className="mt-1 text-xs text-slate-500">{person?`${Number(person.lat).toFixed(5)}, ${Number(person.lng).toFixed(5)}`:"Create a journey to begin"}</p></div></div><span className={`rounded-full px-3 py-2 text-xs font-bold ${live?"bg-emerald-100 text-emerald-800":"bg-slate-100 text-slate-600"}`}><span className="mr-1">●</span>{live?"GPS sharing":"Not sharing"}</span></div><div className="h-[460px]"><LiveMap person={person} history={history}/></div><div className="flex flex-wrap items-center justify-between gap-3 border-t border-slate-100 p-4 text-xs text-slate-500"><span className="flex items-center gap-2"><Radio size={15} className="text-emerald-600"/>{notice}</span><span>Map © OpenStreetMap</span></div></section>
      <aside className="space-y-4"><div className="rounded-[1.7rem] bg-ink p-6 text-white"><div className="flex items-center justify-between"><span className="text-sm font-semibold text-slate-300">Current journey</span><Navigation className="text-emerald-300"/></div><h2 className="mt-4 text-2xl font-black">{person?.name||"No journey yet"}</h2><p className="mt-2 text-sm text-slate-300">{person?"Location last received from the active session.":"Use the form to create a journey."}</p><button disabled={!person||live} onClick={startSharing} className="mt-6 flex w-full items-center justify-center gap-2 rounded-xl bg-emerald-300 px-4 py-3 font-black text-ink hover:bg-emerald-200 disabled:cursor-not-allowed disabled:opacity-50"><LocateFixed size={18}/>{live?"Sharing enabled":"Share this device's GPS"}</button><p className="mt-3 text-xs leading-5 text-slate-400">Only tap this on the device whose location should be shared. Browser permission is required.</p></div>
      <div className="rounded-[1.7rem] border border-slate-200 bg-white p-6"><h3 className="font-black">Trip details</h3><div className="mt-5 space-y-4"><div className="flex gap-3"><span className="mt-1 h-2.5 w-2.5 rounded-full bg-emerald-500"/><div><p className="text-sm font-bold">Current position</p><p className="mt-1 break-all text-xs leading-5 text-slate-500">{person?`${Number(person.lat).toFixed(6)}, ${Number(person.lng).toFixed(6)}`:"Not available"}</p></div></div><div className="ml-1 h-7 border-l-2 border-dashed border-slate-200"/><div className="flex gap-3"><span className="mt-1 h-2.5 w-2.5 rounded-full bg-ink"/><div><p className="text-sm font-bold">Destination</p><p className="mt-1 text-xs leading-5 text-slate-500">This demo follows GPS movement. A fixed destination and bus route can be added next.</p></div></div></div></div>
      <div className="rounded-2xl border border-emerald-100 bg-emerald-50 p-4 text-xs leading-5 text-emerald-900"><ShieldCheck size={17} className="mb-2"/><b>Privacy note</b><br/>Share location only with the person's clear permission. Demo mode stores location in this browser.</div></aside></div></div></main>;
}