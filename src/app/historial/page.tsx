"use client"
import JobList from "@/components/JobList";
import Loading from "@/components/Loading";
import Navbar from "@/components/Navbar";
import { useAppDispatch, useAppSelector } from "@/redux/hooks"
import { GetHistorial } from "@/utils/api"
import { Job } from "@/utils/job";
import React, { useEffect } from "react"

export default function Historial() {
  const dispatch = useAppDispatch()
  const [jobs, setJobs]: [any[] | null, any] = React.useState<any[] | null>(null);
  const [isLoading,setIsLoading] = React.useState(true)

  const user = useAppSelector(state => state.user)

  async function loadJobs() {
    try {
      const {data} = await GetHistorial(user?.id)
      setJobs(data)
      setIsLoading(false)
    } catch (err) {
      console.error(err)
    }

  }

  useEffect(() => {
    if (user) {
      loadJobs()
    }
  }, [user])

  // Este efecto se dispara solo cuando `jobs` cambia
  useEffect(() => {}, [jobs]);

  if(isLoading){
    return(<Loading isLoading={isLoading}/>)
  }



  return (
    <div>
      <Navbar />
      {
        jobs ?
          <JobList jobs={jobs} />
          :
          <h1>Tu historial esta vacio</h1>
      }

    </div>

  )
}