//Donde se almacena el estado, un objeto con valores que el resto de
//componentes que se puede leer, donde se almamcenaran 
import {configureStore} from '@reduxjs/toolkit'
import userReducer from "./features/userSlice";
import navReducer from "./features/navStatusSlice";

export const store = configureStore({
  reducer: {
    user: userReducer,
    navStatus: navReducer
  }
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch