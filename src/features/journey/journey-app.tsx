'use client';
import { useEffect, useState } from 'react';
import { useStore } from 'zustand';
import type { Course } from '@compass/studio-kit/content';
import { advance, answerKey, canOpen, editAnswer, restore, sceneValid } from '@compass/studio-kit/engine';
import { DexieJourneyRepository } from '@compass/studio-kit/storage';
import { createSession } from '@compass/studio-kit/session';
import { ActionButton, AppShell, ProgressMeter } from '@compass/studio-kit/ui';

export function JourneyApp({course}:{course:Course}){
  const [session]=useState(()=>createSession(course,new DexieJourneyRepository()));
  const {journey,status,ready}=useStore(session.store);
  const [opened,setOpened]=useState(false); const [online,setOnline]=useState(true); const [notice,setNotice]=useState('');
  const [busy,setBusy]=useState(false);
  const l=course.labels; const stage=course.stages.find(s=>s.id===journey.stageId)!; const scene=stage.scenes[journey.sceneIndex];
  useEffect(()=>{void session.hydrate();
    const connection=()=>setOnline(navigator.onLine);
    const hidden=()=>{if(document.visibilityState==='hidden')void session.flush();};
    const leave=(e:BeforeUnloadEvent)=>{if(session.store.getState().status!=='saved'){e.preventDefault();}};
    connection();window.addEventListener('online',connection);window.addEventListener('offline',connection);window.addEventListener('beforeunload',leave);document.addEventListener('visibilitychange',hidden);
    return ()=>{window.removeEventListener('online',connection);window.removeEventListener('offline',connection);window.removeEventListener('beforeunload',leave);document.removeEventListener('visibilitychange',hidden);};
  },[session]);
  const download=()=>{const blob=new Blob([JSON.stringify(journey,null,2)],{type:'application/json'});const url=URL.createObjectURL(blob);const a=document.createElement('a');a.href=url;a.download=`${course.id}-backup.json`;a.click();setTimeout(()=>URL.revokeObjectURL(url),1000);};
  async function next(){setBusy(true);try{if(!await session.flush())return;session.update(j=>advance(course,j));await session.flush();}finally{setBusy(false);}}
  async function importFile(file?:File){if(!file)return;try{if(file.size>2_000_000)throw new Error();const restored=restore(course,JSON.parse(await file.text()));if(!window.confirm(l.importConfirm))return;session.update(()=>restored);if(await session.flush()){setOpened(false);setNotice('');}}catch{setNotice(l.invalidImport);}}
  const completed=journey.completed.includes(stage.id);
  return <AppShell title={course.title} subtitle={l.brand}>
    <div className={`save-status ${status==='error'||status==='conflict'?'warning':''}`} role="status">{l[status]}{status==='error'&&<button onClick={()=>void (ready?session.flush():session.hydrate())}>{l.retry}</button>}</div>
    {!online&&<p className="notice">{l.offline}</p>}
    {!ready?<p>{l.loading}</p>:<>
      <ProgressMeter value={journey.completed.length} max={course.stages.length} label={l.progress}/>
      {!opened?<>
        <section className="hero"><span className="eyebrow">01 / 09</span><h2>{stage.title}</h2><p>{course.description}</p><ActionButton onClick={()=>setOpened(true)}>{journey.completed.length?l.review:l.start} ←</ActionButton></section>
        <h2 className="section-title">{l.path}</h2><div className="stage-path">{course.stages.map((s,index)=><button className={`stage-card ${canOpen(course,journey,s.id)?'available':''}`} key={s.id} disabled={!canOpen(course,journey,s.id)} onClick={()=>{session.update(j=>({...j,stageId:s.id,sceneIndex:s.id===j.stageId?j.sceneIndex:0}));setOpened(true);}}><span className="stage-number">{journey.completed.includes(s.id)?'✓':String(index+1).padStart(2,'0')}</span><span><strong>{s.title}</strong><small lang="en">{s.subtitle}</small></span><span className="stage-state">{journey.completed.includes(s.id)?l.completed:!s.available?l.soon:'←'}</span></button>)}</div>
      </>:<section className="workbook">
        <button className="text-button" onClick={()=>{void session.flush();setOpened(false);}}>{l.home} →</button>
        {completed?<div className="completion"><span className="completion-icon">✓</span><h2>{l.complete}</h2><p>{l.completionText}</p><div className="journey-map">{stage.scenes.map(s=><article key={s.id}><h3>{s.title}</h3><p>{journey.answers[answerKey(stage.id,s.id)]}</p></article>)}</div><p className="notice">{l.ai}</p><ActionButton onClick={()=>session.update(j=>({...j,completed:j.completed.filter(id=>id!==stage.id),sceneIndex:0}))}>{l.review}</ActionButton></div>:<>
          <div className="scene-tabs">{stage.scenes.map((s,i)=><span key={s.id} className={i===journey.sceneIndex?'active':''}>{i+1}. {l[s.kind]}</span>)}</div>
          <h2 tabIndex={-1}>{scene.title}</h2><p className="prompt">{scene.prompt}</p>
          {scene.kind!=='exercise'&&<div className="journey-map" aria-label={l.mapTitle}><article><h3>{l.today}</h3><p>{journey.answers[answerKey(stage.id,stage.scenes[0].id)]}</p></article><span aria-hidden="true">↓</span><article><h3>{l.destination}</h3><p>{journey.answers[answerKey(stage.id,stage.scenes[1].id)]||scene.prompt}</p></article></div>}
          <label htmlFor="answer">{l.answer}</label><textarea id="answer" disabled={status==='conflict'||busy} rows={6} value={journey.answers[answerKey(stage.id,scene.id)]??''} onChange={e=>session.update(j=>editAnswer(j,course,e.target.value))} aria-describedby="minimum"/><small id="minimum">{l.minimum}</small>
          <div className="scene-actions"><ActionButton disabled={busy||status==='conflict'||!sceneValid(stage,journey,journey.sceneIndex)} onClick={()=>void next()}>{journey.sceneIndex===stage.scenes.length-1?l.finish:l.continue} ←</ActionButton><button className="text-button" disabled={busy||journey.sceneIndex===0} onClick={()=>session.update(j=>({...j,sceneIndex:j.sceneIndex-1}))}>{l.back}</button></div>
        </>}
      </section>}
      <footer><p>{l.sample}</p><div className="backup-actions"><button onClick={download}>{l.export}</button><label className="import-label">{l.import}<input aria-label={l.import} type="file" accept="application/json,.json" disabled={status==='conflict'||busy} onChange={e=>{void importFile(e.target.files?.[0]);e.target.value='';}}/></label></div><p role="alert">{notice}</p><small>{l.storageNote}</small></footer>
    </>}
  </AppShell>;
}
