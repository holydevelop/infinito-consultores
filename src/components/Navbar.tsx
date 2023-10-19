"use client"

import React from 'react'
import { useSession } from 'next-auth/react'

import './../app/globals.css'

export const Navbar = () => {

  const {data:session} = useSession()

  return (
    <nav className="bg-blue-500 border-gray-200">
      <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
        <a href="/" className="flex items-center">
          <img src="https://flowbite.com/docs/images/logo.svg" className="h-8 mr-3" alt="Infinito Consultores Logo" />
          <span className="self-center text-2xl font-semibold whitespace-nowrap dark:text-white">Infinito Consultores</span>
        </a>
        <div className="hidden w-full md:block md:w-auto" id="navbar-default">
          <ul className="font-medium flex flex-col p-4 md:p-0 mt-4 border border-gray-100 rounded-lg md:flex-row md:space-x-8 md:mt-0 md:border-0 md:bg-blue-500 dark:bg-gray-800 md:dark:bg-gray-900 dark:border-gray-700">
            {
              !session ?
                <li>
                  <a href="/login" className="block py-2 pl-3 pr-4 text-black bg-blue-500 rounded md:text-black md:p-0 dark:text-white md:dark:text-black" aria-current="page">Iniciar Sesion</a>
                </li>
                :
                null
            }
            {
              !session ?
                <li>
                  <a href="/register" className="block py-2 pl-3 pr-4 text-black bg-blue-500 rounded md:text-black md:p-0 dark:text-white md:dark:text-black" aria-current="page">Registro</a>
                </li>
                :
                null
            }
            {
              //Si la variable testvar es true entonces devuelve el dashboard
              session ?
                <li>
                  <a href="/dashboard" className="block py-2 pl-3 pr-4 text-black rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-black md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent">Profile</a>
                </li>
                :
                null
            }

          </ul>
        </div>
      </div>
    </nav>

  )
}
