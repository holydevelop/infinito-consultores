import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  email: "",
  name: "",
  rol: "",
  dob: "",
  profession: "",
  rut: "",
  cellphone: "",
  id: ""
}
//Slice es un objeto que recibe propiedades
export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUser: (state,action) => {Object.assign(state, action.payload)},
  }
})

//las funciones o reducers
export const {setUser} = userSlice.actions

//Dar el valor inicial de la app
export default userSlice.reducer