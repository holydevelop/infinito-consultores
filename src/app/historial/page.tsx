"use client"
import Navbar from "@/components/Navbar";

import { useAppDispatch, useAppSelector } from "@/redux/hooks"
import { GetUserApi } from "@/utils/api"
import React, { useEffect } from "react"

export default function Historial() {
  const [userRes, setUserRes] = React.useState(null)
  const [listJobs, setListJobs] = React.useState([])
  const user = useAppSelector(state => state.user)


  return (
    <>
      <Navbar />
      <h1>Historial</h1>
    </>

  )
}