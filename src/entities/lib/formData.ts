import type {
  LoginFormType,
  SignUpFormType,
} from '@/entities/auth/model/types';

export const toSignupFormData = (data: SignUpFormType) => {
  const formData = new FormData();
  Object.entries(data).forEach(([key, value]) => {
    if (value !== undefined && value !== null && key !== 'confirmPassword') {
      if (key === 'birthday' && value instanceof Date) {
        formData.append(key, value.toISOString().slice(0, 10));
      } else {
        formData.append(
          key,
          value instanceof Date ? value.toISOString() : String(value)
        );
      }
    }
  });
  return formData;
};

export const toLoginFormData = (data: LoginFormType) => {
  const formData = new FormData();
  Object.entries(data).forEach(([key, value]) => {
    if (value !== undefined && value !== null) {
      formData.append(key, String(value));
    }
  });
  return formData;
};
