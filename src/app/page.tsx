"use client"

import { useSession } from "next-auth/react";
import { Navbar } from "../components/Navbar";

export default function App() {

  const {data: session} = useSession()
  console.log(session)

  return (
    <div>
      <Navbar />
    </div>
  )
}
