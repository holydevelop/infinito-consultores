import Axios from "axios";
import { LoginUser, User } from "./user";

//Register user with POST in API
export async function registerUser(data: User){
  console.log(`${process.env.URL_API}/users`)
  try {
    const res = await Axios.post(`${process.env.URL_API}/users`,data)
    return res
  } catch (error: any) {
    return {
      statusCode: error.response.data.statusCode,
      error: error.response.data.error
    }
  }

}

//Login user with POST in API
export async function loginUser(data: LoginUser){
  try{
    const res = await Axios.post(`${process.env.URL_API}/auth/login`,data)
    console.log(res)
  }catch(error: any){
    console.log(error)
  }
}

