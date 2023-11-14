import Axios from "axios";
import { UserLogin, User, UserPut } from "./user";

//Register user with POST in API /users
export async function registerUser(data: User) {
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

//Login user with POST in API /auth/login
export async function loginUser(data: UserLogin) {
  try {
    const res = await Axios.post(`${process.env.URL_API}/auth/login`, data)
    return res
  } catch (error: any) {
    throw error
  }
}

//DESCUBRE SI EXISTE EL USUARIO /users/id
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
//OBTIENE EL USUARIO DE LA API SOLO 1 /users/id
export async function GetUserApi(id: string) {
  try {
    const res = await Axios.get(`${process.env.URL_API}/users/${id}`)
    return res
  } catch (error: any) {
    throw error
  }
}
//MODIFICA EL USUARIO EXISTENTE DE LA API /users/id
export async function PutUserApi(id: string,user: UserPut) {
  try {
    const res = await Axios.put(`${process.env.URL_API}/users/${id}`,user)
    return res
  } catch (error: any) {
    return error
  }
}

//OBTIENE LOS DOCUMENTOS MEDIANTE UN GET A /doc/user/id
export async function GetDocument(id: string) {
  try {
    const res = await Axios.get(`${process.env.URL_API}/doc/user/${id}`)
    return res
  } catch (error: any) {
    return error
  }
}


//SE REALIZA UN POST A LA API PARA SUBIR EL DOCUMENTO
export async function PostDocument(id: string, file: File) {
  try {
    const formData = new FormData();
    formData.append('file', file); // 'file' es el nombre del campo en el formulario, puedes ajustarlo según sea necesario
    formData.append('userId', id)
    const res = await Axios.post(`${process.env.URL_API}/doc`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    return res;
  } catch (error) {
    throw error;
  }
}

