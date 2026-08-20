import {
  GoogleSignin,
  statusCodes,
} from "@react-native-google-signin/google-signin";
import { auth, db } from "../config/firebase";
import { signInWithCredential, signOut } from "firebase/auth";
import { GoogleAuthProvider } from "firebase/auth";
import { doc, setDoc, getDoc } from "firebase/firestore";

GoogleSignin.configure({
  webClientId:
    "220299209957-7nls61c7nbupdkm5u0oche7mj9atiusl.apps.googleusercontent.com", // Get from Firebase Console > Authentication > Sign-in methods > Google > Web client ID
  offlineAccess: true,
  hostedDomain: "",
  forceCodeForRefreshToken: true,
});

export const signInWithGoogle = async () => {
  try {
    await GoogleSignin.hasPlayServices();
    const response = await GoogleSignin.signIn();

    console.log("signIn response-----------------", JSON.stringify(response));

    // Newer versions (v10+) wrap the result in { type, data }
    const idToken = response?.data?.idToken ?? response?.idToken;

    if (!idToken) {
      throw new Error("No ID token received from Google Sign-In");
    }

    const credential = GoogleAuthProvider.credential(idToken);
    const userCredential = await signInWithCredential(auth, credential);

    return { user: userCredential.user, userInfo: response };
  } catch (error) {
    if (error.code === statusCodes.SIGN_IN_CANCELLED) {
      throw new Error("Sign in cancelled");
    } else if (error.code === statusCodes.IN_PROGRESS) {
      throw new Error("Sign in in progress");
    } else if (error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
      throw new Error("Play services not available");
    } else {
      console.log("Error----------", error);
      throw error;
    }
  }
};

export const checkUserRole = async (uid) => {
  try {
    const userDoc = await getDoc(doc(db, "users", uid));
    if (userDoc.exists()) {
      return userDoc.data().role;
    }
    return null;
  } catch (error) {
    console.error("Error checking user role:", error);
    return null;
  }
};

export const saveUserData = async (uid, userData) => {
  try {
    await setDoc(doc(db, "users", uid), userData, { merge: true });
    return true;
  } catch (error) {
    console.error("Error saving user data:", error);
    throw error;
  }
};

export const signOutUser = async () => {
  try {
    await GoogleSignin.signOut();
    await signOut(auth);
    return true;
  } catch (error) {
    console.error("Error signing out:", error);
    throw error;
  }
};
