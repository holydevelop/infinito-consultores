import { isEmail, isStrongPassword } from 'validator';

function validEmail(email: string) {
  return isEmail(email);
}

function validPassword(password: string) {
  const options = {
    minLength: 6,
    minLowercase: 1,
    minUppercase: 1,
    minNumbers: 0,
    minSymbols: 0,
    returnScore: false,
  };

  return isStrongPassword(password, options);
}

function validRut(rut: string) {
  // Implement RUT validation logic here
}