import { loginWithEmailPassword, registerUserWithEmailPassword, singInWithGoogle, logoutFirebase } from '../../firebase/providers';
import { clearNotesLogout } from '../journal';
import { checkingCredentials, logout, login } from './authSlice';
import { AppDispatch } from '../store';

export const checkingAuthentication = () => {
  return async(dispatch: AppDispatch) => {
    dispatch(checkingCredentials());
  };
};

export const startGoogleSignIn = () => {
  return async(dispatch: AppDispatch) => {
    dispatch(checkingCredentials());

    const result = await singInWithGoogle();
    if (!result.ok) return dispatch(logout({ errorMessage: result.errorMessage }));

    dispatch(login(result as Parameters<typeof login>[0]));
  };
};

export const startCreatingUserWithEmailPassword = ({
  email,
  password,
  displayName
}: {
  email: string;
  password: string;
  displayName: string;
}) => {
  return async(dispatch: AppDispatch) => {
    dispatch(checkingCredentials());

    const result = await registerUserWithEmailPassword({ email, password, displayName });
    if (!result.ok) return dispatch(logout({ errorMessage: result.errorMessage }));

    dispatch(login(result as Parameters<typeof login>[0]));
  };
};

export const startLoginWithEmailPassword = ({
  email,
  password
}: {
  email: string;
  password: string;
}) => {
  return async(dispatch: AppDispatch) => {
    dispatch(checkingCredentials());

    const result = await loginWithEmailPassword({ email, password });

    if (!result.ok) return dispatch(logout({ errorMessage: result.errorMessage }));
    dispatch(login(result as Parameters<typeof login>[0]));
  };
};

export const startLogout = () => {
  return async(dispatch: AppDispatch) => {
    await logoutFirebase();
    dispatch(clearNotesLogout());
    dispatch(logout(undefined));
  };
};
