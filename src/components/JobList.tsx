
import React, { useState } from 'react';
import { Card, CardContent, Typography, Button, Grid, createTheme, Dialog, DialogTitle, DialogContent } from '@mui/material';
import { useAppSelector } from '@/redux/hooks';
import { Postular } from '@/utils/api';

// Definir un tipo para los trabajos

interface Job {
  posicion?: string,
  empresa?: string,
  descripcion: string,
  tags?: string[],
  fecha_publicacion?: string
  _id?: any
}

type JobListProps = {
  jobs: Job[]; // Especifica el tipo de 'jobs'
};
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
      main: '#0B2E88',
    },

    // Otros ajustes de paleta y estilos...
  },
  // Otros ajustes del tema...
});


const JobList = ({ jobs }: JobListProps) => {
  const [expandedIndex, setExpandedIndex] = useState<number | null>(null);
  const handleDetailsClick = (index: number) => {
    setExpandedIndex(expandedIndex === index ? null : index);
  };
  const user = useAppSelector(state => state.user.id)
  const [openDialog, setOpenDialog] = useState(false);
  const handlePostularClick = (offerid: string, id: string) =>
  {
    setOpenDialog(true);
    Postular(offerid,id);
  };
  const handleCloseDialog = () => {
    setOpenDialog(false);
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
                  sx={{backgroundColor: theme.palette.error.main}}
                  variant="contained"
                  color="primary"
                  onClick={() => handleDetailsClick(index)}

                >
                  Ver mas
                </Button>
                <Button sx={{backgroundColor: theme.palette.error.main}}
                  variant="contained"
                  color="primary"
                  onClick={()=>handlePostularClick(job._id,user)}
                >
                  Me interesa
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
        <Dialog open={openDialog} fullWidth maxWidth="sm" onClose={handleCloseDialog} style={{ minWidth: '25%', minHeight: '50%' }}>
        <DialogTitle>Postulación Exitosa</DialogTitle>
        <DialogContent>Tu postulación ha sido registrada exitosamente ;)</DialogContent>
        </Dialog>
    </div>
  );

};

export default JobList;