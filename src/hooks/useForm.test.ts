import { renderHook, act } from '@testing-library/react';
import { useForm } from './useForm';

describe('useForm Hook', () => {
  it('should initialize with default form state', () => {
    const initialForm = { email: '', password: '' };
    const { result } = renderHook(() => useForm(initialForm));

    expect(result.current.email).toBe('');
    expect(result.current.password).toBe('');
    expect(result.current.isFormValid).toBe(true);
  });

  it('should update form state on input change', () => {
    const initialForm = { email: '' };
    const { result } = renderHook(() => useForm(initialForm));

    act(() => {
      const event = {
        target: { name: 'email', value: 'test@example.com' }
      } as any;
      result.current.onInputChange(event);
    });

    expect(result.current.email).toBe('test@example.com');
  });

  it('should validate form fields', () => {
    const initialForm = { email: '', password: '' };
    const validations = {
      email: [(value: string) => value.includes('@'), 'Invalid email'],
      password: [(value: string) => value.length >= 6, 'Password too short']
    };

    const { result } = renderHook(() => useForm(initialForm, validations));

    expect(result.current.isFormValid).toBe(false);
    expect(result.current.emailValid).toBe('Invalid email');
    expect(result.current.passwordValid).toBe('Password too short');
  });

  it('should reset form to initial state', () => {
    const initialForm = { email: '', password: '' };
    const { result } = renderHook(() => useForm(initialForm));

    act(() => {
      const event = {
        target: { name: 'email', value: 'test@example.com' }
      } as any;
      result.current.onInputChange(event);
    });

    expect(result.current.email).toBe('test@example.com');

    act(() => {
      result.current.onResetForm();
    });

    expect(result.current.email).toBe('');
  });

  it('should pass validation when all fields are valid', () => {
    const initialForm = { email: 'test@example.com', password: 'password123' };
    const validations = {
      email: [(value: string) => value.includes('@'), 'Invalid email'],
      password: [(value: string) => value.length >= 6, 'Password too short']
    };

    const { result } = renderHook(() => useForm(initialForm, validations));

    expect(result.current.isFormValid).toBe(true);
    expect(result.current.emailValid).toBeNull();
    expect(result.current.passwordValid).toBeNull();
  });
});
