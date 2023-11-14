import * as React from 'react';
import Backdrop from '@mui/material/Backdrop';
import CircularProgress from '@mui/material/CircularProgress';

export default function Loading({ isLoading }: any) {
  return (
    <div>
      <Backdrop
        sx={{ color: '#fff' }}
        open={isLoading}
      >
        <CircularProgress color="inherit" />
      </Backdrop>
    </div>
  );
}