import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { onAuthStateChanged, User } from 'firebase/auth';

import { FirebaseAuth } from '../firebase/config';
import { login, logout } from '../store/auth';
import { startLoadingNotes } from '../store/journal';
import { RootState } from '../store/store';

export const useCheckAuth = (): string => {
  const { status } = useSelector((state: RootState) => state.auth);
  const dispatch = useDispatch();

  useEffect(() => {
    onAuthStateChanged(FirebaseAuth, async(user: User | null) => {
      if (!user) return dispatch(logout());

      const { uid, email, displayName, photoURL } = user;
      dispatch(login({ uid, email, displayName, photoURL }));
      dispatch(startLoadingNotes());
    });
  }, []);

  return status;
};
