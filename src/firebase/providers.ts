import { signInWithEmailAndPassword, createUserWithEmailAndPassword, GoogleAuthProvider, signInWithPopup, updateProfile, UserCredential } from 'firebase/auth';
import { FirebaseAuth } from './config';
import { logger } from '../utils/logger';

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
    logger.debug('Starting Google sign-in');
    const result = await signInWithPopup(FirebaseAuth, googleProvider);
    const { displayName, email, photoURL, uid } = result.user;

    logger.info('Google sign-in successful', { email, uid });
    return {
      ok: true,
      displayName,
      email,
      photoURL,
      uid
    };
  } catch (error: any) {
    logger.error('Google sign-in failed', error, { errorCode: error.code });
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
    logger.debug('Starting user registration', { email });
    const resp = await createUserWithEmailAndPassword(FirebaseAuth, email, password);
    const { uid, photoURL } = resp.user;

    await updateProfile(FirebaseAuth.currentUser!, { displayName });

    logger.info('User registered successfully', { email, uid });
    return {
      ok: true,
      uid,
      photoURL,
      email,
      displayName
    };
  } catch (error: any) {
    logger.error('User registration failed', error, { email, errorCode: error.code });
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
    logger.debug('Starting email/password login', { email });
    const resp = await signInWithEmailAndPassword(FirebaseAuth, email, password);
    const { uid, photoURL, displayName } = resp.user;

    logger.info('Login successful', { email, uid });
    return {
      ok: true,
      uid,
      photoURL,
      displayName
    };
  } catch (error: any) {
    logger.error('Login failed', error, { email, errorCode: error.code });
    return { ok: false, errorMessage: error.message };
  }
};

export const logoutFirebase = async(): Promise<void> => {
  return await FirebaseAuth.signOut();
};
