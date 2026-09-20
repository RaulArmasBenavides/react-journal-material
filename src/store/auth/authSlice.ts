import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export type AuthStatus = 'checking' | 'not-authenticated' | 'authenticated';

export interface AuthState {
  status: AuthStatus;
  uid: string | null;
  email: string | null;
  displayName: string | null;
  photoURL: string | null;
  errorMessage: string | null;
}

interface LoginPayload {
  uid: string;
  email: string;
  displayName: string;
  photoURL: string | null;
}

interface LogoutPayload {
  errorMessage?: string;
}

const initialState: AuthState = {
  status: 'checking',
  uid: null,
  email: null,
  displayName: null,
  photoURL: null,
  errorMessage: null,
};

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    login: (state, { payload }: PayloadAction<LoginPayload>) => {
      state.status = 'authenticated';
      state.uid = payload.uid;
      state.email = payload.email;
      state.displayName = payload.displayName;
      state.photoURL = payload.photoURL;
      state.errorMessage = null;
    },
    logout: (state, { payload }: PayloadAction<LogoutPayload | undefined>) => {
      state.status = 'not-authenticated';
      state.uid = null;
      state.email = null;
      state.displayName = null;
      state.photoURL = null;
      state.errorMessage = payload?.errorMessage || null;
    },
    checkingCredentials: (state) => {
      state.status = 'checking';
    }
  }
});

export const { login, logout, checkingCredentials } = authSlice.actions;
