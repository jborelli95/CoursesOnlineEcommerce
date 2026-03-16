import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

export const passwordMatchValidator: ValidatorFn = (
  control: AbstractControl
): ValidationErrors | null => {

  const password = control.get('password');
  const confirmedPassword = control.get('confirmPassword');

  if (!password || !confirmedPassword) return null;

  if (password.value !== confirmedPassword.value) {
    return { passwordMismatch: true };
  }

  return null;
};