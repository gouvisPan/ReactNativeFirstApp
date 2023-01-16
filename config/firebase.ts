import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import Constants from "expo-constants";
import { getFirestore } from "firebase/firestore";

const app = initializeApp({
  apiKey: Constants.manifest!.extra!.apiKey,
  authDomain: Constants.manifest!.extra!.authDomain,
  projectId: Constants.manifest!.extra!.projectId,
  storageBucket: Constants.manifest!.extra!.storageBucket,
  messagingSenderId: Constants.manifest!.extra!.messagingSenderId,
  appId: Constants.manifest!.extra!.appId,
});

const auth = getAuth(app);

const db = getFirestore(app);
export { auth, db };
export default app;
