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
import CheckIcon from '@mui/icons-material/Check';
import PsychologyIcon from '@mui/icons-material/Psychology';
import backgroundImage from "../../public/slider_01.jpg";
import backgroundImage2 from "../../public/bb1.jpg";
import backgroundImage3 from "../../public/banner_azul-1.jpg";
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
     
      <div className="container"  >
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
    <Box  component="section" style={{backgroundColor:theme.palette.background.default, minHeight: '30vh', backgroundImage: `url(${backgroundImage.src})`,
        // other styles
        backgroundPosition: "center",
        backgroundSize: "stretch",
        backgroundRepeat: "no-repeat"}} >
        {/* Grid container */}
        <Grid container spacing={4} justifyContent="center" alignItems={'center'} style={{backgroundColor:theme.palette.primary.dark, opacity:'89%', minHeight:'65vh'}}>
          {/* Primer servicio */}
          <Grid item xs={12} sm={1} md={3}>
          <Card style={{backgroundColor:theme.palette.background.default,height:'60%',width:'100%'}}>
      <CardContent>
        <AccountCircleIcon  style={{color:theme.palette.success.main ,textAlign:'center', fontSize:'70px',display:'block'}}></AccountCircleIcon>
        <Typography style={{ fontFamily: 'Montserrat', fontSize: '22px',fontStyle:'bold',letterSpacing:'1px', textAlign:'center' }} >
        Reclutamiento de profesionales        </Typography>
        <Typography style={{ fontFamily: 'Montserrat', fontSize: '16px',textAlign:'justify',fontStretch:'100%' }}>
        Nuestras búsquedas y posterior selección de profesionales, están orientadas a realizar una evaluación
                minuciosa del personal, cumpliendo con los requerimientos exigidos por nuestro cliente, enfocándonos no
                sólo en el perfil técnico, sino que también con las habilidades blandas.
        </Typography>

      </CardContent>

    </Card>
          </Grid>

          {/* Segundo servicio */}
          <Grid item xs={12} sm={1} md={3}>
          <Card style={{backgroundColor:theme.palette.background.default,height:'60%',width:'100%'}}>
      <CardContent>
      <BusinessCenterIcon color="secondary" style={{color:theme.palette.success.main ,textAlign:'center', fontSize:'70px',display:'block'}}></BusinessCenterIcon>

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
          <Card style={{backgroundColor:theme.palette.background.default,height:'60%',width:'100%'}}>
      <CardContent>
      <PsychologyIcon color="secondary" style={{color:theme.palette.success.main ,textAlign:'center', fontSize:'70px',display:'block'}}></PsychologyIcon>

        <Typography style={{ fontFamily: 'Montserrat', fontSize: '22px',fontStyle:'bold',letterSpacing:'1px', textAlign:'center' }} >
        Evaluaciones Psicolaborales     </Typography>
        <Typography style={{ fontFamily: 'Montserrat', fontSize: '16px',textAlign:'justify' }}>
        Este Servicio es un conjunto de técnicas utilizadas para conocer rasgos ocultos del candidato que no puedes ser determinados en una entrevista personal. Se utiliza para determinar si el candidato es psicológicamente apto para el cargo al que postula.
        </Typography>

      </CardContent>

    </Card>
            
          </Grid>
          <Grid item xs={12} sm={1} md={3}>
          <Card style={{backgroundColor:theme.palette.background.default,height:'60%',width:'100%'}}>
      <CardContent>
        <CheckIcon  style={{color:theme.palette.success.main ,textAlign:'center', fontSize:'70px',display:'block'}}></CheckIcon>

        <Typography style={{ fontFamily: 'Montserrat', fontSize: '22px',fontStyle:'bold',letterSpacing:'1px', textAlign:'center' }} >
        Verificación de Referencias    </Typography>
        <Typography style={{ fontFamily: 'Montserrat', fontSize: '16px',textAlign:'justify',fontStretch:'100%' }}>
        La verificación de referencias laborales pretende recoger información, más allá de la proporcionada por el propio candidato, a fin de recopilar más antecedentes o revelar inconsistencias. Tiene como propósito evaluar aspectos valóricos y éticos del candidato.
        </Typography>

      </CardContent>

    </Card>
          </Grid>

        </Grid>
      </Box>


      <div>
        <Box component="section" style={{backgroundColor:theme.palette.primary.main, opacity:'85%', minHeight: '30vh',backgroundImage: `url(${backgroundImage3.src})`,backgroundPosition: "center",
        backgroundSize: "cover",
        width:'100%',
        backgroundRepeat: "no-repeat",
        alignItems:'center',justifyContent:'center',        display: 'flex',}}>
          <Typography style={{color:'#FFFFFF', fontFamily: 'Montserrat', fontSize: '95px',fontStyle:'bold',letterSpacing:'10px' }}>
Sobre Nosotros          </Typography></Box></div>
      <div>
      <Box component="section" style={{backgroundColor:theme.palette.background.default, minHeight: '100vh',opacity:'90%', backgroundImage: `url(${backgroundImage2.src})`,
        // other styles
        alignItems:'center',justifyContent:'center',
        backgroundPosition: "center",
        backgroundSize: "cover",
        backgroundRepeat: "no-repeat",
        display: 'flex',}}>
          <Grid  container  justifyContent="center" alignItems={'center'} style={{backgroundColor:theme.palette.background.default, opacity:'80%',  minHeight: '100vh'}}>
            <Card style={{backgroundColor:'#080705',minHeight:'90vh',width:'96%'}}>
              
            <Typography style={{ color:'#FFFFFF',fontFamily: 'Montserrat', fontSize: '58px',fontStyle:'bold',letterSpacing:'5px', textAlign:'center' }} >
          Infinito Consultores    </Typography>
          <CardContent style={{justifyContent:'center',alignContent:'center',alignItems:'center'}}>
          <Typography style={{ color:'#FFFFFF',fontFamily: 'Montserrat', fontSize: '32px',fontStyle:'bold' }}>
          Reclutalento es una división de la empresa Infinito Consultores, dedicada a la búsqueda laboral más simple para nuestros clientes, tanto reclutadores como postulantes a trabajos, está enfocado en brindar una postulación rápida y sencilla. </Typography>
          <Typography style={{ color:'#FFFFFF',fontFamily: 'Montserrat', fontSize: '32px',fontStyle:'bold' }}>
Nos especializamos en la búsqueda y selección de profesionales poniendo como prioridad los intereses de la empresa y la confidencialidad del proceso de postulación y de los datos del postulante. Brindamos evaluaciones psicológicas para diversas áreas, eligiendo al candidato ideal para el ambiente y contexto en el que se desempeñará. Otra de nuestras capacidades es el Head Hunting, es decir, una búsqueda especializada de algún profesional altamente especializado para la tarea que ha de desempeñar en su nuevo ambiente laboral.
</Typography>
<Typography style={{ color:'#FFFFFF',fontFamily: 'Montserrat', fontSize: '32px',fontStyle:'bold' }}>
Además, en Reclutalento nos esforzamos por mantenernos a la vanguardia de las tendencias en el mercado laboral, utilizando tecnologías innovadoras y estrategias de reclutamiento avanzadas. 
</Typography>





          </CardContent></Card></Grid>
            
             
          
  
          
  
        </Box>
      </div>
    </div>
    </div>
    
  )
}

