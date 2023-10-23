'use client'

import * as React from 'react';
import { useState } from 'react';

import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import TextField from '@mui/material/TextField';
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
    CardActions,
  } from "@mui/material";
import "./styles.css";
import { getUserState } from '@/utils/getReduxState';

// TODO remove, this demo shouldn't need to reset the theme.
const defaultTheme = createTheme();

export default function Profile ({ params }: { params: { id: string }}){

  const user = getUserState()

  return (
    <ThemeProvider theme={defaultTheme}>
      <Container>
        <Paper elevation={4} style={{ backgroundColor: '#4682B4', padding: '16px' }}>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              {
                /*
              
              <Box display="flex" alignItems="center">
                <Avatar src={user.photo} alt="Foto de perfil" style={{ width: '120px', height: '120px', marginRight: '16px', border: '2px solid #2196F3' }} />
                <Typography variant="h4" style={{ color: '#fff', fontFamily: 'Quicksand', fontSize: '48px' }} gutterBottom>
                  {user.name}
                </Typography>
              </Box>
              */
              }
            </Grid>
          </Grid>
        </Paper>



        <Card style={{backgroundColor:'#F5FFFA'}}>
          <CardHeader title="Información profesional"/>
          <CardContent>

            <Grid item xs={12} sm={6}>
              <Typography variant="h6" style={{ fontFamily:'Quicksand', fontSize:'18px' }}>Descripción</Typography>
              {
              //<Typography variant="h6" style={{ fontFamily:'Quicksand', fontSize:'18px' }}>{user.description}</Typography>
              }
              <br/>
            </Grid>


            <Grid item xs={12} sm={6}>
              <Typography variant="h6" style={{ fontFamily:'Quicksand', fontSize:'18px' }}>Fecha de nacimiento</Typography>
              <Typography variant="h6" style={{ fontFamily:'Quicksand', fontSize:'18px' }}>{user.dob}</Typography>
              <br/>
            </Grid>



            <Grid item xs={12} sm={6}>
              <Typography variant="h6" style={{ fontFamily:'Quicksand', fontSize:'18px' }}>Profesión</Typography>
              <Typography variant="h6" style={{ fontFamily:'Quicksand', fontSize:'18px' }}>{user.profession}</Typography>
              <br/>
            </Grid>           



            <Grid item xs={12} sm={6}>
              <Typography variant="h6" style={{ fontFamily:'Quicksand', fontSize:'18px' }}>Habilidades</Typography>
              {
                //<Typography variant="h6" style={{ fontFamily:'Quicksand', fontSize:'18px' }}>{user.skills}</Typography>
              }
              <br/>
            </Grid>
        


            <Grid item xs={12} sm={6}>
              <Typography variant="h6" style={{ fontFamily:'Quicksand', fontSize:'18px' }}>Experiencia laboral</Typography>
              {
                //<Typography variant="h6" style={{ fontFamily:'Quicksand', fontSize:'18px' }}>{user.company}</Typography>
              }
              <br/>
            </Grid>
      


            <Grid item xs={12} sm={6}>
              <Typography variant="h6" style={{ fontFamily:'Quicksand', fontSize:'18px' }}>Rut</Typography>
              <Typography variant="h6" style={{ fontFamily:'Quicksand', fontSize:'18px' }}>{user.rut}</Typography>
              <br/>
            </Grid>
        


            <Grid item xs={12} sm={6}>
              <Typography variant="h6" style={{ fontFamily:'Quicksand', fontSize:'18px' }}>Correo</Typography>
              <Typography variant="h6" style={{ fontFamily:'Quicksand', fontSize:'18px' }}>{user.email}</Typography>
              <br/>
            </Grid>
      


            <Grid item xs={12} sm={6}>
              <Typography variant="h6" style={{ fontFamily:'Quicksand', fontSize:'18px' }}>Celular</Typography>
              <Typography variant="h6" style={{ fontFamily:'Quicksand', fontSize:'18px' }}>{user.cellphone}</Typography>
              <br/>
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

