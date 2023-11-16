
import React, { useState } from 'react';
import { Card, CardContent, Typography, Button, Grid } from '@mui/material';

// Definir un tipo para los trabajos

interface Job {
  id: string,
  posicion?: string,
  empresa?: string,
  descripcion?: string,
  tags?: string[],
  fecha_publicacion?: string
}

type JobListProps = {
  jobs: Job[]; // Especifica el tipo de 'jobs'
  handleInterestClick: (jobId: string) => void; // Nueva prop para la función de interés
  interestState: { [jobId: string]: boolean };
};


const JobList = ({ jobs, handleInterestClick, interestState }: JobListProps) => {
  const [expandedIndex, setExpandedIndex] = useState<number | null>(null);

  const handleDetailsClick = (index: number) => {
    setExpandedIndex(expandedIndex === index ? null : index);
 };


 const handleInterest = async (jobId: string) => {
  try {
    await handleInterestClick(jobId);
  } catch (error) {
    console.error('Error al gestionar interés:', error);
  }
};

  return (
    <div>
      {jobs &&
        jobs.map((job, index) => (
          <Card key={index} style={{ marginBottom: '10px' }}>
            <CardContent>
              <Typography variant="h5">{job.posicion}</Typography>
              <Typography variant="subtitle1">{job.empresa}</Typography>
              {expandedIndex === index ? (
                <Typography variant="body1">{job.descripcion}</Typography>
              ) : null}
              <Typography variant="body1">{job.fecha_publicacion}</Typography>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <Button
                  variant="contained"
                  color="primary"
                  onClick={() => handleDetailsClick(index)}
                >
                  Ver mas
                </Button>
                {/*<Button
                  variant="contained"
                  color="primary"
                  onClick={() => handleInterestClick(job.id)} // Invoca la función de interés con el jobId
                >
                   {interestState[job.id] ? 'Ya no me interesa' : 'Me interesa'}
                </Button>*/}
              </div>
            </CardContent>
          </Card>
        ))}
    </div>
  );

};

export default JobList;