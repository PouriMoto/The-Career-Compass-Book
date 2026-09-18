import Dexie, { type Table } from 'dexie';
import type { Journey } from './engine';
export interface JourneyRepository { load(id:string):Promise<unknown|undefined>; save(record:Journey,expectedRevision:number):Promise<void>; }
export class ConflictError extends Error { constructor(){super('Newer data exists in another tab');} }
export class DexieJourneyRepository implements JourneyRepository {
  readonly db:Dexie; readonly records:Table<Journey,string>;
  constructor(name='compass-studio'){ this.db=new Dexie(name); this.db.version(1).stores({journeys:'id, updatedAt'}); this.records=this.db.table('journeys'); }
  load(id:string){return this.records.get(id);}
  async save(record:Journey,expectedRevision:number){await this.db.transaction('rw',this.records,async()=>{const previous=await this.records.get(record.id); if((previous?.revision??0)!==expectedRevision) throw new ConflictError(); await this.records.put(record);});}
}
