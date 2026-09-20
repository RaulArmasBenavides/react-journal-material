import { signInWithEmailAndPassword, createUserWithEmailAndPassword, GoogleAuthProvider, signInWithPopup, updateProfile, UserCredential } from 'firebase/auth';
import { FirebaseAuth } from './config';

const googleProvider = new GoogleAuthProvider();

interface AuthResult {
  ok: boolean;
  displayName?: string;
  email?: string;
  photoURL?: string;
  uid?: string;
  errorMessage?: string;
}

export const singInWithGoogle = async(): Promise<AuthResult> => {
  try {
    const result = await signInWithPopup(FirebaseAuth, googleProvider);
    const { displayName, email, photoURL, uid } = result.user;

    return {
      ok: true,
      displayName,
      email,
      photoURL,
      uid
    };
  } catch (error: any) {
    return {
      ok: false,
      errorMessage: error.message,
    };
  }
};

export const registerUserWithEmailPassword = async({
  email,
  password,
  displayName
}: {
  email: string;
  password: string;
  displayName: string;
}): Promise<AuthResult> => {
  try {
    const resp = await createUserWithEmailAndPassword(FirebaseAuth, email, password);
    const { uid, photoURL } = resp.user;

    await updateProfile(FirebaseAuth.currentUser!, { displayName });

    return {
      ok: true,
      uid,
      photoURL,
      email,
      displayName
    };
  } catch (error: any) {
    return { ok: false, errorMessage: error.message };
  }
};

export const loginWithEmailPassword = async({
  email,
  password
}: {
  email: string;
  password: string;
}): Promise<AuthResult> => {
  try {
    const resp = await signInWithEmailAndPassword(FirebaseAuth, email, password);
    const { uid, photoURL, displayName } = resp.user;

    return {
      ok: true,
      uid,
      photoURL,
      displayName
    };
  } catch (error: any) {
    return { ok: false, errorMessage: error.message };
  }
};

export const logoutFirebase = async(): Promise<void> => {
  return await FirebaseAuth.signOut();
};
