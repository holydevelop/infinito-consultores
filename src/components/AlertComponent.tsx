import { Alert, AlertTitle } from '@mui/material'
import React from 'react'

export const AlertComponent = ({ isError, msg, isOpen }:
  { isError: boolean, msg: string, isOpen: boolean }) => {
  
  if(isOpen){
    return (
      <>
        <Alert severity={isError? "error" : "success"}
          sx={{width: "75vh"}}
        >
          <AlertTitle><b>{isError? "Error" : "Success"}</b></AlertTitle>
          {msg}
        </Alert>
      </>
    )
  }
  
  return
}

export default AlertComponent