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
import Loading from '@/components/Loading';
import { registerUser } from '@/utils/api';
import { validData } from '@/utils/validations';
import { LocalizationProvider, DatePicker } from '@mui/x-date-pickers';
import { AxiosResponse } from 'axios';
import { useSession } from 'next-auth/react';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { useRouter } from 'next/navigation';
import { useAppDispatch } from '@/redux/hooks';

// TODO remove, this demo shouldn't need to reset the theme.
const defaultTheme = createTheme();

interface FormErrors {
  firstName?: string,
  lastName?: string;
  email?: string;
  password?: string;
  cellphone?: string;
  dateofbirth?: string;
}

interface RegisterResponse {
  statusCode?: number,
  error?: any
}

function Calendar({ setDate, formErrors }: { setDate: any, formErrors: any }) {
  const handleDateChange = (date: any) => {
    setDate(date);
  };

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <DatePicker
        onChange={handleDateChange}
        label="Fecha de nacimiento"
        format="DD/MM/YY"
        slotProps={{
          textField: {
            error: formErrors?.dateofbirth ? true : false,
            helperText: formErrors?.dateofbirth
          }
        }}
      />
    </LocalizationProvider>
  );
}

export default function SignUp() {
  const router = useRouter()
  const { data: session, status } = useSession()
  //UseState para la fecha sirve para recibir la fecha
  const [date, setDate]: any = React.useState(null)
  //Informacion de error en los formularios para AlertRegister
  const [formErrors, setFormErrors]: [FormErrors, any] = React.useState({});
  //Error de email duplicado
  //Estado de carga
  const [isLoading, setIsLoading] = React.useState(false);

  if (status === "loading") {
    return (<Loading isLoading={true} />)
  }

  if (status === "authenticated") {
    router.push('/')
  }

  if (status === "unauthenticated") {
    //Funcion al darle al boton de enviar
    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
      event.preventDefault();
      setFormErrors({})
      setIsLoading(true)
      const data = new FormData(event.currentTarget);
      const user = {
        email: String(data.get('email')),
        password: String(data.get('password')),
        dateofbirth: date,
        rut: String(data.get('rut')),
        cellphone: String(data.get('cellphone')),
        profession: "INFORMATICA",
        name: String(`${data.get('firstName')} ${data.get('lastName')}`),
        firstName: String(data.get('firstName')),
        lastName: String(data.get('lastName'))
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
        setIsLoading(false);
        return;
      }
      const { firstName, lastName, ...newUser } = user

      const res: AxiosResponse<any, any> | RegisterResponse = await registerUser(newUser);
      if ('statusCode' in res) {
        if (res.statusCode === 400) {
          const newFormerrors = { ...formErrors };
          newFormerrors.email = "Correo electrónico ya en uso";
          setFormErrors(newFormerrors);
          setIsLoading(false);
          return;
        }
      } else {
        setIsLoading(false);
        alert("Cuenta creada con exito")
        router.push("/")
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
                    error={formErrors.firstName ? true : false}
                    helperText={formErrors.firstName}
                    autoFocus
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    required
                    fullWidth
                    id="lastName"
                    label="Apellido"
                    name="lastName"
                    error={formErrors.lastName ? true : false}
                    helperText={formErrors.lastName}
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
                    error={formErrors.email ? true : false}
                    helperText={formErrors.email}
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
                    error={formErrors.password ? true : false}
                    helperText={formErrors.password}
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
                    error={formErrors.cellphone ? true : false}
                    helperText={formErrors.cellphone}
                  />
                </Grid>
                <Grid item xs={12} container justifyContent={"center"}>
                  <Calendar setDate={setDate} formErrors={formErrors}

                  />
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
              <Grid container direction="column" alignItems="center">
                <Grid item>
                  <Link href="/login" variant="body2">
                    Ya tienes cuenta? Inicia sesión
                  </Link>
                </Grid>
                <Grid item>
                  <Link href="/" variant="body2">
                    Volver al inicio
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