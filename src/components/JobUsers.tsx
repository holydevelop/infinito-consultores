import React, { useState } from 'react';
import { Card, CardContent, Typography, Button, Dialog, DialogTitle, DialogContent, DialogActions, CircularProgress, IconButton, createTheme } from '@mui/material';
import { useAppSelector } from '@/redux/hooks';
import { Estado, Cancelar_Postulacion } from '@/utils/api';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import HighlightOffIcon from '@mui/icons-material/HighlightOff';
import WarningIcon from '@mui/icons-material/Warning';
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


const JobUsers = ({ jobs }: JobListProps) => {
  const [expandedIndex, setExpandedIndex] = useState<number | null>(null);
  const [loading, setLoading] = useState(false);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [confirmationDialogOpen, setConfirmationDialogOpen] = useState(false);
  const [estado, setEstado] = useState<string>('');
  const [colorEstado, setColorEstado] = useState<string>('');
  const [iconoEstado, setIconoEstado] = useState<React.ReactNode | null>(null);
  var postul:string='null';

  const handleDetailsClick = (index: number) => {
    setExpandedIndex(expandedIndex === index ? null : index);
  };
  const user = useAppSelector(state => state.user.id)
  const handleStatusClick = async (offerid: string, id: string) => {
    try {
      setLoading(true);
      const estadoResponse = await Estado(offerid, id);
      postul=offerid
      abrirDialogo(estadoResponse.data.estado);
    } catch (error) {
      console.error('Error al obtener el estado:', error);
    } finally {
      setLoading(false);
    }
  };
  const abrirDialogo = (postulacion: string) => {
    setEstado(postulacion);

    // Lógica para determinar el color e ícono según el estado
    let icono, color;
    switch (postulacion) {
      case 'Pendiente':
        icono = <WarningIcon />;
        color = '#FFD972';
        break;
      case 'Aceptada':
        icono = <CheckCircleOutlineIcon />;
        color = 'green';
        break;
      case 'Rechazada':
        icono = <HighlightOffIcon />;
        color = 'red';
        break;
      default:
        icono = null;
        color = 'black';
    }

    setIconoEstado(icono);
    setColorEstado(color);
    setDialogOpen(true);
  };

  const handleDialogClose = () => {
    setDialogOpen(false);
  };

  const handleConfirmationDialogOpen = () => {
    setConfirmationDialogOpen(true);
  };

  const handleConfirmationDialogClose = () => {
    setConfirmationDialogOpen(false);
  };

  const handleCancelarPostulacion = async (offerid:string,id:string) => {
    try {
      setLoading(true);
      // Lógica para cancelar la postulación
      await Cancelar_Postulacion(offerid,id);
      // Cerrar el diálogo de confirmación
      handleConfirmationDialogClose();
      // Actualizar el estado y el diálogo principal
      setEstado('Cancelada');
      setColorEstado('grey');
      setIconoEstado(null);
      setDialogOpen(true);
    } catch (error) {
      console.error('Error al cancelar la postulación:', error);
    } finally {
      setLoading(false);
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
                  sx={{ backgroundColor: theme.palette.error.main }}
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
                  onClick={() => handleStatusClick(job._id, user)}
                >
                  Administrar Solicitud
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}

      <Dialog open={loading}>
        <DialogContent>
          <CircularProgress />
        </DialogContent>
      </Dialog>

      <Dialog open={dialogOpen} onClose={handleDialogClose}>
        <DialogTitle>Estado de la Postulación</DialogTitle>
        <DialogContent>
          
          <Typography variant="body1">{`Estado: ${estado}`}<IconButton style={{ color: colorEstado }}>{iconoEstado}</IconButton></Typography>
          {estado !== 'Cancelada' && (
            <Button onClick={handleConfirmationDialogOpen}>Cancelar Postulación</Button>
          )}
        </DialogContent>
      </Dialog>

      <Dialog open={confirmationDialogOpen} onClose={handleConfirmationDialogClose}>
        <DialogTitle>Confirmar Cancelación</DialogTitle>
        <DialogContent>
          <Typography variant="body1">¿Estás seguro de que quieres cancelar la postulación?</Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleConfirmationDialogClose}>No</Button>
          <Button onClick={()=>handleCancelarPostulacion(postul,user)} autoFocus>
            Sí
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default JobUsers;