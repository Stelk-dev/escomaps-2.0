import { Auth } from "../Firebase";
import {
  createUserWithEmailAndPassword,
  sendEmailVerification,
  signInAnonymously,
  signInWithEmailAndPassword,
  signOut,
} from "firebase/auth";
import { SetAdvertiserData } from "../providers/AdvertiserUserData";
import { SetUserData } from "../providers/ClientUserData";

async function CreateAnonymousUser() {
  return await signInAnonymously(Auth)
    .then((userCredential) => {
      // Signed up
      const user = userCredential.user;

      const newData = {
        ...{
          uid: "",
          name: "Anonymous-" + Math.floor(Math.random() * 10001).toString(),
          email: "",
          favouritesAds: [],
        },
        uid: user.uid,
      };
      SetUserData(user.uid, newData);
      return newData;
    })
    .catch(() => {
      return "Purtroppo non accettiamo più utenti anonimi. Ma puoi ancora registrarti usando email e password";
    });
}

async function CreateUser(email, password, nameUser = null) {
  return await createUserWithEmailAndPassword(Auth, email, password)
    .then((userCredential) => {
      const user = userCredential.user;

      // Signed up user flow
      if (nameUser != null) {
        const newData = {
          ...{
            uid: "",
            name: "",
            email: "",
            favouritesAds: [],
          },
          uid: user.uid,
          name: nameUser,
          email: email,
        };
        SetUserData(user.uid, newData);
        return newData;
      }

      // Signed up advertiser flow
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

export { CreateAnonymousUser, CreateUser, SignOut, LoginUser };
