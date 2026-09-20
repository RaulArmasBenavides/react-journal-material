import { configureStore } from '@reduxjs/toolkit';
import { authSlice, login, logout, checkingCredentials } from './authSlice';
import { AuthState } from './authSlice';

describe('authSlice', () => {
  let store = configureStore({
    reducer: { auth: authSlice.reducer }
  });

  beforeEach(() => {
    store = configureStore({
      reducer: { auth: authSlice.reducer }
    });
  });

  it('should have initial state', () => {
    const state = store.getState().auth;
    expect(state.status).toBe('checking');
    expect(state.uid).toBeNull();
    expect(state.errorMessage).toBeNull();
  });

  it('should handle login action', () => {
    const loginPayload = {
      uid: '123',
      email: 'test@example.com',
      displayName: 'Test User',
      photoURL: null
    };

    store.dispatch(login(loginPayload));
    const state = store.getState().auth;

    expect(state.status).toBe('authenticated');
    expect(state.uid).toBe('123');
    expect(state.email).toBe('test@example.com');
    expect(state.displayName).toBe('Test User');
    expect(state.errorMessage).toBeNull();
  });

  it('should handle logout action', () => {
    store.dispatch(login({
      uid: '123',
      email: 'test@example.com',
      displayName: 'Test User',
      photoURL: null
    }));

    store.dispatch(logout({ errorMessage: 'Logged out' }));
    const state = store.getState().auth;

    expect(state.status).toBe('not-authenticated');
    expect(state.uid).toBeNull();
    expect(state.errorMessage).toBe('Logged out');
  });

  it('should handle checkingCredentials action', () => {
    store.dispatch(checkingCredentials());
    const state = store.getState().auth;

    expect(state.status).toBe('checking');
  });
});
