"use client"

import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';

export default function App() {
  return (
    <div>
      <Grid item>
        <Button variant="contained" color="primary" href={`/proposal`} sx={{ backgroundColor: "0B3299" }}>
          Propuesta
        </Button>
        <Button variant="contained" color="primary" href={`/jobs`} sx={{ backgroundColor: "0B3299" }}>
          Trabajos
        </Button>
      </Grid>
    </div>
  )
}
