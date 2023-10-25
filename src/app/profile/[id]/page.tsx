'use client'

import * as React from 'react';
import { useState } from 'react';

import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import Paper from '@mui/material/Paper';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import {
  Card,
  CardHeader,
  CardContent
} from "@mui/material";

import "./styles.css";
import { getUserState } from '@/utils/getReduxState';
import { ExistProfile, GetInformation } from '@/utils/api';

// TODO remove, this demo shouldn't need to reset the theme.
const defaultTheme = createTheme();

export default function Profile({ params }: { params: { id: string } }) {

  const user = getUserState()
  const [information, setInformation] = useState(null);
  const [curriculum, setCurriculum] = useState(null)
  const [validprofile, setValidProfile] = useState(false)

  const loadInformation = async (userId: string) => {
    // Dentro de esta función, puedes hacer la solicitud con el userId que se pasa
    try {
      const isProfile = await ExistProfile(params.id)
      setValidProfile(isProfile)
      if (isProfile) {
        const [info, cv] = await GetInformation(userId);
        setInformation(info.data);
        setCurriculum(cv.data)
      }

    } catch (err) {
      console.error("Error al obtener la información:", err);
    }
  };

  React.useEffect(() => {
    // Una vez que tengas el valor de user.id, puedes llamar a loadInformation
    if (user.id) {
      loadInformation(user.id);
    }
  }, [user.id]); // Asegúrate de usar user.id en la dependencia del efecto

  if (validprofile) {
    return (
      <ThemeProvider theme={defaultTheme}>
        <Container>
          <Paper elevation={4} style={{ backgroundColor: '#4682B4', padding: '16px' }}>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <Box display="flex" alignItems="center">
                  <Avatar alt="Foto de perfil" style={{ width: '120px', height: '120px', marginRight: '16px', border: '2px solid #2196F3', backgroundColor: 'green' }}>
                    MB
                  </Avatar>
                  <Typography variant="h4" style={{ color: '#fff', fontFamily: 'Quicksand', fontSize: '48px' }} gutterBottom>
                    {user.name}
                  </Typography>
                </Box>
              </Grid>
            </Grid>
          </Paper>
          <Card style={{ backgroundColor: '#F5FFFA' }}>
            <CardHeader title="Información profesional" />
            <CardContent>

              <Grid item xs={12} sm={6}>
                <Typography variant="h6" style={{ fontFamily: 'Quicksand', fontSize: '18px' }}>Rut</Typography>
                <Typography variant="h6" style={{ fontFamily: 'Quicksand', fontSize: '18px' }}>{user.rut}</Typography>
                <br />
              </Grid>

              <Grid item xs={12} sm={6}>
                <Typography variant="h6" style={{ fontFamily: 'Quicksand', fontSize: '18px' }}>Correo</Typography>
                <Typography variant="h6" style={{ fontFamily: 'Quicksand', fontSize: '18px' }}>{user.email}</Typography>
                <br />
              </Grid>

              <Grid item xs={12} sm={6}>
                <Typography variant="h6" style={{ fontFamily: 'Quicksand', fontSize: '18px' }}>Fecha de nacimiento</Typography>
                <Typography variant="h6" style={{ fontFamily: 'Quicksand', fontSize: '18px' }}>{user.dob}</Typography>
                <br />
              </Grid>


              <Grid item xs={12} sm={6}>
                <Typography variant="h6" style={{ fontFamily: 'Quicksand', fontSize: '18px' }}>Profesión</Typography>
                <Typography variant="h6" style={{ fontFamily: 'Quicksand', fontSize: '18px' }}>{user.profession}</Typography>
                <br />
              </Grid>


              {/*
                <Grid item xs={12} sm={6}>
                  <Typography variant="h6" style={{ fontFamily: 'Quicksand', fontSize: '18px' }}>Descripción</Typography>
                  <Typography variant="h6" style={{ fontFamily: 'Quicksand', fontSize: '18px' }}>{user.description}</Typography>
                  <br />
                </Grid>*/
              }


              {/*
                <Grid item xs={12} sm={6}>
                  <Typography variant="h6" style={{ fontFamily: 'Quicksand', fontSize: '18px' }}>Habilidades</Typography>
                  <Typography variant="h6" style={{ fontFamily: 'Quicksand', fontSize: '18px' }}>{ }</Typography>
                  <br />
                </Grid>
  */}
              <Grid item xs={12} sm={6}>
                <Typography variant="h6" style={{ fontFamily: 'Quicksand', fontSize: '18px' }}>Experiencia laboral</Typography>
                {curriculum?.experiences.length > 0 ? ( // Verifica que hay experiencias
                  curriculum?.experiences.map((experience, index) => (
                    <div key={index}>
                      <Typography variant="h6" style={{ fontFamily: 'Quicksand', fontSize: '18px' }}>Position: {experience.position}</Typography>
                      <Typography variant="h6" style={{ fontFamily: 'Quicksand', fontSize: '18px' }}>Company: {experience.company}</Typography>
                      <Typography variant="h6" style={{ fontFamily: 'Quicksand', fontSize: '18px' }}>Start Date: {experience.startDate}</Typography>
                      <Typography variant="h6" style={{ fontFamily: 'Quicksand', fontSize: '18px' }}>End Date: {experience.endDate}</Typography>
                      <br />
                    </div>
                  ))
                ) : (
                  <Typography variant="h6" style={{ fontFamily: 'Quicksand', fontSize: '18px' }}>No hay experiencias laborales</Typography>
                )}
                <br />
              </Grid>


              <Grid item xs={12} sm={6}>
                <Typography variant="h6" style={{ fontFamily: 'Quicksand', fontSize: '18px' }}>Celular</Typography>
                <Typography variant="h6" style={{ fontFamily: 'Quicksand', fontSize: '18px' }}>{user.cellphone}</Typography>
                <br />
              </Grid>

            </CardContent>
          </Card>

          <Button variant="contained" color="primary" href="/">
            Volver
          </Button>

        </Container>
      </ThemeProvider>
    );

  }

  return (
    <h1>
      Perfil no valido
    </h1>
    )

}


