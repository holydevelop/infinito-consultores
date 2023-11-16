'use client'

import * as React from 'react';
import { useState } from 'react';
import { Card, Container, Grid, Typography, Button, createTheme, Tabs, Tab } from '@mui/material';
import JobSearch from '../../components/JobSearch';
import JobTags from '../../components/JobTags';
import JobList from '../../components/JobList';
import HomeIcon from '@mui/icons-material/Home';
import { useSession } from 'next-auth/react';
import { useAppSelector } from '@/redux/hooks';
import { JobWall } from '@/utils/job';
import Axios from "axios";
import { useRouter } from 'next/navigation';
import { GetJobApi, registerInteres } from '@/utils/api';
import Loading from '@/components/Loading';

// TODO remove, this demo shouldn't need to reset the theme.
const defaultTheme = createTheme();

interface Job {
  id: string,
  posicion?: string;
  empresa?: string;
  descripcion?: string,
  tags?: string[],
  fecha_publicacion?: string
}


export default function JobsPage({ params }: { params: { id: string } }) {

  //Carga del user state
  const user = useAppSelector(state => state.user)

  //Carga de informacion
  const [jobs, setJobs]: [Job[] | null, any] = useState<Job[] | null>(null);

  //Estado para controlar me boton me interesa
  const [interestState, setInterestState] = useState<{ [jobId: string]: boolean }>({});

  //const para la division de las paginas
  const [tab, setTab] = useState<number>(0);

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

  //configuracion para el me interesa
  const handleInterestClick = async (jobId: string) => {
    try {
      // Realiza la función mejorada que maneja vinculación y desvinculación
      await registerInteres(user.id, jobId);

      // Actualiza el estado de interés después de la acción
      setInterestState(prevState => ({ ...prevState, [jobId]: !prevState[jobId] }));
    } catch (error) {
      console.error('Error al gestionar interés:', error);
    }
  };


  //funcion async que procesa la carga de los trabajos
  async function loadJobs() {
    try {
      const response = await GetJobApi();
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
    loadJobs();
  }, [searchTerm, selectedTag])


  // const para las paginas con la data filtrada
  const jobsPerPage = 10;

  const totalJobs = filteredJobs?.length || 0;
  const totalPages = Math.ceil(totalJobs / jobsPerPage);

  const handleChangeTab = (event: React.ChangeEvent<{}>, newValue: number) => {
    setTab(newValue);
  };

  const startIndex = tab * jobsPerPage;
  const endIndex = startIndex + jobsPerPage;
  const displayedJobs = filteredJobs?.slice(startIndex, endIndex) || [];

  if (isLoading) {
    return (<Loading isLoading={isLoading} />)

  }


  return (
    <div>
      <Container>
        <Typography variant="h4">Búsqueda de Trabajos</Typography>
        
        {/* Contenido de pestañas */}
        {filteredJobs && filteredJobs.length > 0 ? (
          <Grid container spacing={3}>
            <Grid item xs={12} md={4}>
              <JobSearch onSearch={handleSearch} />
              <JobTags tags={allTags} onTagClick={handleTagClick} selectedTag={selectedTag} />
            </Grid>
            <Grid item xs={12} md={8}>
              {displayedJobs && (
                <JobList
                  jobs={displayedJobs}
                  handleInterestClick={handleInterestClick}
                  interestState={interestState}
                />
              )}
              <Button
                variant="contained"
                color="primary"
                sx={{ backgroundColor: "0B3299" }}
                href="/"
                style={{
                  position: 'absolute',
                  top: 10,
                  left: 10,
                }}
              >
                <HomeIcon />
                Home
              </Button>
            </Grid>
          </Grid>
        ) : (
          <Typography>No hay trabajos para mostrar.</Typography>
        )}

        {/* Lógica para agregar una nueva página al llegar al límite */}
        {totalPages > 1 && (
          <Tabs value={tab} onChange={handleChangeTab} centered>
            {[...Array(totalPages)].map((_, index) => (
              <Tab key={index} label={`Página ${index + 1}`} />
            ))}
          </Tabs>
        )}
      </Container>
    </div>
  );
}
