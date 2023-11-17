"use client"
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';
import Navbar from '@/components/Navbar';
import "./styles.css"
import { Typography } from '@mui/material';
import Card from '@mui/material/Card';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import BusinessCenterIcon from '@mui/icons-material/BusinessCenter';
import CardContent from '@mui/material/CardContent';

export default function App() {
  return (
    <div style={{backgroundColor: '#D6D6D6'}}>
    <div>
      <Navbar />
      <div className="container">
      <Typography variant="h2" style={{ fontFamily: 'Montserrat', fontSize: '32px',fontStyle:'bold',letterSpacing:'1px' }}>Nuestros Servicios</Typography>
      <Typography variant="h1" style={{ fontFamily: 'Montserrat', fontSize: '38px',fontStyle:'bold',letterSpacing:'1px' }}>Búsqueda y selección de profesionales</Typography>
      <hr />
      <Typography style={{ fontFamily: 'Montserrat', fontSize: '16px',fontStyle:'bold',letterSpacing:'1px' }}>Reclutamiento y evaluaciones psicolaborales para distintas áreas de la empresa.</Typography>
      <style jsx>{`
        .container {
          margin: 50px;
          text-align: center; // Centra el texto
        }
        hr {
          border: none;
          height: 5px;
          width: 100px;
          border-radius: 4px; 

          background: blue; // Línea separadora de color azul
        }
        
      `}</style>
    </div>
    {/* Contenedor de la sección */}
    <Box component="section" >
        {/* Grid container */}
        <Grid container spacing={2} justifyContent="center" style={{backgroundColor:'#2D678A'}}>
          {/* Primer servicio */}
          <Grid item xs={12} sm={6} md={3}>
          <Card style={{backgroundColor:'#D9D9D7',height:'99%'}}>
      <CardContent>
        <AccountCircleIcon color="secondary" style={{textAlign:'center', fontSize:'70px',display:'block'}}></AccountCircleIcon>

        <Typography style={{ fontFamily: 'Montserrat', fontSize: '22px',fontStyle:'bold',letterSpacing:'1px', textAlign:'center' }} >
        Reclutamiento y Selección de profesionales        </Typography>
        <Typography style={{ fontFamily: 'Montserrat', fontSize: '16px',textAlign:'justify' }}>
        Nuestras búsquedas y posterior selección de profesionales, están orientadas a realizar una evaluación
                minuciosa del personal, cumpliendo con los requerimientos exigidos por nuestro cliente, enfocándonos no
                sólo en el perfil técnico, sino que también con las habilidades blandas para un buen desempeño laboral.
        </Typography>

      </CardContent>

    </Card>
          </Grid>

          {/* Segundo servicio */}
          <Grid item xs={12} sm={6} md={3}>
          <Card style={{backgroundColor:'#D9D9D7',height:'99%'}}>
      <CardContent>
        <BusinessCenterIcon color="secondary" style={{display:'block',alignItems:'center', fontSize:'70px'}}></BusinessCenterIcon>

        <Typography style={{ fontFamily: 'Montserrat', fontSize: '22px',fontStyle:'bold',letterSpacing:'1px', textAlign:'center' }} >
        Head Hunter     </Typography>
        <Typography style={{ fontFamily: 'Montserrat', fontSize: '16px',textAlign:'justify' }}>
        El Head Hunter se basa fundamentalmente en la búsqueda de talentos a través de contactos o referidos,
                investigando en las diferentes organizaciones para encontrar a los mejores candidatos pasivos que no
                estén en buscando activa laboral.
        </Typography>

      </CardContent>

    </Card>
            
          </Grid>

          {/* Otros servicios van aquí, replicando la misma estructura */}

        </Grid>
      </Box>
    </div>
    </div>
  )
}