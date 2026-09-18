import type { ButtonHTMLAttributes, ReactNode } from 'react';
export function ActionButton(props:ButtonHTMLAttributes<HTMLButtonElement>){return <button {...props} className={`action ${props.className??''}`}/>;}
export function AppShell({title,subtitle,children}:{title:string;subtitle:string;children:ReactNode}){return <main className="app-shell"><header className="brand"><span className="compass-mark" aria-hidden="true">✧</span><div><span className="eyebrow">{subtitle}</span><h1>{title}</h1></div></header>{children}</main>;}
export function ProgressMeter({value,max,label}:{value:number;max:number;label:string}){return <div className="meter"><div><span>{label}</span><b>{Math.round(value/max*100)}٪</b></div><progress value={value} max={max} aria-label={label}/></div>;}
