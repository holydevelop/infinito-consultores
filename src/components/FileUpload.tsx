import { useAppSelector } from '@/redux/hooks';
import { PostDocument } from '@/utils/api';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import React, { useState } from 'react';

const FileUploadComponent = ({ isEditing, message, updateIframe }: any) => {
  const user = useAppSelector(state => state.user)
  const [fileUploaded, setFileUploaded] = useState(false);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = event.target.files && event.target.files[0];
    if (selectedFile) {
      if (selectedFile.type === 'application/pdf') {
        setFileUploaded(true);
        // Puedes realizar otras acciones aquí si es necesario
      } else {
        alert('Por favor, selecciona un archivo PDF válido.');
      }
    }
  };

  const handleUploadClick = async () => {
    try {
      const fileInput = document.getElementById('fileInput') as HTMLInputElement;
      const file = fileInput.files && fileInput.files[0];

      if (file) {
        if (user.id) {
          const response = await PostDocument(user.id, file);

          if (response.status === 201 || response.status === 200) {
            alert('Archivo subido correctamente');
            updateIframe()
            // Puedes realizar otras acciones después de subir el archivo
          } else {
            alert('Hubo un problema al subir el archivo.');
          }
        } else {
          alert('No se ha seleccionado ningún archivo.');
        }
      }

    } catch (error) {
      console.error('Error al subir el archivo:', error);
      alert('Hubo un problema al subir el archivo.');
    }
  };

  return (
    <>
      {isEditing ?
      (
        <>
          <Typography variant="h6" style={{ fontFamily: 'Quicksand', fontSize: '18px' }}>
            {message}
          </Typography>
          <div style={{ textAlign: 'center' }}>
            <input type="file" id="fileInput" name="file" accept=".pdf" className="centered-input" onChange={handleFileChange} />
            <br />
            {fileUploaded && (
              <Button onClick={handleUploadClick} style={{ marginTop: '10px' }}>
                Actualizar Archivo
              </Button>
            )}
          </div>
        </>
      )
      :
      (
          <Typography variant="h6" style={{ fontFamily: 'Quicksand', fontSize: '18px' }}>
            No hay curriculum adjuntado por el usuario
          </Typography>
          )}
    </>
  );
};

export default FileUploadComponent;

