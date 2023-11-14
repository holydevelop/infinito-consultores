"use client"

import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';

import { signIn, useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import Loading from '@/components/Loading';
import { useState } from 'react';
// TODO remove, this demo shouldn't need to reset the theme.
const defaultTheme = createTheme();

export default function SignIn() {

  const router = useRouter()
  const { data: session, status } = useSession()
  const [failedLogin, setFailedLogin] = useState(false)
  const [msgError, setMsgError] = useState("")

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setFailedLogin(false)
    setMsgError("")
    const data = new FormData(event.currentTarget);

    const resNextAuth = await signIn("credentials", {
      email: String(data.get("email")),
      password: String(data.get("password")),
      redirect: false
    })

    if(resNextAuth?.status === 401){
      setFailedLogin(true)
      setMsgError("Credenciales incorrectas. Verifica tu correo y contraseña")
      return
    }

    if (resNextAuth?.error) {
      console.log(resNextAuth?.error)
      return
    }

    router.push("/")
  };

  if (status === "loading") {
    return (<Loading isLoading={true} />)
  }

  if (status === "authenticated") {
    router.push('/')
  }

  if (status === "unauthenticated") {
    return (
      <ThemeProvider theme={defaultTheme}>
        <Container component="main" maxWidth="xs">
          <CssBaseline />
          <Box
            sx={{
              marginTop: 8,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
            }}
          >
            <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
              <LockOutlinedIcon />
            </Avatar>
            <Typography component="h1" variant="h5">
              Iniciar Sesion
            </Typography>
            <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
              <TextField
                margin="normal"
                required
                fullWidth
                id="email"
                label="Correo electronico"
                name="email"
                autoComplete="email"
                autoFocus
                error={failedLogin? true : false}
                helperText={msgError}
              />
              <TextField
                margin="normal"
                required
                fullWidth
                name="password"
                label="Contraseña"
                type="password"
                id="password"
                autoComplete="current-password"
                error={failedLogin? true : false}
              />
              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
              >
                Iniciar Sesion
              </Button>
              <Grid container>
                <Grid item xs>
                  <Link href="#" variant="body2">
                    Olvidaste tu contraseña?
                  </Link>
                </Grid>
                <Grid item>
                  <Link href="/register" variant="body2">
                    {"No tienes cuenta? Registrate aca"}
                  </Link>
                </Grid>
              </Grid>
            </Box>
          </Box>
        </Container>
      </ThemeProvider>
    )

  }

}

