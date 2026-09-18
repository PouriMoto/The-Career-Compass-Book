'use client';
import {useEffect,useRef} from 'react';
import rough from 'roughjs';
export function Sketch({kind='path',color='#27776a',count=0}:{kind?:string;color?:string;count?:number}){
 const ref=useRef<SVGSVGElement>(null);
 useEffect(()=>{const svg=ref.current!;svg.replaceChildren();const r=rough.svg(svg);const o={seed:37,roughness:1.3,stroke:color,strokeWidth:2,fill:color+'20',fillStyle:'hachure',hachureGap:9};const add=(node:SVGGElement)=>svg.appendChild(node);
 if(kind==='wheel'){for(let i=0;i<10;i++){const a=i*Math.PI/5;add(r.line(180,140,180+110*Math.cos(a),140+110*Math.sin(a),o));}add(r.circle(180,140,220,o));add(r.circle(180,140,120,{...o,fill:'none'}));}
 else if(kind==='network'){add(r.circle(180,140,54,o));for(let i=0;i<6;i++){const a=i*Math.PI/3;const x=180+120*Math.cos(a),y=140+100*Math.sin(a);add(r.line(180,140,x,y,o));add(r.circle(x,y,42,o));}}
 else if(kind==='matrix'||kind==='board'||kind==='portrait'||kind==='day'){for(let i=0;i<6;i++){const x=32+(i%3)*104,y=38+Math.floor(i/3)*110;add(r.rectangle(x,y,85,85,{...o,fill:i<count?color+'55':'#ffffff'}));add(r.line(x+15,y+27,x+67,y+27,o));add(r.line(x+15,y+45,x+53,y+45,o));}}
 else {for(let lane=0;lane<(kind==='paths'?2:1);lane++){const y=65+lane*110;add(r.path(`M320 ${y} C220 ${y-40} 250 ${y+130} 155 ${y+100} S100 ${y+30} 38 ${y+90}`,{...o,fill:'none'}));add(r.line(38,y+90,63,y+68,o));add(r.line(38,y+90,70,y+99,o));for(let i=0;i<4;i++)add(r.circle(305-i*78,y+(i%2)*74,25,{...o,fill:i<count?color:'#fff'}));}add(r.line(310,15,310,65,o));add(r.polygon([[310,15],[340,25],[310,36]],{...o,fill:'#eac47c'}));}
 },[kind,color,count]);
 return <svg ref={ref} viewBox="0 0 360 290" aria-hidden="true" className="sketch-art"/>;
}
