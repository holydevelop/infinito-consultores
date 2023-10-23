export interface User{
  email: String,
  name: String,
  password: String,
  dob: Date,
  profession: String,
  rut: String,
  cellphone: String,
  rol: String
}

export interface UserLogin{
  email: String,
  password: String
}