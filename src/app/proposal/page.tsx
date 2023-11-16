"use client"

import * as React from 'react';
import { Container, Typography, TextField, Button, Collapse, Snackbar } from '@mui/material';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import HomeIcon from '@mui/icons-material/Home';
import CssBaseline from '@mui/material/CssBaseline';
import Box from '@mui/material/Box';
import Alert from '@mui/material/Alert';
import AlertTitle from '@mui/material/AlertTitle';
import {
  Card,
  CardContent,
} from "@mui/material";
import { createTheme, ThemeProvider } from '@mui/material/styles';
import Navbar from "@/components/Navbar";
import Loading from '@/components/Loading';
import { registerJob } from '@/utils/api';
import { validDataJob } from '@/utils/validations';
import { AxiosResponse } from 'axios';
import { useSession } from 'next-auth/react';
import { useAppDispatch, useAppSelector } from '@/redux/hooks';
import { useRouter } from 'next/navigation';
import { Job } from '@/utils/job';
import { useState } from 'react';

// TODO remove, this demo shouldn't need to reset the theme.
const defaultTheme = createTheme();

interface FormErrors {
  posicion?: string,
  empresa?: string,
  descripcion?: string,
  tags?: string,
}

interface JobResponse {
  statusCode?: number,
  error?: any
}

export default function Proposal() {
  const router = useRouter()
  const { data: session, status } = useSession()

  //estado de la alerta
  const [open, setOpen] = useState(false)

  //Carga del user state
  const user = useAppSelector(state => state.user)

  //Informacion de error en los formularios para AlertRegister
  const [formErrors, setFormErrors]: [FormErrors, any] = React.useState({});

  //Estado de carga
  const [isLoading, setIsLoading] = React.useState(false);

  //datos iniciales
  const initialState = {
    posicion: '',
    empresa: '',
    descripcion: '',
    tags: ''
  };

  //informacion de los trabajos
  const [job, setJob] = React.useState(initialState);



  if (status === "loading") {
    return (<Loading isLoading={true} />)
  }

  if (status === "authenticated") {
    //Funcion al darle al boton de enviar
    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
      event.preventDefault();
      setFormErrors({})
      setIsLoading(true)
      const data = new FormData(event.currentTarget);
      const job: Job = {
        posicion: String(data.get('title')),
        empresa: String(data.get('company')),
        descripcion: String(data.get('description')),
        tags: String(data.get('tag')),
        reclutadorId: String(user.id)
      };

      // Validaciones utilizando la función validData
      const { errors } = validDataJob(job);


      setFormErrors(errors)
      // Verificar si hay errores generales en el formulario
      const hasGeneralErrors = Object.values(errors).some((error) => error !== "");
      if (hasGeneralErrors) {
        setIsLoading(false);
        return;
      }

      const { ...newJob } = job


      const res: AxiosResponse<any, any> | JobResponse = await registerJob(newJob);

      if ('statusCode' in res) {
        if (res.statusCode === 400) {
          const newFormerrors = { ...formErrors };

          setFormErrors(newFormerrors);
          setIsLoading(false);
          setOpen(false);
          return;
        }
      } else {

        setIsLoading(false);
        setOpen(true);
        // Reiniciar el estado del formulario después de enviar la propuesta
        setJob(initialState);
        return;
      }

    };

    if (user.rol === 'Reclutador') {

      return (
        <>
          <Navbar />
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
              <Typography component="h1" variant="h5">
                PROPUESTA DE TRABAJO
              </Typography>
              <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3 }}>
                <Grid container spacing={2}>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      autoComplete="given-title"
                      name="title"
                      required
                      fullWidth
                      id="title"
                      label="Título del Trabajo"
                      error={formErrors.posicion ? true : false}
                      helperText={formErrors.posicion}
                      autoFocus
                      value={job.posicion}  // Asegúrate de asignar el valor del estado al campo
                      onChange={(e) => setJob({ ...job, posicion: e.target.value })}
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      required
                      fullWidth
                      id="company"
                      label="Empresa"
                      name="company"
                      error={formErrors.empresa ? true : false}
                      helperText={formErrors.empresa}
                      value={job.empresa}  // Asegúrate de asignar el valor del estado al campo
                      onChange={(e) => setJob({ ...job, empresa: e.target.value })}
                    />
                  </Grid>
                  <Grid item xs={12} height={"90%"}>
                    <TextField
                      required
                      fullWidth
                      id="description"
                      label="Descripción del trabajo"
                      name="description"
                      error={formErrors.descripcion ? true : false}
                      helperText={formErrors.descripcion}
                      multiline
                      value={job.descripcion}  // Asegúrate de asignar el valor del estado al campo
                      onChange={(e) => setJob({ ...job, descripcion: e.target.value })}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      required
                      fullWidth
                      id="tag"
                      label="Etiquetas(Virtual,Online,Hibrido,Practica,Fulltime,Partime,Santiago,Región)"
                      name="tag"
                      error={formErrors.tags ? true : false}
                      helperText={formErrors.tags}
                      value={job.tags}  // Asegúrate de asignar el valor del estado al campo
                      onChange={(e) => setJob({ ...job, tags: e.target.value })}
                    />
                  </Grid>
                </Grid>
                <Button
                  type="submit"
                  fullWidth
                  variant="contained"
                  sx={{ mt: 5, mb: 2 }}
                //onClick={() => setOpen(true)}
                >
                  Enviar Propuesta
                </Button>

                <Snackbar open={open} >
                  <Alert severity="success" onClose={() => { setOpen(false) }}>
                    <AlertTitle>COMPLETADO</AlertTitle>
                    <strong>Su propuesta fue publicada con exito!</strong>
                  </Alert>
                </Snackbar>

                <Loading isLoading={isLoading} />
              </Box>
            </Box>


          </Container>
        </ThemeProvider>
        </>
      );
    }

    return (
      <h1>
        ERROR 403: Acceso NO Autorizado.
      </h1>
    )

  }

}