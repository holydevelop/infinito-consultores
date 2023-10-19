"use client";

import React from 'react'
import { useSession } from 'next-auth/react';

export const Dashboard = () => {
  const {data: session} = useSession()
  console.log(session)
  return (
    <div>
      <h1>
        <pre>
          <p>Hola mundo</p>
          {<code>{JSON.stringify(session,null, 2)}</code>}
        </pre>
      </h1>
    </div>
  )
}

export default Dashboard;

