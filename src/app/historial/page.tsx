"use client"
import JobList from "@/components/JobList";
import Navbar from "@/components/Navbar";

import { useAppSelector } from "@/redux/hooks"
import { GetHistorial } from "@/utils/api"
import { Job } from "@/utils/job";
import React, { useEffect } from "react"

export default function Historial() {
  const [userRes, setUserRes] = React.useState(null)
  const [jobs, setJobs]: [any[] | null, any] = React.useState<any[] | null>(null);
  const user = useAppSelector(state => state.user)

  async function loadJobs() {
    try {
      const {data} = await GetHistorial(user?.id)
      console.log("Data: ",data)
      setJobs(data)
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