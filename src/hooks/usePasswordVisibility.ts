// hooks/usePasswordVisibility.ts
import { useState } from 'react';

export const usePasswordVisibility = () => {
  const [passwordVisible, setPasswordVisible] = useState<boolean>(false);
  const [confirmPasswordVisible, setConfirmPasswordVisible] = useState<boolean>(false);

  const togglePasswordVisibility = (id: 'password' | 'confirmPassword') => {
    if (id === 'password') {
      setPasswordVisible((prev) => !prev);
    } else if (id === 'confirmPassword') {
      setConfirmPasswordVisible((prev) => !prev);
    }
  };

  return {
    passwordVisible,
    confirmPasswordVisible,
    togglePasswordVisibility,
  };
};
