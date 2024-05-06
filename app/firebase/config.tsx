import firebase from "firebase/compat/app";
import { getApp, getApps, initializeApp } from "firebase/app";
import { getAuth } from 'firebase/auth';
import { getFirestore, collection, getDocs, DocumentData, DocumentSnapshot, getDoc, doc } from 'firebase/firestore';
import { Plant, Nursery } from '@/constants/Index';
import { getStorage, ref, getDownloadURL } from 'firebase/storage';

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

    const imageUrl = await getPlantImageUrl(doc.id);

    plants.push({
      id: doc.id,
      name: data.name,
      imageurl: imageUrl,
      description: data.description,
      botanicalname: data.botanicalName,
      family: data.family,
      planttype: data.plantType,
      maturesize: data.matureSize,
      temperature: data.temperature,
      sunexposure: data.sunExposure,
      water: data.water,
      soiltype: data.soilType,
      fertilizer: data.fertilizer,
      soilph: data.soilPH,
      bloomtime: data.bloomTime,
      flowercolor: data.flowerColor,
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
    return ''; 
  }
};

export const getPlantById = async (id: string): Promise<Plant | null> => {
  try {
    const plantDocRef = doc(getFirestore(), `plants/${id}`);
    const plantDocSnapshot: DocumentSnapshot = await getDoc(plantDocRef);
    if (plantDocSnapshot.exists()) {
      const data = plantDocSnapshot.data();
      const plantData: Plant = {
        id: plantDocSnapshot.id,
        name: data.name,
        imageurl: data.imageurl,
        description: data.description,
        botanicalname: data.botanicalName,
        family: data.family,
        planttype: data.plantType,
        maturesize: data.matureSize,
        temperature: data.temperature,
        sunexposure: data.sunExposure,
        water: data.water,
        soiltype: data.soilType,
        fertilizer: data.fertilizer,
        soilph: data.soilPH,
        bloomtime: data.bloomTime,
        flowercolor: data.flowerColor,
      };
      return plantData;
    } else {
      console.error('Plant not found');
      return null;
    }
  } catch (error) {
    console.error('Error fetching plant:', error);
    return null;
  }
};

export const getNurseriesFromFirebase = async (): Promise<Nursery[]> => {
  const nurseryCollection = collection(db, 'nursery');
  const snapshot = await getDocs(nurseryCollection);
  const nurseries: Nursery[] = [];

  for (const doc of snapshot.docs) {
    const data = doc.data() as DocumentData;

    const imageUrl = await getNurseryImageUrl(doc.id);

    // Extract latitude and longitude from the location field
    const location: firebase.firestore.GeoPoint = data.location;
    const latitude = location.latitude;
    const longitude = location.longitude;

    nurseries.push({
      id: doc.id,
      name: data.name,
      imageurl: imageUrl,
      place: data.place,
      address: data.address,
      location: { latitude, longitude },
      // Add other nursery properties here
    });
  }

  return nurseries;
};

async function getNurseryImageUrl(nurseryId: string): Promise<string> {
  try {
    const imageUrlRef = ref(storage, `nursery/${nurseryId}.jpeg`);
    return await getDownloadURL(imageUrlRef);
  } catch (error) {
    console.error('Error getting nursery image URL:', error);
    return ''; 
  }
};

export const getNurseryById = async (id: string): Promise<Nursery | null> => {
  try {
    const nurseryDocRef = doc(getFirestore(), `nursery/${id}`);
    const nurseryDocSnapshot: DocumentSnapshot = await getDoc(nurseryDocRef);
    if (nurseryDocSnapshot.exists()) {
      const data = nurseryDocSnapshot.data();
      const location = data.location as firebase.firestore.GeoPoint;

      if (location) {
        const nurseryData: Nursery = {
          id: nurseryDocSnapshot.id,
          name: data.name,
          imageurl: data.imageurl,
          place: data.place,
          address: data.address,
          location: { latitude: location.latitude, longitude: location.longitude },
          // Add other nursery properties here
        };
        return nurseryData;
      } else {
        console.error('Location data not found for nursery:', id);
        return null;
      }
    } else {
      console.error('Nursery not found');
      return null;
    }
  } catch (error) {
    console.error('Error fetching nursery:', error);
    return null;
  }
};

export { app, auth, storage, db };