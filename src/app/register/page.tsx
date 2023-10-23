"use client"

import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';

import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';

import { registerUser } from '@/utils/api';

import { validData } from '@/utils/validations';
import Loading from '../../components/Loading';
import { Alert, Dialog } from '@mui/material';
import { useRouter } from 'next/navigation';
import { useSession } from 'next-auth/react';

// TODO remove, this demo shouldn't need to reset the theme.
const defaultTheme = createTheme();

function Calendar({ setDate }: any) {

  const handleDateChange = (date: any) => {
    setDate(date);
  };

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <DatePicker
        onChange={handleDateChange}
        label="Fecha de nacimiento"
        format="DD/MM/YY"
      />
    </LocalizationProvider>
  );
}

export default function SignUp() {

  const router = useRouter()
  const { data: session, status } = useSession()

  if (status === "loading") {
    return (<Loading isLoading={true} />)
  }

  if (status === "authenticated") {
    router.push('/')
  }

  if (status === "unauthenticated") {
    //UseState para la fecha sirve para recibir la fecha
    const [date, setDate]: any = React.useState(null)
    //Dialog sirve para mostrar el dialogo una vez que se clickea al registrar
    const [dialogOpen, setIsDialogOpenLocally] = React.useState(false)
    //Informacion de error en los formularios para AlertRegister
    const [formErrors, setFormErrors] = React.useState({});
    //Estado de carga
    const [isLoading, setIsLoading] = React.useState(false);
    //Error duplicado
    const [errorEmail, setErrorEmail] = React.useState(false)

    //Funcion al darle al boton de enviar
    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
      event.preventDefault();
      setIsLoading(true)
      const data = new FormData(event.currentTarget);
      const user = {
        email: String(data.get('email')),
        password: String(data.get('password')),
        dateofbirth: date,
        rut: String(data.get('rut')),
        cellphone: String(data.get('cellphone')),
        profession: "INFORMATICA",
        name: `${data.get('firstName')} ${data.get('lastName')}`
      };
      // Validaciones utilizando la función validData
      const { errors } = validData(user);
      // Validacion de fecha
      if (!date) { //Funcion por error de pasar la fecha
        errors.dateofbirth = "Selecciona una fecha de nacimiento"
      }
      setFormErrors(errors)

      // Verificar si hay errores generales en el formulario
      const hasGeneralErrors = Object.values(errors).some((error) => error !== "");
      if (hasGeneralErrors) {
        setIsDialogOpenLocally(true);
        setIsLoading(false);
        return;
      }

      const res: any = await registerUser(user);

      if (res.statusCode === 400) {
        setErrorEmail(true);
        setIsLoading(false);
        return;
      } else {
        setIsDialogOpenLocally(true);
        setIsLoading(false);
        return;
      }

    };

    return (
      <ThemeProvider theme={defaultTheme}>
        <Container component="main" maxWidth="xs">
          <CssBaseline />
          <Box
            sx={{
              marginTop: 2,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
            }}
          >
            <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
              <LockOutlinedIcon />
            </Avatar>
            <Typography component="h1" variant="h5">
              Registrarse
            </Typography>
            <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3 }}>
              <Grid container spacing={2}>
                <Grid item xs={12} sm={6}>
                  <TextField
                    autoComplete="given-name"
                    name="firstName"
                    required
                    fullWidth
                    id="firstName"
                    label="Nombre"
                    autoFocus
                  />
                </Grid>
                <Dialog open={errorEmail}>
                  <Alert severity="error" >
                    <h1>Error al crear la cuenta</h1>
                    <p>Verifique que el correo electronico no este duplicado</p>
                    <Button onClick={() => { setErrorEmail(false) }}>Cerrar</Button>
                  </Alert>
                </Dialog>
                <Grid item xs={12} sm={6}>
                  <TextField
                    required
                    fullWidth
                    id="lastName"
                    label="Apellido"
                    name="lastName"
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    required
                    fullWidth
                    id="rut"
                    label="RUT (Sin Guion)"
                    name="rut"
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    required
                    fullWidth
                    id="email"
                    label="Correo electronico"
                    name="email"
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    required
                    fullWidth
                    name="password"
                    label="Contraseña"
                    type="password"
                    id="password"
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    required
                    fullWidth
                    name="cellphone"
                    label="Telefono / Celular (Añadir +56 9 o 2)"
                    type="string"
                    id="cellphone"
                  />
                </Grid>
                <Grid item xs={12} container justifyContent={"center"}>
                  <Calendar setDate={setDate} />
                </Grid>
              </Grid>
              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 5, mb: 2 }}
              >
                Registrarse
              </Button>
              <Loading isLoading={isLoading} />
              <Grid container justifyContent="center">
                <Grid item>
                  <Link href="/login" variant="body2">
                    Ya tienes cuenta? Inicia sesion
                  </Link>
                </Grid>
              </Grid>
            </Box>
          </Box>
        </Container>
      </ThemeProvider>
    );
  }

}