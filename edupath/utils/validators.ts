export interface SignupFormValues {
  username: string;
  email: string;
  name: string;
  phone: string;
  qualification: string;
  age: string;
}

export type FormErrors = Partial<Record<keyof SignupFormValues, string>>;

export function validateSignupForm(values: SignupFormValues): FormErrors {
  const errors: FormErrors = {};

  // Username: required, min 3 chars
  if (!values.username.trim()) {
    errors.username = 'Username is required';
  } else if (values.username.trim().length < 3) {
    errors.username = 'Username must be at least 3 characters';
  }

  // Email: required, basic email format check
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!values.email.trim()) {
    errors.email = 'Email is required';
  } else if (!emailRegex.test(values.email.trim())) {
    errors.email = 'Please enter a valid email address';
  }

  // Name: required
  if (!values.name.trim()) {
    errors.name = 'Full name is required';
  }

  // Phone: required, digits only, min 7 digits
  const phoneDigits = values.phone.replace(/\D/g, '');
  if (!values.phone.trim()) {
    errors.phone = 'Phone number is required';
  } else if (phoneDigits.length < 7) {
    errors.phone = 'Phone number must contain at least 7 digits';
  }

  // Qualification: required
  if (!values.qualification.trim()) {
    errors.qualification = 'Qualification is required';
  }

  // Age: required, numeric, must be between 15 and 100
  const ageNum = parseInt(values.age.trim(), 10);
  if (!values.age.trim()) {
    errors.age = 'Age is required';
  } else if (isNaN(ageNum) || ageNum < 15 || ageNum > 100) {
    errors.age = 'Age must be a valid number between 15 and 100';
  }

  return errors;
}
