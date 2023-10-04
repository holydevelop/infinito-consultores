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
import { relative } from 'path';

// TODO remove, this demo shouldn't need to reset the theme.
const defaultTheme = createTheme();

export function Calendar({ setDate }) {

  const handleDateChange = (date: Date) => {
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

  const [date, setDate] = React.useState(new Date());

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
  
    // Validate form data
    const firstName = String(data.get('firstName'));
    const lastName = String(data.get('lastName'));
    const email = String(data.get('email'));
    const password = String(data.get('password'));
    const rut = String(data.get('rut'));
    const cellphone = String(data.get('cellphone'));
    const dateOfBirth = date;
    
    if (!validations.isNotEmpty(firstName)) {
      // Handle empty firstName error
      return;
    }
    
    if (!validations.isNotEmpty(lastName)) {
      // Handle empty lastName error
      return;
    }
    
    if (!validations.isNotEmpty(email)) {
      // Handle empty email error
      return;
    }
    
    if (!validations.isValidEmail(email)) {
      // Handle invalid email error
      return;
    }
    
    if (!validations.isNotEmpty(password)) {
      // Handle empty password error
      return;
    }
    
    if (!validations.isNotEmpty(rut)) {
      // Handle empty rut error
      return;
    }
    
    if (!validations.isValidRut(rut)) {
      // Handle invalid rut error
      return;
    }
    
    if (!validations.isNotEmpty(cellphone)) {
      // Handle empty cellphone error
      return;
    }
    
    if (!validations.isValidCellphone(cellphone)) {
      // Handle invalid cellphone error
      return;
    }
  
          <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3 }}>
  
    const user: User = {
      email,
      name: `${firstName} ${lastName}`,
      password,
      dateofbirth: dateOfBirth,
      rut,
      cellphone,
      profession: "INFORMATICA"
    };
  
    registeruser(user);
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
                />
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
              <Grid item xs={12} style={{position: 'relative', left: '65px'}}>
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
            <Grid container justifyContent="flex-end" style={{position: 'relative', left: '-95px'}}>
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