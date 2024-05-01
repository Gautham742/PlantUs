import { getApp, getApps, initializeApp } from "firebase/app";
import { getAuth } from 'firebase/auth';
import { getFirestore, collection, getDocs, DocumentData } from 'firebase/firestore';
import { Plant } from '@/constants/Index';
import { getStorage, ref, getDownloadURL } from 'firebase/storage'; // Import necessary functions for fetching image URLs

const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
};

const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();
const storage = getStorage(app);
const auth = getAuth(app);
const db = getFirestore(app);

export const getPlantsFromFirebase = async (): Promise<Plant[]> => {
  const plantCollection = collection(db, 'plants');
  const snapshot = await getDocs(plantCollection);
  const plants: Plant[] = [];

  for (const doc of snapshot.docs) {
    const data = doc.data() as DocumentData;

    // Fetch image URL from Firebase Storage
    const imageUrl = await getPlantImageUrl(doc.id);

    plants.push({
      id: doc.id,
      name: data.name,
      imageurl: imageUrl, // Use fetched image URL
      description: data.description,
    });
  }

  return plants;
};

async function getPlantImageUrl(plantId: string): Promise<string> {
  try {
    const imageUrlRef = ref(storage, `plants/${plantId}.jpeg`);
    return await getDownloadURL(imageUrlRef);
  } catch (error) {
    console.error('Error getting plant image URL:', error);
    return ''; // Return empty string if image URL couldn't be fetched
  }
};

export { app, auth, storage, db }; // Export necessary variables
