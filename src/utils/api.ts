import Axios from "axios";
import { UserLogin, User, UserPut } from "./user";
import { Job } from "./job";

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

//Register job with POST in API /ofertas
export async function registerJob(data: Job) {
  try {
    const res = await Axios.post(`${process.env.URL_API}/ofertas`, data)
    return res
  } catch (error: any) {
    return {
      statusCode: error.response.data.statusCode,
      error: error.response.data.error
    }
  }
  
}

//OBTIENE EL TRABAJO DE LA API SOLO 1 /ofertas/id
export async function GetJobApi() {
  try {
    const res = await Axios.get(`${process.env.URL_API}/ofertas`)
    return res
  } catch (error: any) {
    throw error
  }
}
export async function GetJobsPublished(userId:String){
  try {
    const res = await Axios.get(`${process.env.URL_API}/ofertas/user/${userId}`)
    return res 
  } catch (error: any) {
    throw error
  }

}

//OBTIENE EL TRABAJO DE LA API SOLO 1 /ofertas/id
export async function GetDocument(userId: String) {
  try {
    const res = await Axios.get(`${process.env.URL_API}/doc/user/${userId}`)
    return res
  } catch (error: any) {
    throw error
  }
}
export async function VerPostulantes(userId: String) {
  try {
    const res = await Axios.get(`${process.env.URL_API}/ofertas/postulaciones/${userId}`)
    return res
  } catch (error: any) {
    throw error
  }
}

export async function GetHistorial(userId: String) {
  try {
    const res = await Axios.get(`${process.env.URL_API}/ofertas/postulacion/user/${userId}`)
    return res
  } catch (error: any) {
    throw error
  }
}
export async function Postular(offerId:string,userId: string){
  const data ={postulanteId:userId}
  try {
    const res = await Axios.post(`${process.env.URL_API}/ofertas/${offerId}`,data)
  }
  catch(error: any) {
    throw error
  }
}
export async function Estado(offerId:string,userId: string){
  try {
    const res = await Axios.get(`${process.env.URL_API}/ofertas/postulacion/${userId}/${offerId}`)
    return res
  }
  catch(error: any) {
    throw error
  }
}
export async function Cancelar_Postulacion(offerId:string,userId: string){
  try {
    const res = await Axios.delete(`${process.env.URL_API}/ofertas/postulacion/${userId}/${offerId}`)
    return res
  }
  catch(error: any) {
    throw error
  }
}

//OBTIENE EL TRABAJO DE LA API SOLO 1 /ofertas/id
export async function GetJobsById(jobId: String) {
  try {
    const res = await Axios.get(`${process.env.URL_API}/doc/user/${jobId}`)
    return res.data
  } catch (error: any) {
    throw error
  }
}
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