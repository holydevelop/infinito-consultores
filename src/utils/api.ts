import Axios from "axios";
import { UserLogin, User } from "./user";

//Register user with POST in API
export async function registerUser(data: User) {
  console.log(`${process.env.URL_API}/users`)
  try {
    const res = await Axios.post(`${process.env.URL_API}/users`, data)
    return res
  } catch (error: any) {
    return {
      statusCode: error.response.data.statusCode,
      error: error.response.data.error
    }
  }

}

//Login user with POST in API
export async function loginUser(data: UserLogin) {
  try {
    const res = await Axios.post(`${process.env.URL_API}/auth/login`, data)
    return res
  } catch (error: any) {
    throw error
  }
}

//Obtiene la descripcion
export async function ExistProfile(id: string) {
  try {
    const user = await Axios.get(`${process.env.URL_API}/users/${id}`)
    if(user){
      return true
    }

    return false 
  } catch (error: any) {
    throw error
  }
}

export async function GetInformation(id: string) {
  try {
    const [resDesc, resCv] = await Promise.all([
      Axios.get(`${process.env.URL_API}/users/${id}/descripcion`),
      Axios.get(`${process.env.URL_API}/users/${id}/curriculum`)
    ]);
    return [resDesc, resCv]
  } catch (error: any) {
    throw error
  }
}
