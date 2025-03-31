import { initializeApp } from "firebase/app";
import { getFirestore, collection, addDoc, getDocs, orderBy, query, Timestamp, DocumentData, QueryDocumentSnapshot } from "firebase/firestore";
import { Report } from '@/types/Report'

const firebaseConfig = {
    apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
    authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
    databaseURL: process.env.NEXT_PUBLIC_FIREBASE_DATABASE_URL,
    projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
    storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
    messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
    appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
    measurementId: process.env.NEXT_PUBLIC_FIREBASE_MESSUREMENT_ID
};

// Firebase 초기화
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);

// 보고서 저장
export const saveReport = async (content: string) => {
  try {
    const docRef = await addDoc(collection(db, "reports"), {
      content,
      createdAt: Timestamp.now(),
    });
    console.log("Report saved with ID:", docRef.id);
  } catch (error) {
    console.error("Error saving report:", error);
  }
};

// 보고서 목록 조회
export const fetchReports = async (): Promise<Report[]> => {
  try {
    const q = query(collection(db, "reports"), orderBy("createdAt", "desc"));
    const querySnapshot = await getDocs(q);

    console.log(querySnapshot.docs);
    return querySnapshot.docs.map((doc: QueryDocumentSnapshot<DocumentData>) => ({
      id: doc.id,
      content: doc.data().content,
      createdAt: doc.data().createdAt
    }));
  } catch (error) {
    console.error("Error fetching reports:", error);
    return [];
  }
};