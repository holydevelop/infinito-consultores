
import React, { useState } from 'react';
import { Card, CardContent, Typography, Button, Grid } from '@mui/material';

// Definir un tipo para los trabajos

interface Job {
  posicion?: string,
  empresa?: string,
  descripcion?: string,
  tags?: string[],
  fecha_publicacion?: string
}

type JobListProps = {
  jobs: Job[]; // Especifica el tipo de 'jobs'
};


const JobList = ({ jobs }: JobListProps) => {
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
                <Button
                  variant="contained"
                  color="primary"
                >
                  Me interesa
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
    </div>
  );

};

export default JobList;