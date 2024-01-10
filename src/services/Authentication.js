import { Auth } from "../Firebase";
import {
  createUserWithEmailAndPassword,
  sendEmailVerification,
  signOut,
} from "firebase/auth";
import { SetAdvertiserData } from "../providers/AdvertiserUserData";

async function createUser(email, password) {
  return await createUserWithEmailAndPassword(Auth, email, password)
    .then((userCredential) => {
      // Signed up
      const user = userCredential.user;
      SendVerificationEmail(user);

      const newData = {
        ...{
          uid: "",
          name: "",
          lastName: "",
          age: "",
          email: "",
          prefix: "",
          phoneNumber: "",
          adsIds: [],
          credits: 0,
          isOnline: false,
          identityVerified: false,
          emailVerified: false,
        },
        uid: user.uid,
        email: user.email,
      };
      console.log("Data to save: " + newData);
      SetAdvertiserData(user.uid, newData);
      return newData;
    })
    .catch((error) => {
      const errorCode = error.code;
      console.log(errorCode);
      if (errorCode === "auth/email-already-in-use") return "Email già in uso";

      return "Non puoi registrarti con queste credenziali, riprova";
    });
}

async function SendVerificationEmail(user) {
  sendEmailVerification(user);
}

async function SignOut() {
  return await signOut(Auth)
    .then(() => {
      console.log("Success");
      return true;
    })
    .catch((error) => {
      console.log("Error: " + error.toString());
      return false;
    });
}

export { createUser, SignOut };
