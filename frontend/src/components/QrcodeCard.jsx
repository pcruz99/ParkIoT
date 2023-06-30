import React from 'react';
import { Box } from '@mui/material';
const QrcodeCard = ({ qrcode }) => {
  return (
    <>
      <Box
        component="img"
        sx={{
          height: {
            xs: 280,
            md: 400,
            xl: 450
          },
          width: {
            xs: 280,
            md: 400,
            xl: 450
          }
        }}
        src={`data:image/png;base64,${qrcode}`}
        alt='Codigo QR con Informacion del Usuario'
      />      
    </>
  );
};

export default QrcodeCard;
