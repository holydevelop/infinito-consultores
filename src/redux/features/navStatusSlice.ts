import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  status: true
}
//Slice es un objeto que recibe propiedades
export const navStatusSlice = createSlice({
  name: "navStatus",
  initialState,
  reducers: {
    setTrueStatus: (state) => {state.status = true},
    setFalseStatus: (state) => {state.status = false}
  }
})

//las funciones o reducers
export const {setTrueStatus,setFalseStatus} = navStatusSlice.actions

//Dar el valor inicial de la app
export default navStatusSlice.reducer