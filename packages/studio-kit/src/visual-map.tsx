'use client';
import {useEffect,useRef} from 'react';
import rough from 'roughjs';
export interface MapItem {label:string;value:string;score?:number;}
export function VisualMap({kind,color,items}:{kind:string;color:string;items:MapItem[]}){
 const ref=useRef<SVGSVGElement>(null);const height=kind==='wheel'?360:Math.max(260,Math.ceil(items.length/2)*125+45);
 useEffect(()=>{const svg=ref.current!;svg.replaceChildren();const r=rough.svg(svg);const opts={seed:91,roughness:1.1,stroke:color,strokeWidth:1.4,fill:'#f5f2df',fillStyle:'hachure',hachureGap:12};
 const text=(x:number,y:number,value:string,size=12)=>{const t=document.createElementNS('http://www.w3.org/2000/svg','text');t.setAttribute('x',String(x));t.setAttribute('y',String(y));t.setAttribute('text-anchor','middle');t.setAttribute('direction','rtl');t.setAttribute('font-size',String(size));t.setAttribute('fill','#304c42');t.textContent=value.length>29?value.slice(0,27)+'…':value;svg.appendChild(t);};
 if(kind==='wheel'&&items.length){const n=items.length;for(let ring=1;ring<=5;ring++)svg.appendChild(r.circle(270,170,ring*44,{...opts,fill:'none',stroke:'#c7cbb9'}));const points:[number,number][]=[];items.forEach((item,i)=>{const a=-Math.PI/2+i*2*Math.PI/n;svg.appendChild(r.line(270,170,270+110*Math.cos(a),170+110*Math.sin(a),opts));text(270+147*Math.cos(a),176+140*Math.sin(a),item.label,11);if(item.score!==undefined)points.push([270+item.score*22*Math.cos(a),170+item.score*22*Math.sin(a)]);});if(points.length===n)svg.appendChild(r.polygon(points,{...opts,fill:color+'35'}));else items.forEach((item,i)=>{if(item.score!==undefined){const a=-Math.PI/2+i*2*Math.PI/n;svg.appendChild(r.circle(270+item.score*22*Math.cos(a),170+item.score*22*Math.sin(a),8,{...opts,fill:color}));}});return;}
 items.forEach((item,i)=>{const x=i%2===0?292:22,y=25+Math.floor(i/2)*125;svg.appendChild(r.rectangle(x,y,225,87,opts));text(x+112,y+26,item.label,11);text(x+112,y+57,item.value,13);if(i<items.length-1&&i%2===0){svg.appendChild(r.line(286,y+42,254,y+42,opts));svg.appendChild(r.line(254,y+42,263,y+34,opts));svg.appendChild(r.line(254,y+42,263,y+50,opts));}if(i%2===1&&i<items.length-1){svg.appendChild(r.path(`M130 ${y+91} C130 ${y+116} 400 ${y+95} 405 ${y+119}`,{...opts,fill:'none'}));}});
 },[items,kind,color]);
 return <svg ref={ref} className="visual-map" viewBox={`0 0 540 ${height}`} role="img" aria-label="نقشه پاسخ‌های ثبت‌شده؛ متن کامل در کارت‌های گزارش آمده است" style={{width:'100%',height:'auto'}}/>;
}
