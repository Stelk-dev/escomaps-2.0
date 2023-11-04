import { collection, getDocs } from "firebase/firestore";
import { DatabaseFirestore } from "../Firebase";

const getAds = getDocs(collection(DatabaseFirestore, "advertisements"));

export { getAds };