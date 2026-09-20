import { useEffect, useMemo, useState, ChangeEvent } from 'react';

type FormValidationFunction = (value: any) => boolean;
type ValidationRules = Record<string, [FormValidationFunction, string]>;
type FormValidationState = Record<string, string | null>;

export interface UseFormReturn {
  [key: string]: any;
  formState: Record<string, any>;
  onInputChange: (event: ChangeEvent<HTMLInputElement>) => void;
  onResetForm: () => void;
  isFormValid: boolean;
}

export const useForm = (
  initialForm: Record<string, any> = {},
  formValidations: ValidationRules = {}
): UseFormReturn => {
  const [formState, setFormState] = useState(initialForm);
  const [formValidation, setFormValidation] = useState<FormValidationState>({});

  useEffect(() => {
    createValidators();
  }, [formState]);

  useEffect(() => {
    setFormState(initialForm);
  }, [initialForm]);

  const isFormValid = useMemo(() => {
    for (const formValue of Object.keys(formValidation)) {
      if (formValidation[formValue] !== null) return false;
    }
    return true;
  }, [formValidation]);

  const onInputChange = ({ target }: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = target;
    setFormState({
      ...formState,
      [name]: value
    });
  };

  const onResetForm = () => {
    setFormState(initialForm);
  };

  const createValidators = () => {
    const formCheckedValues: FormValidationState = {};

    for (const formField of Object.keys(formValidations)) {
      const [fn, errorMessage] = formValidations[formField];
      formCheckedValues[`${formField}Valid`] = fn(formState[formField]) ? null : errorMessage;
    }

    setFormValidation(formCheckedValues);
  };

  return {
    ...formState,
    formState,
    onInputChange,
    onResetForm,
    ...formValidation,
    isFormValid
  };
};
