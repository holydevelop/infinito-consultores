"use client"

//Componente padre para todos los componentes
import { Provider } from "react-redux";
import { store } from "./store";

interface Props {children: React.ReactNode}

export function Providers({ children }: Props) {
  return(
    <Provider store={store}>
      {children}
    </Provider>
  )
}