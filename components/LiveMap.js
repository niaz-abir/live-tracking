 "use client";
import { useEffect } from "react";
import { MapContainer, TileLayer, Marker, Polyline, useMap } from "react-leaflet";
import L from "leaflet";

const personIcon = new L.DivIcon({className:"",html:'<div style="width:38px;height:38px;border-radius:50% 50% 50% 8px;transform:rotate(-45deg);background:#10b981;border:3px solid white;box-shadow:0 4px 14px #10223b55;display:grid;place-items:center"><div style="width:10px;height:10px;border-radius:50%;background:#10223b"></div></div>',iconSize:[38,38],iconAnchor:[19,38]});
function Recenter({person}) { const map=useMap(); useEffect(()=>{if(person?.lat&&person?.lng) map.flyTo([person.lat,person.lng],Math.max(map.getZoom(),14),{duration:1});},[person?.lat,person?.lng,map]);return null; }
export default function LiveMap({person,history=[]}) {
 const center=person?[Number(person.lat),Number(person.lng)]:[23.8067,90.3686];
 const points=history.map(p=>[Number(p.lat),Number(p.lng)]);
 return <MapContainer center={center} zoom={13} scrollWheelZoom className="h-full min-h-[420px] w-full">
   <TileLayer attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors' url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"/>
   {person && <><Recenter person={person}/><Marker position={[Number(person.lat),Number(person.lng)]} icon={personIcon}/>{points.length>1&&<Polyline positions={points} pathOptions={{color:"#10b981",weight:5,opacity:.85}}/>}</>}
 </MapContainer>;
}