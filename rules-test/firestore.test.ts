import{afterAll,afterEach,beforeAll,describe,it}from'vitest';import{initializeTestEnvironment,assertFails,assertSucceeds,type RulesTestEnvironment}from'@firebase/rules-unit-testing';import{doc,getDoc,setDoc}from'firebase/firestore';import{readFileSync}from'node:fs';
let env:RulesTestEnvironment;
beforeAll(async()=>{env=await initializeTestEnvironment({projectId:'demo-cashly',firestore:{rules:readFileSync('firestore.rules','utf8')}})});
afterEach(async()=>env.clearFirestore());afterAll(async()=>env.cleanup());
describe('Firestore owner isolation',()=>{
 it('rejects unauthenticated reads and writes',async()=>{const db=env.unauthenticatedContext().firestore();await assertFails(getDoc(doc(db,'users/alice/transactions/one')));await assertFails(setDoc(doc(db,'users/alice/transactions/one'),{amount:100}))});
 it('allows an owner to access their tree and rejects every other user',async()=>{const alice=env.authenticatedContext('alice').firestore();await assertSucceeds(setDoc(doc(alice,'users/alice/transactions/one'),{amount:100}));await assertFails(getDoc(doc(alice,'users/bob/transactions/one')));await assertFails(setDoc(doc(alice,'shared/one'),{amount:100}))});
});
