"use client"

import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';
import { setTrueStatus } from '@/redux/features/navStatusSlice';
import { useAppDispatch } from '@/redux/hooks';
import Navbar from '@/components/Navbar';

export default function App() {

  const dispatch = useAppDispatch();
  dispatch(setTrueStatus())

  return (
    <div>
      <Navbar />
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
