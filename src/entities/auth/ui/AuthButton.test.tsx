import React from 'react';
import { render, screen } from '@testing-library/react';
import type { UseFormReturn, FieldValues } from 'react-hook-form';
import AuthButton from './AuthButton';

function createMockForm(isValid: boolean): UseFormReturn<FieldValues> {
  return { formState: { isValid } } as UseFormReturn<FieldValues>;
}

test('AuthButton renders with correct text and disabled state', () => {
  const form = createMockForm(false);
  render(<AuthButton formType='login' form={form} />);
  expect(screen.getByRole('button', { name: '로그인' })).toBeDisabled();
});
