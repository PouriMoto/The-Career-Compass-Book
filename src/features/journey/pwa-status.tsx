'use client';
import {useEffect,useState} from 'react';
interface InstallEvent extends Event {prompt():Promise<void>;userChoice:Promise<{outcome:string}>;}
export function PwaStatus(){
  const [state,setState]=useState('در حال آماده‌سازی نسخه آفلاین…');
  const [install,setInstall]=useState<InstallEvent|null>(null);
  useEffect(()=>{
    if(process.env.NODE_ENV!=='production')return;
    if(!('serviceWorker' in navigator))return;
    let active=true;
    const prompt=(e:Event)=>{e.preventDefault();setInstall(e as InstallEvent);};
    window.addEventListener('beforeinstallprompt',prompt);
    navigator.serviceWorker.register('/sw.js',{updateViaCache:'none'}).then(reg=>{
      const show=()=>{if(!active)return;if(reg.waiting)setState('نسخه تازه آماده است؛ پس از ذخیره یادداشت‌ها همه پنجره‌های اپ را ببند و دوباره باز کن.');else if(reg.active)setState('نسخه آفلاین آماده است؛ می‌توانی بدون اینترنت هم اپ را باز کنی.');};
      show();reg.addEventListener('updatefound',()=>reg.installing?.addEventListener('statechange',show));
      void navigator.serviceWorker.ready.then(show);
    }).catch(()=>{if(active)setState('آماده‌سازی آفلاین انجام نشد؛ با اینترنت دوباره صفحه را باز کن.');});
    return ()=>{active=false;window.removeEventListener('beforeinstallprompt',prompt);};
  },[]);
  if(process.env.NODE_ENV!=='production')return null;
  return <aside className="notice"><p role="status">{state}</p>{install?<button onClick={async()=>{await install.prompt();await install.userChoice;setInstall(null);}}>نصب قطب‌نما روی دستگاه</button>:<small>نصب از منوی مرورگر یا در iPhone از Share ← Add to Home Screen</small>}</aside>;
}
