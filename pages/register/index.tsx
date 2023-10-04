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

import { registeruser } from '@/utils/api';
import { User } from '@/utils/user';
import { validData } from '@/utils/validations';

// TODO remove, this demo shouldn't need to reset the theme.
const defaultTheme = createTheme();

export function Calendar({ setDate }) {

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

  const [date, setDate] = React.useState(new Date())
  const [formErrors, setFormErrors] = React.useState({});
  const [formSubmitted, setFormSubmitted] = React.useState(false);

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);

    // Validaciones utilizando la función validData
    const { isValid, errors } = validData({
      email: String(data.get('email')),
      password: String(data.get('password')),
      firstName: String(data.get('firstName')),
      lastName: String(data.get('lastName')),
      fecha: String(date),
      telefono: String(data.get('cellphone')),
    });

    // Actualiza el estado 'formErrors' con los mensajes de error
    setFormErrors(errors);

    // Marca el formulario como enviado
    setFormSubmitted(true);

    // Si todas las validaciones son exitosas, puedes crear el objeto de usuario
    if (isValid) {
      const user = {
        email: String(data.get('email')),
        name: `${String(data.get('firstName'))} ${String(data.get('lastName'))}`,
        password: String(data.get('password')),
        dateofbirth: new Date(date),
        rut: String(data.get('rut')),
        cellphone: String(data.get('cellphone')),
        profession: "INFORMATICA"
      };
      // Luego puedes llamar a la función para registrar al usuario
      // registeruser(user)
    }

    console.log("Clickeado");
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
            Sign up
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
                  style={{
                    borderColor: formErrors.firstName && formSubmitted ? 'red' : 'initial',
                  }}
                />

                {formErrors.firstName && formSubmitted && (
                  <p style={{ color: 'red' }}>{formErrors.firstName}</p>
                )}
              </Grid>
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
                  label="Telefono / Celular"
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
              Sign Up
            </Button>
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