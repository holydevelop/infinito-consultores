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
  CardContent,
  TextField
} from "@mui/material";
import HomeIcon from '@mui/icons-material/Home';
import EditIcon from '@mui/icons-material/Edit';

import "./styles.css"

import { ExistProfile, GetDocument, GetUserApi, PutUserApi } from '@/utils/api';
import Loading from '@/components/Loading';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { useAppSelector } from '@/redux/hooks';
import FileUploadComponent from '@/components/FileUpload';

// TODO remove, this demo shouldn't need to reset the theme.
const defaultTheme = createTheme();

interface Info {
  rut?: string;
  correo?: string;
  nacimiento?: string;
  prof?: string;
  cel?: string;
  id: string;
  nombre?: string;
}

export default function Profile({ params }: { params: { id: string } }) {
  //Carga la actualizacion
  const { data: session, update } = useSession()
  //Carga del user state
  const user = useAppSelector(state => state.user)
  //Carga de informacion
  const [info, setInfo]: [Info | null, any] = useState<Info | null>(null);
  // Si es true el error entonces significa que dio 404 y no se encuentra
  const [pdfExist, setPdfExist] = useState(true);
  //Verificacion si el perfil es valido
  const [validprofile, setValidProfile] = useState(false)
  //Partes de la carga
  const [isLoading, setIsLoading] = useState(true)
  //Partes de la edicion del perfil
  const [isEditing, setIsEditing] = useState(false);
  const [editInfo, setEditInfo] = useState({ profession: info?.prof, cellphone: info?.cel });
  //Actualizacion IFrame
  const [iframeKey, setIframeKey] = useState(0);

  const router = useRouter()

  const handleInfoChange = (event: any, field: any) => {
    setEditInfo({
      ...editInfo,
      [field]: event.target.value,
    });
  };

  async function loadInformation(userId: string) {
    // Dentro de esta función, puedes hacer la solicitud con el userId que se pasa
    try {
      const isProfile = await ExistProfile(params.id)
      setValidProfile(isProfile)
      if (isProfile) {
        const user = await GetUserApi(userId);
        const resPdf = await GetDocument(userId)
        setInfo(user.data);
        setIsLoading(false)
      }

    } catch (err) {
      console.error("Error al obtener la información:", err);
      setIsLoading(false)
    }
  };

  const onSubmitChanges = async () => {
    try {
      const res = await PutUserApi(user?.id, { cellphone: editInfo.cellphone, profession: editInfo.profession })
      update({ user: { access_token: res.data } })
      setIsEditing(false)
      loadInformation(user?.id);
    } catch (err) {
      setIsEditing(false)
    }
  }

  React.useEffect(() => {
    if (user.id) {
      loadInformation(params.id);
    }
  }, [user.id, params.id]); // Asegúrate de usar user.id en la dependencia del efecto

  // En la función de actualización que se pasa a FileUploadComponent
  const updateIframe = () => {
    setIframeKey(iframeKey + 1);
  };

  function obtenerIniciales(name: string): string {
    // Dividir el nombre completo en nombre y apellido
    const partesNombre = name.split(" ");
    const primerNombre: string = partesNombre[0] || ''; // Tomar el primer elemento como nombre
    const primerApellido: string = partesNombre[1] || ''; // Tomar el segundo elemento como apellido

    // Obtener la primera letra del nombre y del apellido
    const inicialNombre: string = primerNombre ? primerNombre[0] : '';
    const inicialApellido: string = primerApellido ? primerApellido[0] : '';

    // Concatenar las iniciales en una variable
    const iniciales: string = inicialNombre + inicialApellido;

    return iniciales;
  }

  if (isLoading) {
    return (<Loading isLoading={true} />)
  }

  else {
    if (validprofile) {
      return (
        <ThemeProvider theme={defaultTheme}>
          <Container>
            <Paper elevation={4} style={{ backgroundColor: '#4682B4', padding: '16px' }}>
              <Grid container spacing={2}>
                <Grid item xs={12} sm={6}>
                  <Box display="flex" alignItems="center">
                    <Avatar alt="Foto de perfil" style={{ width: '120px', height: '120px', marginRight: '16px', border: '2px solid #2196F3', backgroundColor: 'green' }}>
                      {obtenerIniciales(String(info?.nombre))}
                    </Avatar>
                    <Typography variant="h4" style={{ color: '#fff', fontFamily: 'Quicksand', fontSize: '48px' }} gutterBottom>
                      {info?.nombre}
                    </Typography>
                  </Box>
                </Grid>
              </Grid>
            </Paper>
            <Card style={{ backgroundColor: '#F5FFFA' }} >
              <CardHeader title="Información profesional" />
              <CardContent>
                <Container className='main-grid' sx={{ display: "flex", justifyContent: "space-between", width: "100%", height: "100%", alignContent: "center" }}>
                  <Grid className='left-grid'>
                    <Grid item xs={12} sm={6} sx={{ flex: 1 }}>
                      <Typography variant="h6" style={{ fontFamily: 'Quicksand', fontSize: '18px' }}>Rut</Typography>
                      <Typography variant="h6" style={{ fontFamily: 'Quicksand', fontSize: '18px' }}>{info?.rut}</Typography>
                      <br />
                    </Grid>

                    <Grid item xs={12} sm={6}>
                      <Typography variant="h6" style={{ fontFamily: 'Quicksand', fontSize: '18px' }}>Correo</Typography>
                      <Typography variant="h6" style={{ fontFamily: 'Quicksand', fontSize: '18px' }}>{info?.correo}</Typography>
                      <br />
                    </Grid>

                    <Grid item xs={12} sm={6}>
                      <Typography variant="h6" style={{ fontFamily: 'Quicksand', fontSize: '18px' }}>Fecha de nacimiento</Typography>
                      <Typography variant="h6" style={{ fontFamily: 'Quicksand', fontSize: '18px' }}>{info?.nacimiento}</Typography>
                      <br />
                    </Grid>


                    <Grid item xs={12} sm={6}>
                      <Typography variant="h6" style={{ fontFamily: 'Quicksand', fontSize: '18px' }}>Profesión</Typography>
                      {
                        !isEditing ?
                          <Typography variant="h6" style={{ fontFamily: 'Quicksand', fontSize: '18px' }}>{info?.prof}</Typography>
                          :
                          <TextField
                            defaultValue={info?.prof}
                            sx={{ width: "300px", height: "70px" }}
                            name='profession'
                            value={editInfo.profession}
                            label={info?.prof}
                            onChange={(event) => handleInfoChange(event, 'profession')}
                          />
                      }

                      <br />
                    </Grid>


                    {/*
                  <Grid item xs={12} sm={6}>
                    <Typography variant="h6" style={{ fontFamily: 'Quicksand', fontSize: '18px' }}>Descripción</Typography>
                    <Typography variant="h6" style={{ fontFamily: 'Quicksand', fontSize: '18px' }}>{user.description}</Typography>
                    <br />
                  </Grid>*/
                    }

                    <Grid item xs={12} sm={6}>
                      <Typography variant="h6" style={{ fontFamily: 'Quicksand', fontSize: '18px' }}>Celular</Typography>
                      {
                        !isEditing ?
                          <Typography variant="h6" style={{ fontFamily: 'Quicksand', fontSize: '18px' }}>{info?.cel}</Typography>
                          :
                          <TextField
                            defaultValue={info?.cel}
                            sx={{ width: "300px", height: "12vh" }}
                            name="cellphone"
                            value={editInfo.cellphone}
                            label={info?.cel}
                            onChange={(event) => handleInfoChange(event, 'cellphone')}
                          />
                      }

                      <br />
                    </Grid>
                  </Grid>

                  <Grid className='right-grid' sx={{ justifyContent: "center", flex: 2, marginLeft: "200px" }}>
                    {
                      pdfExist ? (
                        <>
                          <iframe src={`${process.env.URL_API}/doc/user/${params.id}`}
                            width={"90%"} height={"400px"}
                            id='Curriculum' key={iframeKey} />
                          {!isEditing ? null : (
                            <div style={{ textAlign: 'center' }}>
                              <FileUploadComponent isEditing={true}
                                message={"Deseas modificar el curriculum?, selecciona el archivo"}
                                updateIframe={updateIframe}
                              />
                            </div>
                          )}
                        </>
                      ) : (
                        <div style={{ textAlign: 'center' }}>
                          <FileUploadComponent isEditing={isEditing}
                            message={"No tienes curriculum en formato PDF adjunto, haz clic en el botón para subir alguno"}
                          />
                        </div>
                      )
                    }

                  </Grid>
                </Container>
              </CardContent>
            </Card>

            <Grid container justifyContent="center" spacing={5} sx={{ marginTop: "-3vh" }}>
              {
                isEditing ?
                  null
                  :
                  <Grid item>
                    <Button variant="contained" color="primary" href="/" sx={{ backgroundColor: "0B3299" }}>
                      <HomeIcon />
                      Home
                    </Button>
                  </Grid>
              }

              {
                (user.id === info?.id) && !isEditing ?
                  <Grid item>
                    <Button variant="contained" color="primary" sx={{ backgroundColor: '#5B2C6F' }} onClick={() => { setIsEditing(true) }}>
                      <EditIcon />
                      Editar Perfil
                    </Button>
                  </Grid>
                  :
                  null
              }

              {
                isEditing ?
                  <Grid item>
                    <Button variant="contained" color="success" onClick={onSubmitChanges}>
                      <EditIcon />
                      Guardar cambios
                    </Button>
                  </Grid>
                  :
                  null
              }

              {
                isEditing ?
                  <Grid item>
                    <Button variant="contained" color="error" onClick={() => { setIsEditing(false) }}>
                      <EditIcon />
                      Cancelar Cambios
                    </Button>
                  </Grid>
                  :
                  null
              }
            </Grid>

          </Container>
        </ThemeProvider >
      );

    }

    return (
      <h1>
        Perfil no valido
      </h1>
    )

  }

}
