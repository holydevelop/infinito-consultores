import React, { useState, KeyboardEvent } from 'react';
import { TextField, Button, createTheme } from '@mui/material';

type JobSearchProps = {
  onSearch: (searchTerm: string) => void;
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

const JobSearch = ({ onSearch }: JobSearchProps) => {
  const [searchTerm, setSearchTerm] = useState('');

  const handleSearch = () => {
    onSearch(searchTerm);
    //setSearchTerm(''); // Limpiar la búsqueda después de realizarla
  };

  const handleKeyPress = (event: KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter') {
      onSearch(searchTerm);
      //setSearchTerm(''); 
    }
  };

  return (
    <div>
      <TextField
        label="Buscar trabajos"
        variant="outlined"
        fullWidth
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        onKeyPress={handleKeyPress}
      />
      <Button sx={{backgroundColor: theme.palette.error.main}} variant="contained" color="primary" onClick={handleSearch}>
        Buscar
      </Button>
    </div>
  );
};

export default JobSearch;
