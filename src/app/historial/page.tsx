"use client"
import JobList from "@/components/JobList";
import Loading from "@/components/Loading";
import Navbar from "@/components/Navbar";
import { useAppDispatch, useAppSelector } from "@/redux/hooks"
import { GetHistorial } from "@/utils/api"
import React, { useEffect } from "react"

export default function Historial() {
  const [jobs, setJobs]: [any[] | null, any] = React.useState<any[] | null>(null);
  const [isLoading, setIsLoading] = React.useState(true)

  const user = useAppSelector(state => state.user)

  async function loadJobs() {
    try {
      if(user.id){
        const data = await GetHistorial(user.id)
        console.log("La data es: ", data)
        setJobs(data)
      }
     
    } catch (err) {
      console.error(err)
    }

    setIsLoading(false)
  }

  useEffect(() => {
    if (user) {
      loadJobs()
    }
  }, [user])

  // Este efecto se dispara solo cuando `jobs` cambia
  useEffect(() => { }, [jobs]);

  if (isLoading) {
    return (<Loading isLoading={isLoading} />)
  }

  return (
    <div>
      <Navbar />
      {jobs && jobs.length > 0 ? (
        <JobList jobs={jobs} />
      ) : (
        <h1>Tu historial está vacío</h1>
      )}
    </div>

  )
}