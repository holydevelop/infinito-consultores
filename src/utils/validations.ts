const isEmail = require('validator/lib/isEmail')
const isEmpty = require('validator/lib/isEmail')
const isDate = require('validator/lib/isEmail')
const isMobilePhone = require('validator/lib/isEmail')
const isStrongPassword = require('validator/lib/isEmail')

function validEmail(email: String){
  return isEmail(email)
}

function validPassword(password: String){

  const options = {
    minLength: 6,
    minLowercase: 1,
    minUppercase: 1,
    minNumbers: 0,
    minSymbols: 0,
    returnScore: false
  }

  return isStrongPassword(password,options)
}

function emptyValidation(field: any){
  return !isEmpty(field)
}

function dateValidation(date: string){
  return isDate(date)
}

function validPhone(phone: String){
  const country = "CL"
  return isMobilePhone(phone,country)
}

export function validData(data: {
  email?: string;
  password?: string;
  firstName?: string;
  lastName?: string;
  fecha?: string;
  telefono?: string;
}): { isValid: boolean; errors: { [key: string]: string } } {
  const errors: { [key: string]: string } = {};

  // Validación de email
  if (data.email && !validEmail(data.email)) {
    errors.email = 'Correo electrónico no válido';
  }

  // Validación de contraseña
  if (data.password && !validPassword(data.password)) {
    errors.password = 'Contraseña no válida';
  }

  // Validación del primer nombre
  if (data.firstName && !emptyValidation(data.firstName)) {
    errors.firstName = 'El campo nombre no puede estar vacío';
  }

  // Validacion del segundo nombre
  if (data.lastName && !emptyValidation(data.lastName)) {
    errors.lastName = 'El campo nombre no puede estar vacío';
  }

  // Validación de fecha
  if (data.fecha && !dateValidation(data.fecha)) {
    errors.fecha = 'Fecha no válida';
  }

  // Validación de teléfono
  if (data.telefono && !validPhone(data.telefono)) {
    errors.telefono = 'Teléfono no válido';
  }

  // Verifica si hay errores
  const isValid = Object.keys(errors).length === 0;

  return { isValid, errors };
}


function validRut(rut: String){

}