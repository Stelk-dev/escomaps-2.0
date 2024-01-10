import {
  collection,
  doc,
  getDoc,
  getDocs,
  setDoc,
  updateDoc,
} from "firebase/firestore";
import { DatabaseFirestore } from "../Firebase";

const getAds = getDocs(collection(DatabaseFirestore, "advertisements"));

async function GetData(idCollection, idDoc) {
  const d = await getDoc(doc(DatabaseFirestore, idCollection, idDoc));

  if (d.exists()) return d.data();
  return null;
}

async function SetData(idCollection, idDoc, dataJson) {
  return await setDoc(doc(DatabaseFirestore, idCollection, idDoc), dataJson);
}

async function UpdateData(idCollection, idDoc, dataJson) {
  return await updateDoc(doc(DatabaseFirestore, idCollection, idDoc), dataJson);
}

export { getAds, GetData, SetData, UpdateData };
