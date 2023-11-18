'use client'
import "../styles.css"
import * as React from 'react';
import { useState } from 'react';
import { Card, Container, Grid, Typography, Button, createTheme, Tabs, Tab } from '@mui/material';
import JobSearch from '../../components/JobSearch';
import JobTags from '../../components/JobTags';
import JobPostulante from '../../components/JobPostulante';
import HomeIcon from '@mui/icons-material/Home';
import { useSession } from 'next-auth/react';
import { useAppDispatch, useAppSelector } from '@/redux/hooks';
import { JobWall } from '@/utils/job';
import Axios from "axios";
import { useRouter } from 'next/navigation';
import { GetJobsPublished } from '@/utils/api';
import Loading from '@/components/Loading';
import { setTrueStatus } from '@/redux/features/navStatusSlice';
import NavBar from '@/components/Navbar';

// TODO remove, this demo shouldn't need to reset the theme.
const defaultTheme = createTheme({
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
interface Job {
  posicion?: string,
  empresa?: string,
  descripcion: string,
  tags?: string[],
  fecha_publicacion?: string
  _id?: any
}


export default function JobsPage({ params }: { params: { id: string } }) {
  //Carga la actualizacion
  //const { data: session, update } = useSession()
  const dispatch = useAppDispatch();
  dispatch(setTrueStatus())
  //Carga del user state
  const id =useAppSelector(state => state.user.id)
  const user = useAppSelector(state => state.user)

  //Carga de informacion
  const [jobs, setJobs]: [Job[] | null, any] = useState<Job[] | null>(null);

  //const para la division de las paginas
  const [tab, setTab] = useState<number>(0);
  const handleChangeTab = (event: React.ChangeEvent<{}>, newValue: number) => {
    setTab(newValue);
  };


  //relacionado a la busqueda de terminos
  const [searchTerm, setSearchTerm] = useState('');
  const [searchResults, setSearchResults] = useState<Job[] | null>(null);

  //Partes de la carga
  const [isLoading, setIsLoading] = useState(true)

  //partes para seleccionar una tag o buscar una palabra
  const allTags: string[] = jobs
    ? jobs.reduce((acc: string[], job) => {
      if (job.tags) {
        const tags = Array.isArray(job.tags) ? job.tags : [job.tags];
        tags.forEach(tag => {
          if (!acc.includes(tag)) {
            acc.push(tag);
          }
        });
      }
      return acc;
    }, [])
    : [];
  //filtros para las etiquetas
  const [selectedTag, setSelectedTag] = useState<string | null>(null);
  const [filteredJobs, setFilteredJobs] = useState<Job[] | null>(null);

  const router = useRouter()

  //funcion de click para las etiquetas
  const handleTagClick = (tag: string | null) => {
    if (tag === selectedTag) {
      // Si se hace clic en la etiqueta seleccionada nuevamente, desmarcarla
      setSelectedTag(null);
      setSearchResults(null); // Limpiar resultados de la búsqueda cuando se desmarca la etiqueta
      setFilteredJobs(jobs); // Mostrar todos los trabajos nuevamente
    } else {
      // Filtra los trabajos según la etiqueta seleccionada
      setSelectedTag(tag || null); // Asegurar que tag sea siempre un string
      const filtered = jobs?.filter(job => job.tags && job.tags.includes(tag || '')) || [];
      setFilteredJobs(filtered);
      setSearchResults(null); // Limpiar resultados de la búsqueda cuando se selecciona una nueva etiqueta
    }
  };

  /*
  const handleTagClick = (tag: string | null) => {
    setSelectedTag(tag);
  };*/

  //funcion para buscar en base al buscador
  const handleSearch = (term: string) => {
    setSearchTerm(term);

    if (term.trim() !== '') {
      // Filtra los trabajos según el término de búsqueda
      const filtered = jobs?.filter(job => {
        return (
          job.posicion?.toLowerCase().includes(term.toLowerCase()) ||
          job.empresa?.toLowerCase().includes(term.toLowerCase()) ||
          job.descripcion?.toLowerCase().includes(term.toLowerCase()) ||
          (job.tags && job.tags.some(tag => tag.toLowerCase().includes(term.toLowerCase())))
        );
      }) || [];
      setSearchResults(filtered); // Almacena los resultados de la búsqueda
      setFilteredJobs(filtered);
    } else {
      // Si el término de búsqueda está vacío, muestra todos los trabajos
      setSearchResults(null); // Limpia los resultados de la búsqueda
      setFilteredJobs(jobs);
    }
  };

  //funcion async que procesa la carga de los trabajos
  async function loadJobs(id: string) {
    try {
      const response = await GetJobsPublished(id);
      const allJobs: Job[] = response.data;

      setJobs(allJobs);

      // Utiliza los resultados de búsqueda si existen, de lo contrario, usa los resultados de la etiqueta seleccionada
      const resultsToUse = searchResults || (selectedTag ? allJobs.filter(job => job.tags && job.tags.includes(selectedTag)) : allJobs);
      setFilteredJobs(resultsToUse);
    } catch (error) {
      console.error('Error en la solicitud:', error);
    }
    setIsLoading(false);
  }
    //use effect
  React.useEffect(() => {
    if (id){loadJobs(id);}
    
  }, [id,searchTerm, selectedTag])

  //const para las paginas con la data filtrada
  const jobsPerPage = 20;
  const startIndex = tab * jobsPerPage;
  const endIndex = startIndex + jobsPerPage;
  const displayedJobs = filteredJobs?.slice(startIndex, endIndex) || [];

  //const filteredTags = jobs?.filter(job => !selectedTag || job.tags?.includes(selectedTag));

  if (isLoading) {
    return (<Loading isLoading={isLoading} />)

  }


  return (
    
    <div>
        <NavBar></NavBar>
      <Container style={{backgroundColor:defaultTheme.palette.background.default,minWidth:'100%',minHeight:'100vh'}}>
      <Typography style={{ textAlign:'center',fontFamily: 'Montserrat', fontSize: '36px',fontStyle:'bold',letterSpacing:'1px' }} variant="h4">Trabajos Publicados</Typography>

        {/* Pestañas */}
        <Tabs value={0} onChange={handleChangeTab} centered>
        <Tab label="Página 1" style={{fontSize:'18px'}} />
        </Tabs>

        {/* Contenido de pestañas */}
        {filteredJobs && filteredJobs.length > 0 ? (
          <Grid container spacing={3}>
            <Grid item xs={12} md={4}>
              <JobSearch onSearch={handleSearch} />
              <JobTags tags={allTags} onTagClick={handleTagClick} selectedTag={selectedTag} />
            </Grid>
            <Grid item xs={12} md={8}>
              {displayedJobs && <JobPostulante jobs={displayedJobs} />}
            </Grid>
          </Grid>
        ) : (
          <Typography>No hay trabajos para mostrar.</Typography>
        )}

        {/* Lógica para agregar una nueva página al llegar al límite */}
        {filteredJobs && filteredJobs.length > 0 && filteredJobs.length % jobsPerPage === 0 && (
          <Tabs value={tab + 1} onChange={handleChangeTab} centered>
            <Tab label={`Página ${tab + 2}`} />
          </Tabs>
        )}
      </Container>
    </div>
  );


 
};















