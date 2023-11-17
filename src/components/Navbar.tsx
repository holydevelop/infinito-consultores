"use client"

import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Image from 'next/image';
import { useAppSelector } from '@/redux/hooks';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { Grid, Menu, MenuItem } from '@mui/material';
import { signOut } from 'next-auth/react';

/** @jsxImportSource @emotion/react */
import { CacheProvider } from '@emotion/react';
import createCache from '@emotion/cache';


function isObjectNotEmpty(obj: Record<string, string>) {
  for (let key in obj) {
    if (obj.hasOwnProperty(key) && (obj[key] === "" || obj[key] === null)) {
      return false;
    }
  }
  return true;
}
function admincheck(str:string){
  if (str=="Admin"){
    return true
  }
  else{
    false
  }
}
function reclutadorCheck(str:string){
  if(str=="Reclutador"){
    return true
  }
  else{
    return false
  }
}

const cache = createCache({ key: 'css', prepend: true });

export default function NavBar() {

  const router = useRouter()

  const navBarVisible = useAppSelector(state => state.navStatus.status)
  const user = useAppSelector(state => state.user)
  const session = isObjectNotEmpty(user)
  const admin_check= admincheck(user.rol)
  const reclutador_check= reclutadorCheck(user.rol)
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);

  const handleMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <>
      <CacheProvider value={cache}>
        {
          navBarVisible && (
            <Box sx={{ flexGrow: 1 }}>
              <AppBar position="static">
                <Toolbar sx={{ justifyContent: 'space-between' }}>
                  <Link href="/" style={{ display: 'flex', alignItems: 'center', textDecoration: 'none', color: 'inherit' }}>
                    <Image src="https://flowbite.com/docs/images/logo.svg" alt="Infinito Consultores Logo" width={50} height={50} />
                    <Typography variant="h6" style={{ marginLeft: '8px' }}>
                      Infinito Consultores
                    </Typography>
                  </Link>
              {reclutador_check ? (<Grid><Button variant="contained" color="primary" href={`/proposal`} sx={{ backgroundColor: "0B3299" }}>
          Nueva Oferta
        </Button>
        <Button variant="contained" color="primary" href={`/postulantes`} sx={{ backgroundColor: "0B3299" }}>
          Mis Ofertas
        </Button><Button variant="contained" color="primary" href={`/jobs`} sx={{ backgroundColor: "0B3299" }}>
          Ofertas de Trabajo
        </Button>
        </Grid>):( <></>)}
                  {session ? (
                    <>
                      <Menu
                        anchorEl={anchorEl}
                        open={Boolean(anchorEl)}
                        onClose={handleClose}
                      >
                        <MenuItem onClick={() => { router.push(`/profile/${user?.id}`) }}>Perfil</MenuItem>
                        <MenuItem onClick={() => { router.push(`/historial`) }}>Postulaciones</MenuItem>
                        <MenuItem onClick={() => signOut()}>Cerrar Sesión</MenuItem>
                      </Menu>
                      <Button color="inherit" onClick={handleMenu}>
                        {user?.name}
                      </Button>
                    </>
                  ) : (
                    <>
                      <Button color="inherit" onClick={() => router.push("/login")}>
                        Iniciar Sesión
                      </Button>
                      <Button color="inherit" onClick={() => router.push("/register")}>
                        Registrarse
                      </Button>
                    </>
                  )}
                </Toolbar>
              </AppBar>
            </Box>
          )
        }

      </CacheProvider>
    </>
  );
}