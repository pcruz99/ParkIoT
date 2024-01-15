import React from 'react';
//MUI
import { Typography, Box, Button, Grid } from '@mui/material';
import { Home } from '@mui/icons-material';
//react-router
import { Link } from 'react-router-dom';
//customs
import GeneralBack from 'components/GeneralBack';

const ErrorRecoveryPassw = () => {
  return (
    <GeneralBack title="Error">
      <Box textAlign={'end'} sx={{ margin: 2 }}>
        <Button variant="contained" component={Link} to="/login" size="medium">
          <Home />
          <Typography sx={{ margin: 1 }}>Inicio</Typography>
        </Button>
      </Box>
      <Typography variant="h3">Error en el enlace de recuperación</Typography>
      <Grid container spacing={2}>
        <Grid item lg={12} xs={12}>
          <Typography variant="body1" align="justify">
            {`Lamentablemente, el enlace de recuperación de contraseña ha expirado. 
        Por favor, vuelve a ingresar en la página de recuperación de contraseña para generar uno nuevo.`}
          </Typography>
        </Grid>
      </Grid>
    </GeneralBack>
  );
};

export default ErrorRecoveryPassw;
