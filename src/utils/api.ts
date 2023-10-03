import Axios from "axios";
import { User } from "./user";

//Register user with POST in API
export async function registeruser(data: User){
  try {
    const res = await Axios.post("http://3.237.252.239:8080/users",data)
    console.log(res)
  } catch (error) {
    console.log(error)
  }

}

//Login user with POST in API
export async function loginUser(){
  const res = await Axios.get("http://3.237.252.239:8080/users")
  console.log(res)
}


