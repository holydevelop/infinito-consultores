'use client'

import * as React from 'react';
import { useState } from 'react';
import { Card, Container, Grid, Typography, Button, createTheme } from '@mui/material';
import JobSearch from '../../components/JobSearch';
import JobTags from '../../components/JobTags';
import JobList from '../../components/JobList';
import HomeIcon from '@mui/icons-material/Home';
import { useSession } from 'next-auth/react';
import { useAppSelector } from '@/redux/hooks';
import { JobWall } from '@/utils/job';
import Axios from "axios";
import { useRouter } from 'next/navigation';
import { GetJobApi } from '@/utils/api';
import Loading from '@/components/Loading';

// TODO remove, this demo shouldn't need to reset the theme.
const defaultTheme = createTheme();

interface Job {
  posicion?: string;
  empresa?: string;
  descripcion?: string,
  tags?: string,
}


export default function JobsPage({ params }: { params: { id: string } }) {
  //Carga la actualizacion
  const { data: session, update } = useSession()
  //Carga del user state
  const user = useAppSelector(state => state.user)

  //Carga de informacion
  const [jobs, setJobs]: [Job[] | null, any] = useState<Job[] | null>(null);

  const [searchTerm, setSearchTerm] = useState('');

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

  const [selectedTag, setSelectedTag] = useState<string | null>(null);
  const [filteredJobs, setFilteredJobs] = useState<Job[] | null>(null);

  const router = useRouter()

  const handleTagClick = (tag: string | null) => {
    setSelectedTag(tag);
  };

  const handleSearch = (term: string) => {
    setSearchTerm(term);
  };

  async function loadJobs() {
    try {
      const response = await GetJobApi();
      const allJobs: Job[] = response.data;
  
      setJobs(allJobs); // Actualiza los trabajos obtenidos
  
      if (searchTerm.trim() !== '') {
        const filtered = allJobs.filter(job => {
          return (
            job.posicion?.toLowerCase().includes(searchTerm.toLowerCase()) ||
            job.empresa?.toLowerCase().includes(searchTerm.toLowerCase()) ||
            job.descripcion?.toLowerCase().includes(searchTerm.toLowerCase()) ||
            (job.tags && job.tags.toLowerCase().includes(searchTerm.toLowerCase()))
          );
        });
        setFilteredJobs(filtered); // Guarda los resultados filtrados
        
      } else {
        setFilteredJobs(allJobs);
      }
    } catch (error) {
      console.error('Error en la solicitud:', error);
    }
    setIsLoading(false)
  }




  React.useEffect(() => {
    loadJobs();
  }, [searchTerm])

  const filteredTags = jobs?.filter(job => !selectedTag || job.tags?.includes(selectedTag));

  if (isLoading){
    return(<Loading isLoading={isLoading}/>)

  }
  return (
    <div >
      <Container>
        <Typography variant="h4">Búsqueda de Trabajos</Typography>
        <Grid container spacing={3}>
          <Grid item xs={12} md={4}>
            <JobSearch onSearch={handleSearch} />
            <JobTags tags={allTags} onTagClick={handleTagClick} selectedTag={selectedTag} />
          </Grid>
          <Grid item xs={12} md={8}>
            <div>
            {filteredJobs && <JobList jobs={filteredJobs} />}
              <Button variant="contained" color="primary" sx={{ backgroundColor: "0B3299" }} href="/"
                style={{
                  position: 'absolute',
                  top: 10, // Ajusta la posición superior según tu diseño
                  left: 10, // Ajusta la posición derecha según tu diseño
                }}>
                <HomeIcon />
                      Home
              </Button>
            </div>
          </Grid>
        </Grid>
      </Container>
    </div>
  );

};















