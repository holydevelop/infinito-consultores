export interface User{
  email: String,
  name: String,
  password: String,
  dateofbirth: Date,
  profession: String,
  rut: String,
  cellphone: String,
  rol: String
}

export interface UserLogin{
  email: String,
  password: String
}

export interface UserPut{
  email?: String
  profession?: String,
  cellphone?: String
}

