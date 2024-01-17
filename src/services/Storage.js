import { Storage } from "../Firebase";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";

async function UploadToStorage(filePath, image) {
  const fileRef = ref(Storage, "advertisers_images/" + filePath);
  const byteString = atob(image.split(",")[1]);
  const mimeString = image.split(",")[0].split(":")[1].split(";")[0];
  const ab = new ArrayBuffer(byteString.length);
  const ia = new Uint8Array(ab);
  for (let i = 0; i < byteString.length; i++) ia[i] = byteString.charCodeAt(i);
  const blob = new Blob([ab], { type: mimeString });

  return await uploadBytes(fileRef, blob);
}

async function GetURLFromStorage(filePath) {
  const fileRef = ref(Storage, "advertisers_images/" + filePath);
  return await getDownloadURL(fileRef);
}

export { UploadToStorage, GetURLFromStorage };
