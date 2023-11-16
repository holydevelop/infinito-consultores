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



/*
export async function registerInteres(userId: string, jobId: string, unregister: boolean = false) {
  try {
    // Define la URL de la API para vincular/desvincular usuarios a trabajos
    const apiUrl = `http://localhost:8080/ofertas/historial/${userId}`;

    // Crea el objeto de datos con el jobId
    const requestData = {
      offedId: jobId,
    };

    // Utiliza el método HTTP apropiado (POST para registrar, DELETE para desvincular)
    const method = unregister ? 'DELETE' : 'POST';

    // Realiza la solicitud a la API
    const response = await Axios({
      method: method,
      url: apiUrl,
      data: requestData,
    });

    // Devuelve la respuesta
    return response.data;
  } catch (error) {
    // Maneja los errores
    console.error('Error al gestionar interés:', error);
    throw error;
  }
}*/


export async function registerInteres(userId: string, jobId: string): Promise<void> {
  try {
    // Define la URL de la API para vincular o desvincular usuarios de trabajos
    const apiUrl = `http://localhost:8080/ofertas/historial/${userId}`;

    // Consulta la API para verificar si ya existe una vinculación
    const checkResponse = await Axios.get(apiUrl);

    // Verifica si jobId está en la lista de trabajos vinculados
    const isJobLinked = checkResponse.data.includes(jobId);

    if (isJobLinked) {
      // Si ya está vinculado, realiza una solicitud DELETE para desvincular
      await Axios.delete(`${apiUrl}/${jobId}`);
      console.log(`Usuario desvinculado del trabajo con ID: ${jobId}`);
    } else {
      // Si no está vinculado, realiza una solicitud POST para vincular
      const requestData = {
        offedId: jobId,
      };

      await Axios.post(apiUrl, requestData);
      console.log(`Usuario vinculado al trabajo con ID: ${jobId}`);
    }
  } catch (error) {
    // Maneja los errores
    console.error('Error al gestionar interés:');
    throw error;
  }
}