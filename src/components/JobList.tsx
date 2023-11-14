
import React, { useState } from 'react';
import { Card, CardContent, Typography, Button } from '@mui/material';

// Definir un tipo para los trabajos

interface Job {
  posicion?: string,
  empresa?: string,
  descripcion?: string,
  tags?: string,
}

type JobListProps = {
    jobs: Job[]; // Especifica el tipo de 'jobs'
};


const JobList = ({ jobs}:JobListProps) => {
  const [expandedIndex, setExpandedIndex] = useState<number | null>(null);
  const handleDetailsClick = (index: number) => {
    setExpandedIndex(expandedIndex === index ? null : index);
  };




  return (
    <div>
      {jobs &&
        jobs.map((job, index) => (
          <Card key={index} style={{ marginBottom: '10px' }}>
            <CardContent>
              <Typography variant="h5">{job.posicion}</Typography>
              <Typography variant="subtitle1">{job.empresa}</Typography>
              <Typography variant="body1">{job.descripcion}</Typography>
              {expandedIndex === index ? (
                <Typography variant="body1">{job.tags}</Typography>
              ) : null}
              <Button
                variant="contained"
                color="primary"
                onClick={() => handleDetailsClick(index)}
              >
                Me interesa
              </Button>
            </CardContent>
          </Card>
        ))}
    </div>
  );

  /*
  return (
    <div>
      {jobs.map((job, index) => (
        <Card key={index} style={{ marginBottom: '10px' }}>
          <CardContent>
            <Typography variant="h5">{job.posicion}</Typography>
            <Typography variant="subtitle1">{job.empresa}</Typography>
            <Typography variant="body1">{job.descripcion}</Typography>
            {expandedIndex === index ? (
              <Typography variant="body1">{job.tags}</Typography>
            ) : null}
            <Button
              variant="contained"
              color="primary"
              onClick={() => handleDetailsClick(index)}
            >
              Ver Más
            </Button>
          </CardContent>
        </Card>
            ))}
    </div>
  );*/
};

export default JobList;