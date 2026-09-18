import type { Course, Stage } from './content';
export interface Journey { id: string; contentVersion: number; answers: Record<string,string>; completed: string[]; stageId: string; sceneIndex: number; revision: number; updatedAt: string; }
export const answerKey = (stageId:string, sceneId:string) => `${stageId}/${sceneId}`;
export function initialJourney(course:Course):Journey { return {id:course.id,contentVersion:course.version,answers:{},completed:[],stageId:course.stages[0].id,sceneIndex:0,revision:0,updatedAt:''}; }
export function canOpen(course:Course, journey:Journey, stageId:string) { const index=course.stages.findIndex(s=>s.id===stageId); return index>=0 && course.stages[index].available && course.stages.slice(0,index).every(s=>journey.completed.includes(s.id)); }
export function sceneValid(stage:Stage, journey:Journey, index:number) { const s=stage.scenes[index]; return !!s && (journey.answers[answerKey(stage.id,s.id)]??'').trim().length>=s.minLength; }
export function advance(course:Course, journey:Journey):Journey {
  const stage=course.stages.find(s=>s.id===journey.stageId);
  if(!stage || !canOpen(course,journey,stage.id) || !stage.scenes.slice(0,journey.sceneIndex+1).every((_,i)=>sceneValid(stage,journey,i))) throw new Error('Incomplete scene');
  if(journey.sceneIndex<stage.scenes.length-1) return {...journey,sceneIndex:journey.sceneIndex+1};
  return {...journey,completed:[...new Set([...journey.completed,stage.id])]};
}
export function editAnswer(journey:Journey,course:Course,value:string):Journey {
  const index=course.stages.findIndex(s=>s.id===journey.stageId); const stage=course.stages[index];
  const affected=new Set(course.stages.slice(index).map(s=>s.id));
  return {...journey,answers:{...journey.answers,[answerKey(stage.id,stage.scenes[journey.sceneIndex].id)]:value},completed:journey.completed.filter(id=>!affected.has(id))};
}
export function restore(course:Course, raw:unknown):Journey {
  if(!raw || typeof raw!=='object') throw new Error('Invalid backup');
  const r=raw as Journey;
  if(r.id!==course.id || r.contentVersion!==course.version || !r.answers || typeof r.answers!=='object' || Array.isArray(r.answers) || !Object.values(r.answers).every(v=>typeof v==='string') || !Array.isArray(r.completed) || !r.completed.every(v=>typeof v==='string') || !Number.isInteger(r.revision) || r.revision<0) throw new Error('Incompatible backup');
  const clean={...initialJourney(course),answers:r.answers,revision:r.revision,updatedAt:typeof r.updatedAt==='string'?r.updatedAt:''};
  for(const stage of course.stages) { if(stage.available && r.completed.includes(stage.id) && stage.scenes.every((_,i)=>sceneValid(stage,clean,i)) && canOpen(course,clean,stage.id)) clean.completed.push(stage.id); }
  if(canOpen(course,clean,r.stageId)) { clean.stageId=r.stageId; const stage=course.stages.find(s=>s.id===r.stageId)!; const firstInvalid=stage.scenes.findIndex((_,i)=>!sceneValid(stage,clean,i)); clean.sceneIndex=Math.max(0,Math.min(Number.isInteger(r.sceneIndex)?r.sceneIndex:0,firstInvalid<0?stage.scenes.length-1:firstInvalid)); }
  return clean;
}
