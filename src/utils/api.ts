import Axios from "axios";
import { User } from "./user";

export async function registeruser(data: FormData){
  const msg: any = {
    "email":"pepe@gmail.com",
    "name":"ola123",
    "password":"p21epe",
    "dateofbirth":"1997-07-22",
    "profession":"asd2",
    "rut":"olapepe",
    "cellphone":"1234567"
}
  const res = await Axios.post("/users",msg)
  console.log(res)
}