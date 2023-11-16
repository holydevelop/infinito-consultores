"use client"
import { setTrueStatus } from "@/redux/features/navStatusSlice";
import { useAppDispatch, useAppSelector } from "@/redux/hooks"
import { GetUserApi } from "@/utils/api"
import React, { useEffect } from "react"

export default function Historial() {

  const dispatch = useAppDispatch();
  dispatch(setTrueStatus())

  const [userRes, setUserRes] = React.useState(null)
  const [listJobs, setListJobs] = React.useState([])
  const user = useAppSelector(state => state.user)

  async function setJobsProps() {
    if (user) {
      try {
        const { data } = await GetUserApi(user?.id)
        console.log("El user es: ", user)
        console.log(data)
      } catch (err) {
        alert("Hubo un error al procesar la informacion.")
      }
    }
  }

  React.useEffect(() => {
    setJobsProps()
  }, [])

  return (
    <h1>Historial</h1>
  )
}