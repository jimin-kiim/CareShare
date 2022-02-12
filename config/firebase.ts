import { initializeApp } from 'firebase/app';
import Constants from 'expo-constants';
import 'firebase/auth';

// Initialize Firebase
const firebaseConfig = {
  apiKey: Constants.manifest.extra.apiKey,
  authDomain: Constants.manifest.extra.authDomain,
  projectId: Constants.manifest.extra.projectId,
  storageBucket: Constants.manifest.extra.storageBucket,
  messagingSenderId: Constants.manifest.extra.messagingSenderId,
  appId: Constants.manifest.extra.appId,
  databaseURL: Constants.manifest.extra.databaseUrl,
  replacestorageBucket: Constants.manifest.extra.replacestorageBucket,
  measurementId: Constants.manifest.extra.measurementId
};

const app = initializeApp(firebaseConfig);

export default app;