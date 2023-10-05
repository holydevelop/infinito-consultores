const isEmail = require('validator/lib/isEmail')

function validEmail(email: String) {
  return !isEmail(email)
}

function validPassword(password: String) {
  // Verificar la longitud mínima
  if (password.length < 6) {
    return false;
  }

  // Verificar al menos 1 número y 1 letra mayúscula
  let tieneNumero = false;
  let tieneMayuscula = false;

  for (let i = 0; i < password.length; i++) {
    const caracter = password[i];
    if (!isNaN(Number(caracter)) && !tieneNumero) {
      tieneNumero = true;
    }
    if (caracter === caracter.toUpperCase() && caracter !== caracter.toLowerCase() && !tieneMayuscula) {
      tieneMayuscula = true;
    }

    if (tieneNumero && tieneMayuscula) {
      return true; // Cumple con los requisitos
    }
  }

  return false; // No cumple con los requisitos
}

function validPhone(phone: string) {
  // Expresión regular para validar números de teléfono chilenos
  const chileanPhoneRegex = /^[+]?(56)?(\d{9})$/;
  // Verifica si el número de teléfono coincide con la expresión regular
  return !chileanPhoneRegex.test(phone);
}

function validName(name: String) {
  // Verificar si name está vacío
  if (!name) {
    return false;
  }

  // Dividir el nombre completo en nombre y apellido
  const partes = name.split(' ');

  // Verificar si hay al menos dos partes (nombre y apellido)
  if (partes.length < 2) {
    return false;
  }

  // Verificar si ninguna de las partes está vacía
  if (partes.some((parte) => !parte.trim())) {
    return false;
  }

  // Si pasa todas las verificaciones, es válido
  return true;
}


export function validData(data: {
  name: string;
  email?: string;
  password?: string;
  cellphone?: string;
}): { errors: { [key: string]: string } } {
  const errors: { [key: string]: string } = {};
  // Validación del primer nombre
  if (!validName(data.name)) {
    errors.name = 'El nombre no puede estar vacío';
  }

  // Validación de email
  if (!data.email || validEmail(String(data.email))) {
    errors.email = 'Correo electrónico no válido';
  }

  // Validación de contraseña
  if (!data.password || !validPassword(String(data.password))) {
    errors.password = 'Contraseña no válida revise que tenga al menos 6 caracteres , 1 mayuscula y 1 minuscula';
  }

  // Validación de teléfono
  if (!data.cellphone || validPhone(String(data.cellphone))) {
    errors.cellphone = 'Teléfono no válido';
  }

  return {errors};
}
