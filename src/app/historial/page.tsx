"use client"
import JobList from "@/components/JobList";
import Navbar from "@/components/Navbar";

import { useAppSelector } from "@/redux/hooks"
import { GetHistorial } from "@/utils/api"
import React, { useEffect } from "react"

export default function Historial() {
  const [jobs, setJobs]: [any | null, any] = React.useState<any | null>(null);
  const user = useAppSelector(state => state.user)

  async function loadJobs() {
    try {
      const { data } = await GetHistorial(user?.id)
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