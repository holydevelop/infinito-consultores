import Axios from "axios";
import { User } from "./user";

//Register user with POST in API
export async function registerUser(data: User){
  try {
    const res = await Axios.post("http://3.237.252.239:8080/users",data)
    return res
  } catch (error) {
    return {
      statusCode: error.response.data.statusCode,
      error: error.response.data.error
    }
  }

}

//Login user with POST in API
export async function loginUser(){
  const res = await Axios.get("http://3.237.252.239:8080/users")
  console.log(res)
}


