import Dexie,{type Table} from 'dexie';import type {Goal,Period,Settings,Transfer,Tx} from './model';import {DEFAULT_SETTINGS} from './model';
class CashlyDB extends Dexie {transactions!:Table<Tx,string>;goals!:Table<Goal,string>;transfers!:Table<Transfer,string>;periods!:Table<Period,string>;settings!:Table<{id:string;value:Settings;updatedAt?:number},string>;constructor(name='cashly-v1'){super(name);this.version(1).stores({transactions:'id,date,kind,syncStatus,updatedAt',goals:'id',transfers:'id,goalId,date',periods:'id,start,end',settings:'id'});}}
export let db=new CashlyDB('cashly-v1-local');
export function switchDatabase(accountId:string|null){const nextName=accountId?`cashly-v1-${accountId.replace(/[^A-Za-z0-9_-]/g,'_')}`:'cashly-v1-local';if(db.name!==nextName){db.close();db=new CashlyDB(nextName)}}
export async function readSettings(){return (await db.settings.get('main'))?.value??DEFAULT_SETTINGS}
