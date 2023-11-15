import { Job } from "./job";

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
  firstName: string;
  lastName: string;
  email?: string;
  password?: string;
  cellphone?: string;
  
}): { errors: { [key: string]: string } } {
  const errors: { [key: string]: string } = {};
  // Validación del primer nombre
  if (!data.firstName) {
    errors.firstName = 'El campo nombre no puede estar vacío';
  }

  if (!data.lastName) {
    errors.lastName = 'El campo apellido no puede estar vacío';
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


function validTag(tags: String) {
  //Solo estas son las etiquetas permitidas
  const palabrasPermitidas = ['Virtual', 'Online', 'Hibrido', 'Practica', 'Fulltime', 'Partime', 'Santiago', 'Región'];
  //mapea las palabras y las hace minisculas para facilitar la comparacion
  const palabrasMinusculas = palabrasPermitidas.map(palabra => palabra.toLowerCase());
  //separa las tags del usuario y las mapea aparte para la comparasión
  const palabrasUsuario = tags.split(',').map(palabra => palabra.trim().toLowerCase());
  //verfica si existe alguna palabra no permitida
  const palabrasNoPermitidas = palabrasUsuario.filter(palabra => !palabrasMinusculas.includes(palabra));
  
  if (palabrasNoPermitidas.length === 0) {
    //todas las palabras son validas
    return false;
  } else {
    //hay alguna palabra que es no valida
    return true;
  }
}

export function validDataJob(data2: {
  posicion?: String,
  empresa?: String,
  descripcion?: String,
  tags?: String,
  reclutadorId?: String
  
}): { errors: { [key: string]: string } } {
  const errors: { [key: string]: string } = {};

  //Validación del titulo del trabajo
  if (!data2.posicion) {
    errors.posicion = 'El campo Titulo no puede estar vacío';
  }

  //Validación de la compañia del trabajo
  if (!data2.empresa) {
    errors.empresa = 'El campo Compañia no puede estar vacío';
  }

  //Validación de la descripcion del trabajo
  if (!data2.descripcion) {
    errors.descripcion = 'El campo Descripción no puede estar vacío';
  }

  //Validación de los tags del trabajo
  if (!data2.tags || validTag(String(data2.tags))) {
    errors.tags = 'Las tags no son validas. Solo se admiten Virtual, Online, Hibrido, Practica, Fulltime, Partime, Santiago o Región';
  }

  return {errors};
}
