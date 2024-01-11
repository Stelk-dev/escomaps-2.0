import { Auth } from "../Firebase";
import {
  createUserWithEmailAndPassword,
  sendEmailVerification,
  signInWithEmailAndPassword,
  signOut,
} from "firebase/auth";
import { SetAdvertiserData } from "../providers/AdvertiserUserData";

async function CreateUser(email, password) {
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
      SetAdvertiserData(user.uid, newData);
      return newData;
    })
    .catch((error) => {
      const errorCode = error.code;
      if (errorCode === "auth/email-already-in-use") return "Email già in uso";

      return "Non puoi registrarti con queste credenziali, riprova";
    });
}

async function LoginUser(email, password) {
  return await signInWithEmailAndPassword(Auth, email, password)
    .then((userCredential) => {
      const user = userCredential.user;
      return user;
    })
    .catch((error) => {
      const errorCode = error.code;
      if (errorCode === "auth/wrong-password")
        return "La password è errata... riprova";

      return "Non esiste utente con questa email";
    });
}

async function SendVerificationEmail(user) {
  sendEmailVerification(user);
}

async function SignOut() {
  return await signOut(Auth)
    .then(() => {
      return true;
    })
    .catch((error) => {
      return false;
    });
}

export { CreateUser, SignOut, LoginUser };
