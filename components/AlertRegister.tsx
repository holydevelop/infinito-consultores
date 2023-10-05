import React from 'react';
import Dialog from '@mui/material/Dialog';
import { Alert, Button } from '@mui/material';

import { useRouter } from 'next/router';

function DialogRegister({ isDialogOpen, handleClose, validations, alertType }: any) {
  
  const router = useRouter()
  const redirectToAnotherPage = () => {
    router.push('/'); // Reemplaza '/ruta-de-destino' con la URL a la que deseas redirigir.
  };

  return (
    <div>
      <Dialog open={isDialogOpen}>
        {
          !alertType ?
            <Alert severity="error" >
              <h1>Error al crear la cuenta</h1>
              <p>Verifique los campos al crear la cuenta y complete
                cada uno de ellos, a continuacion se encontraron los siguientes errores:
              </p>
              <ul>
                {Object.keys(validations).map((fieldName) => (
                  <li key={fieldName}>{validations[fieldName]}</li>
                ))}
              </ul>
              <Button onClick={handleClose}>Cerrar</Button>
            </Alert>
            :
            <Alert severity="success" >
              <h1>Cuenta creada satisfactoriamente</h1>
              <p>La cuenta ha sido creada con exito, gracias por confiar en nosotros</p>
              <Button onClick={redirectToAnotherPage}>Continuar</Button>
            </Alert>
        }
      </Dialog>
    </div>
  );
}

export default DialogRegister;
