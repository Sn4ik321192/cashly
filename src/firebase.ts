import {initializeApp} from 'firebase/app';import {getAuth,GoogleAuthProvider} from 'firebase/auth';import {getFirestore} from 'firebase/firestore';
const config={apiKey:'AIzaSyCRA2lzKRCul40wLOmejDCO7VJBI1ayWdA',authDomain:'cashly-2312f.firebaseapp.com',projectId:'cashly-2312f',storageBucket:'cashly-2312f.firebasestorage.app',messagingSenderId:'589109596811',appId:'1:589109596811:web:30de2d79dcd1db5b3afa8e'};
const app=initializeApp(config);export const auth=getAuth(app);export const googleProvider=new GoogleAuthProvider();export const cloudDb=getFirestore(app);
