"use client"

import React from 'react'
import Image from 'next/image';
import { IconButton, Menu, MenuItem } from '@mui/material';
import { signOut } from "next-auth/react"
import Link from 'next/link';

import './../app/globals.css'
import { useAppSelector } from '@/redux/hooks';

function isObjectNotEmpty(obj: Record<string, string>) {
  for (let key in obj) {
    if (obj.hasOwnProperty(key) && (obj[key] === "" || obj[key] === null)) {
      return false;
    }
  }
  return true;
}

export const Navbar = () => {
  const user = useAppSelector(state => state.user)
  const session = isObjectNotEmpty(user)
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);

  const handleMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <nav className="bg-blue-500 border-gray-200">
      <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
        <a href="/" className="flex items-center">
          <Image src="https://flowbite.com/docs/images/logo.svg" className="h-8 mr-3" alt="Infinito Consultores Logo" width={50} height={50} />
          <span className="self-center text-2xl font-semibold whitespace-nowrap">Infinito Consultores</span>
        </a>
        <div className="hidden w-full md:block md:w-auto" id="navbar-default">
          <ul className="font-medium flex flex-col p-4 md:p-0 mt-4 border border-gray-100 rounded-lg md:flex-row md:space-x-8 md:mt-0 md:border-0 md:bg-blue-500">
            {
              !session ?
                <li>
                  <a href="/login" className="block py-2 pl-3 pr-4 text-black bg-blue-500 rounded md:text-black md:p-0" aria-current="page">Iniciar Sesion</a>
                </li>
                :
                null
            }
            {
              !session ?
                <li>
                  <a href="/register" className="block py-2 pl-3 pr-4 text-black bg-blue-500 rounded md:text-black md:p-0 md:dark:text-black" aria-current="page">Registro</a>
                </li>
                :
                null
            }
            {
              //Si la variable testvar es true entonces devuelve el dashboard
              session ?
                <li>
                  <IconButton
                    size="small"
                    aria-label="account of current user"
                    aria-controls="menu-appbar"
                    aria-haspopup="true"
                    onClick={handleMenu}
                    color="inherit"
                  >
                    {user?.name}
                  </IconButton>
                  <Menu
                    id="menu-appbar"
                    anchorEl={anchorEl}
                    anchorOrigin={{
                      vertical: 'top',
                      horizontal: 'right',
                    }}
                    keepMounted
                    transformOrigin={{
                      vertical: 'top',
                      horizontal: 'right',
                    }}
                    open={Boolean(anchorEl)}
                    onClose={handleClose}
                  >
                    <MenuItem onClick={handleClose}>
                      <Link href={`profile/${user.id}`}>
                        Perfil
                      </Link>
                    </MenuItem>
                    <MenuItem onClick={handleClose}>
                      <Link href={`profile/${user.id}`}>
                        Historial de empleo
                      </Link>
                    </MenuItem>
                    <MenuItem onClick={() => signOut()}>
                      Cerrar Sesion
                    </MenuItem>
                  </Menu>
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
