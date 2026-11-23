export type Kind='expense'|'income';
export interface Tx {id:string;kind:Kind;amount:number;category:string;note:string;date:string;time?:string;createdAt:number;updatedAt:number;deleted?:boolean;syncStatus:'pending'|'synced'|'error'}
export interface Goal {id:string;name:string;target:number;balance:number;createdAt:number}
export interface Transfer {id:string;goalId:string;amount:number;date:string;direction:'in'|'out';note?:string}
export interface Period {id:string;start:string;end:string;openingBalance:number;reserve:number;desiredDaily:number|null;createdAt:number;updatedAt?:number}
export interface Settings {rideCost:number;theme:'dark'|'light';currency:string;expenseCategories:string[];incomeCategories:string[];onboarded:boolean}
export const DEFAULT_SETTINGS:Settings={rideCost:600,theme:'dark',currency:'₽',expenseCategories:['Еда','Транспорт','Покупки','Развлечения','Здоровье','Связь','Другое'],incomeCategories:['Зарплата','Подарок','Перевод','Другое'],onboarded:false};
export const today=()=>{const d=new Date();return `${d.getFullYear()}-${String(d.getMonth()+1).padStart(2,'0')}-${String(d.getDate()).padStart(2,'0')}`};
export const uid=()=>crypto.randomUUID();
export const rub=(kopecks:number,currency='₽')=>new Intl.NumberFormat('ru-RU',{style:'currency',currency:currency==='₽'?'RUB':'RUB',maximumFractionDigits:2}).format(kopecks/100).replace('₽',currency);
export const parseMoney=(value:string)=>{const s=value.trim().replace(/\s/g,'').replace(',','.');if(!/^\d+(\.\d{0,2})?$/.test(s))return null;const [r,k='']=s.split('.');return Number(r)*100+Number((k+'00').slice(0,2))};
export const daysLeft=(end:string,now=today())=>Math.max(1,Math.ceil((Date.parse(end+'T00:00:00')-Date.parse(now+'T00:00:00'))/86400000)+1);
export function summarize(tx:Tx[],period:Period|null,goals:Goal[],transfers:Transfer[],now=today()){
 const active=tx.filter(t=>!t.deleted&&(!period||t.date>=period.start&&t.date<=period.end));
 const balance=(period?.openingBalance??0)+active.reduce((s,t)=>s+(t.kind==='income'?t.amount:-t.amount),0);
 const saved=goals.reduce((s,g)=>s+g.balance,0),reserve=period?.reserve??0,available=balance-reserve-saved;
 const spentToday=tx.filter(t=>!t.deleted&&t.date===now&&t.kind==='expense').reduce((s,t)=>s+t.amount,0);
 const incomeToday=tx.filter(t=>!t.deleted&&t.date===now&&t.kind==='income').reduce((s,t)=>s+t.amount,0);
 const remaining=period?daysLeft(period.end,now):1;const adaptive=period?Math.trunc(available/remaining):0;
 return {balance,reserve,saved,available,spentToday,incomeToday,remaining,adaptive,dayRemaining:adaptive-spentToday,transactions:active,periodSpent:active.filter(t=>t.kind==='expense').reduce((s,t)=>s+t.amount,0)};
}
