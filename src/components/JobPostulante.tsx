
import React, { useState } from 'react';
import { Card, CardContent, Typography, Button, Grid, createTheme } from '@mui/material';
import { useAppSelector } from '@/redux/hooks';
import { VerPostulantes } from '@/utils/api';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import Profile from '@/app/profile/[id]/page';


// Definir un tipo para los trabajos

interface Job {
  posicion?: string,
  empresa?: string,
  descripcion: string,
  tags?: string[],
  fecha_publicacion?: string
  _id?: any
}
interface User {
  _id: string;
  name: string;
  // Puedes agregar otros campos si es necesario
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

const JobPostulante = ({ jobs }: JobListProps) => {
  const [expandedIndex, setExpandedIndex] = useState<number | null>(null);
  const [openDialog, setOpenDialog] = useState(false);
  const [postulantes, setPostulantes] = useState<User[]>([]);

  const handleDetailsClick = (index: number) => {
    setExpandedIndex(expandedIndex === index ? null : index);
  };

  const handlePostulantesClick = async (offerid: string) => {
    try {
      const response = await VerPostulantes(offerid);
      setPostulantes(response.data);
      setOpenDialog(true);
    } catch (error) {
      console.error('Error fetching postulantes', error);
    }
  };
  const handleProfileClick = (userId: string) => {
    //Profile user id iframe

    // Aquí puedes abrir el iframe con la página del perfil usando alguna lógica específica
    // Puedes utilizar el estado o cualquier otra lógica según tus necesidades.
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
                
              <Button
                sx={{ backgroundColor: theme.palette.error.main }}
                variant="contained"
                color="primary"
                onClick={() => handlePostulantesClick(job._id)}
              >
                Ver Postulantes
              </Button>
              </div>
            </CardContent>
          </Card>
        ))}

      {/* Diálogo para mostrar la lista de postulantes */}
      <Dialog open={openDialog} fullWidth maxWidth="lg" onClose={handleCloseDialog} style={{minWidth:'90%',minHeight:'90vh'}}>
        <DialogTitle>Listado de Postulantes</DialogTitle>
        <DialogContent>
          <List>
            {postulantes.map((user) => (
              <ListItem
                key={user._id}
                button
                onClick={() => handleProfileClick(user._id)}
              >
                <ListItemText primary={user.name} />
              </ListItem>
            ))}
          </List>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog} color="primary">
            Cerrar
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};


export default JobPostulante;