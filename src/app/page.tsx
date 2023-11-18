"use client"
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';
import { setTrueStatus } from '@/redux/features/navStatusSlice';
import { useAppDispatch } from '@/redux/hooks';
import Navbar from '@/components/Navbar';
import "./styles.css"
import { Typography, createTheme } from '@mui/material';
import Card from '@mui/material/Card';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import BusinessCenterIcon from '@mui/icons-material/BusinessCenter';
import CardContent from '@mui/material/CardContent';
import PsychologyIcon from '@mui/icons-material/Psychology';
export default function App() {
  const theme = createTheme({
    palette: {
      primary: {
        main: '#47708b',
        dark:'#2e485a',
      },
      secondary: {
        main: '#3f88c5',
      },
      background: {
        default: '#e6ebf2',
      },
      success: {
        main: '#004292',
        dark: '#10222e'
      },
      error: {
        main: '#a37871',
      },

      // Otros ajustes de paleta y estilos...
    },
    // Otros ajustes del tema...
  });

  const dispatch = useAppDispatch();
  dispatch(setTrueStatus())

  return (
    <div style={{backgroundColor: theme.palette.background.default}}>
    <div>
    <Navbar />      
      <div className="container">
      <Typography  style={{ fontFamily: 'Montserrat', fontSize: '32px',fontStyle:'bold',letterSpacing:'1px' }}>Nuestros Servicios</Typography>
      <Typography  style={{ fontFamily: 'Montserrat', fontSize: '38px',fontStyle:'bold',letterSpacing:'1px' }}>Búsqueda y selección de profesionales</Typography>
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

          background: ${theme.palette.primary.dark}; // Línea separadora de color azul
        }
        
      `}</style>
    </div>
    {/* Contenedor de la sección */}
    <Box  component="section" style={{backgroundColor:theme.palette.background.default, minHeight: '100vh'}} >
        {/* Grid container */}
        <Grid container spacing={2} justifyContent="center" style={{backgroundColor:theme.palette.primary.dark}}>
          {/* Primer servicio */}
          <Grid item xs={12} sm={1} md={3}>
          <Card style={{backgroundColor:theme.palette.background.default,height:'95%',width:'90%'}}>
      <CardContent>
        <AccountCircleIcon  style={{color:theme.palette.success.main ,textAlign:'center', fontSize:'70px',display:'block'}}></AccountCircleIcon>

        <Typography style={{ fontFamily: 'Montserrat', fontSize: '22px',fontStyle:'bold',letterSpacing:'1px', textAlign:'center' }} >
        Reclutamiento y Selección de profesionales        </Typography>
        <Typography style={{ fontFamily: 'Montserrat', fontSize: '16px',textAlign:'justify',fontStretch:'100%' }}>
        Nuestras búsquedas y posterior selección de profesionales, están orientadas a realizar una evaluación
                minuciosa del personal, cumpliendo con los requerimientos exigidos por nuestro cliente, enfocándonos no
                sólo en el perfil técnico, sino que también con las habilidades blandas para un buen desempeño laboral.
        </Typography>

      </CardContent>

    </Card>
          </Grid>

          {/* Segundo servicio */}
          <Grid item xs={12} sm={1} md={3}>
          <Card style={{backgroundColor:theme.palette.background.default,height:'95%',width:'90%'}}>
      <CardContent>
      <BusinessCenterIcon color="secondary" style={{color:theme.palette.success.main ,textAlign:'center', fontSize:'60px',display:'block'}}></BusinessCenterIcon>

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
          <Grid item xs={12} sm={1} md={3}>
          <Card style={{backgroundColor:theme.palette.background.default,height:'95%',width:'90%'}}>
      <CardContent>
      <PsychologyIcon color="secondary" style={{color:theme.palette.success.main ,textAlign:'center', fontSize:'60px',display:'block'}}></PsychologyIcon>

        <Typography style={{ fontFamily: 'Montserrat', fontSize: '22px',fontStyle:'bold',letterSpacing:'1px', textAlign:'center' }} >
        Evaluaciones Psicolaborales     </Typography>
        <Typography style={{ fontFamily: 'Montserrat', fontSize: '16px',textAlign:'justify' }}>
        Este Servicio es un conjunto de técnicas utilizadas para conocer rasgos ocultos del candidato que no puedes ser determinados en una entrevista personal. Se utiliza para determinar si el candidato es psicológicamente apto para el cargo al que postula.
        </Typography>

      </CardContent>

    </Card>
            
          </Grid>

        </Grid>
      </Box>
    </div>
    </div>
    
  )
}

