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
import { Menu, MenuItem,Stack, createTheme } from '@mui/material';
import { signOut } from 'next-auth/react';
import reclutalento from "../../public/Untitled.png";
/** @jsxImportSource @emotion/react */
import { CacheProvider } from '@emotion/react';
import createCache from '@emotion/cache';
import { useTheme } from '@mui/material/styles';


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
  const theme = createTheme({
    palette: {
      primary: {
        main: '#47708b',
        dark:'#2e485a',
      },
      secondary: {
        main: '#3f88c5',
      },
      background: {
        default: '#e6ebf2',
      },
      success: {
        main: '#004292',
        dark: '#10222e'
      },
      error: {
        main: '#0B2E88',
        dark:'#385c74'
      },
      // Otros ajustes de paleta y estilos...
    },
    // Otros ajustes del tema...
  });

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
              <AppBar position="static" sx={{backgroundColor: theme.palette.primary.main}}>
                <Toolbar sx={{ justifyContent: 'space-between' }}>
                  <Link href="/" style={{ display: 'flex', alignItems: 'center', textDecoration: 'none', color: '#FFFFFF' }}>
                    <Image src="https://flowbite.com/docs/images/logo.svg" alt="RecluTalento Logo" width={50} height={50} />
                    <Typography variant="h6" style={{ marginLeft: '8px' }}>
                      RecluTalento
                    </Typography>
                  </Link>
                  {session ? (<>
                  {reclutador_check ?(<><Stack direction={'row'}><Button variant="contained" color="primary" href={`/proposal`} sx={{fontSize:'90%',backgroundColor: theme.palette.error.dark,fontFamily:'Montserrat' }}>
          Nueva Oferta
        </Button>
        <Button variant="contained" color="primary" href={`/postulantes`} sx={{fontSize:'90%',backgroundColor: theme.palette.error.dark,fontFamily:'Montserrat' }}>
          Mis Ofertas
        </Button>
        <Button variant="contained" color="primary" href={`/jobs`} sx={{fontSize:'90%',backgroundColor: theme.palette.error.dark,fontFamily:'Montserrat' }}>
                    Ofertas de Trabajo
                  </Button></Stack></>)
                  :(<><Stack direction={'row'}>
                <Button variant="contained" color="primary" href={`/jobs`} sx={{fontSize:'90%',backgroundColor: theme.palette.error.dark,fontFamily:'Montserrat' }}>
                            Ofertas de Trabajo
                          </Button>
                          </Stack></>)}</>)
                  :(<></>)}
                
              
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
                    <><Stack direction={'row'}><Button color="inherit" onClick={() => router.push("/login")}>
                    Iniciar Sesión
                  </Button>
                  <Button color="inherit" onClick={() => router.push("/register")}>
                    Registrarse
                  </Button></Stack>
                      
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