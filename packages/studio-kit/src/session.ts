import { createStore } from 'zustand/vanilla';
import type { Course } from './content';
import { initialJourney, restore, type Journey } from './engine';
import { ConflictError, type JourneyRepository } from './storage';
type Status='loading'|'saved'|'saving'|'error'|'conflict';
export interface SessionState { journey:Journey; status:Status; ready:boolean; }
export function createSession(course:Course,repo:JourneyRepository){
  const store=createStore<SessionState>(()=>({journey:initialJourney(course),status:'loading',ready:false}));
  let timer:ReturnType<typeof setTimeout>|undefined; let revision=0; let dirty=false; let pending:Promise<boolean>|undefined;
  async function hydrate(){try{const raw=await repo.load(course.id);const journey=raw?restore(course,raw):initialJourney(course);revision=journey.revision;store.setState({journey,status:'saved',ready:true});}catch{store.setState({status:'error',ready:false});}}
  function flush():Promise<boolean>{
    clearTimeout(timer);
    if(pending)return pending.then(ok=>ok&&dirty?flush():ok);
    if(!dirty)return Promise.resolve(store.getState().status==='saved');
    if(store.getState().status==='conflict')return Promise.resolve(false);
    const snapshot=store.getState().journey; const record={...snapshot,revision:revision+1,updatedAt:new Date().toISOString()};
    store.setState({status:'saving'});
    pending=repo.save(record,revision).then(()=>{revision=record.revision;dirty=store.getState().journey!==snapshot;store.setState(dirty?{status:'saving'}:{journey:record,status:'saved'});return true;}).catch(error=>{store.setState({status:error instanceof ConflictError?'conflict':'error'});return false;}).finally(()=>{pending=undefined;});
    return pending.then(ok=>ok&&dirty?flush():ok);
  }
  function update(transform:(j:Journey)=>Journey){if(!store.getState().ready || store.getState().status==='conflict')return;store.setState({journey:transform(store.getState().journey),status:'saving'});dirty=true;clearTimeout(timer);timer=setTimeout(()=>void flush(),300);}
  return {store,hydrate,update,flush};
}
