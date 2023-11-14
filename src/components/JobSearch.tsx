import React, { useState, KeyboardEvent } from 'react';
import { TextField, Button } from '@mui/material';

type JobSearchProps = {
  onSearch: (searchTerm: string) => void;
};

const JobSearch = ({ onSearch }: JobSearchProps) => {
  const [searchTerm, setSearchTerm] = useState('');

  const handleSearch = () => {
    onSearch(searchTerm);
  };

  const handleKeyPress = (event: KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter') {
      onSearch(searchTerm);
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
      <Button variant="contained" color="primary" onClick={handleSearch}>
        Buscar
      </Button>
    </div>
  );
};

export default JobSearch;
