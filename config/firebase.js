import { initializeApp } from 'firebase/app'
import { getAuth } from "firebase/auth";
import { getDatabase } from "firebase/database";

const firebaseConfig = {
  apiKey: 'AIzaSyC1FwBOUd8Slvy55JTn4oTG0ZVSD1pKYnU',
  authDomain: 'suertle-tools.firebaseapp.com',
  databaseURL: 'https://suertle-tools-default-rtdb.asia-southeast1.firebasedatabase.app',
  projectId: 'suertle-tools',
  storageBucket: 'suertle-tools.appspot.com',
  messagingSenderId: '528159920310',
  appId: '1:528159920310:web:f3f2f03f1ee38c2de01617',
  measurementId: 'G-01EZ4MN6JN',
}

const app = initializeApp(firebaseConfig)

export const auth = getAuth()
export const database = getDatabase(app);
