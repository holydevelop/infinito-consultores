import React from 'react';
import { Chip, Typography } from '@mui/material';

type JobTagsProps = {
  tags: string[]; // Asumiendo que las etiquetas son un array de cadenas
  onTagClick: (tag: string | null) => void;
  selectedTag: string | null;
};

const JobTags: React.FC<JobTagsProps> = ({ tags, onTagClick, selectedTag }) => {
  return (
    <div>
      <Typography variant="h6">Etiquetas:</Typography>
      {tags.map((tag, index) => (
        <Chip
          key={index}
          label={tag}
          style={{ margin: '5px' }}
          onClick={() => onTagClick(tag === selectedTag ? null : tag)}
          color={tag === selectedTag ? 'primary' : 'default'}
        />
      ))}
    </div>
  );
};

export default JobTags;


/*import React from 'react';
import { Chip, Typography } from '@mui/material';

type JobTagsProps = {
  tags: string[];
  onTagClick: (tag: string | null) => void;
  selectedTag: string | null;
};

const JobTags: React.FC<JobTagsProps> = ({ tags, onTagClick, selectedTag }) => {
  return (
    <div>
      <Typography variant="h6">Etiquetas:</Typography>
      {tags.map((tag, index) => (
        <Chip
          key={index}
          label={tag}
          style={{ margin: '5px' }}
          onClick={() => onTagClick(tag === selectedTag ? null : tag)} // Aquí manejamos null o la etiqueta seleccionada
          color={tag === selectedTag ? 'primary' : 'default'} // Cambia el color si la etiqueta está seleccionada
        />
      ))}
    </div>
  );
};

export default JobTags;
*/