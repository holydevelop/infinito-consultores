export interface User{
  email: String,
  name: String,
  password: String,
  dateofbirth: Date,
  profession: String,
  rut: String,
  cellphone: String
}

export interface UserLogin{
  email: String,
  password: String
}