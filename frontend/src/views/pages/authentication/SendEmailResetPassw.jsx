import { useState } from 'react';
//MUI
import { Typography, Box, Button, TextField, Grid } from '@mui/material';
import { Undo } from '@mui/icons-material';
//react-router
import { Link } from 'react-router-dom';
//customs
import GeneralBack from 'components/GeneralBack';
import MessageCard from 'components/MessageCard';
import Spinner from 'components/Spinner';

import caxios from 'scripts/customAxios.js';
import { validRegex } from 'scripts/regex.js';

const SendEmailResetPassw = () => {
  const cax = caxios();
  const [email, setEmail] = useState('');

  const [isLoaded, setIsLoaded] = useState(true);

  const [open, setOpen] = useState(false);
  const [msg, setMsg] = useState(null);
  const [type, setType] = useState(null);

  const handleSendEmail = async () => {
    if (email && email.toLowerCase().match(validRegex)) {
      setIsLoaded(false);
      await cax
        .post('/api/users/sendemail/', { email: email })
        .then((response) => {
          if (response.status === 200) {
            setOpen(true);
            setMsg('Correo Enviado Correctamente');
            setType('success');
            setEmail('');
            setIsLoaded(true);
          }
        })
        .catch((error) => {
          setOpen(true);
          try {
            setMsg(error.response.data?.message[0]);
          } catch (e) {
            setMsg(error.response.data.email[0]);
          }
          setType('error');
          setIsLoaded(true);
        });
    } else {
      setOpen(true);
      setMsg('Ingrese un Correo Electronico Valido');
      setType('error');
    }
  };

  return (
    <GeneralBack title="Restaurar Contraseña">
      {!isLoaded ? (
        <Spinner />
      ) : (
        <Box>
          <Box textAlign={'end'} sx={{ margin: 2 }}>
            <Button variant="contained" component={Link} to="/login" size="medium">
              <Undo />
              <Typography sx={{ margin: 1 }}>Regresar</Typography>
            </Button>
          </Box>

          <Typography variant="h3">Ingresa el Correo Electronico de la Cuenta</Typography>
          <Grid container spacing={2}>
            <Grid item lg={12} xs={12}>
              <Typography variant="body1" align="justify">
                {`Si olvidaste tu contraseña, no te preocupes. Ingresa tu dirección de correo electrónico en el campo a continuación y recibirás un correo con un enlace de recuperación.
                Sigue las instrucciones en el correo para restablecer tu contraseña de forma segura.`}
              </Typography>
            </Grid>
            <Grid item lg={12} xs={12}>
              <Box textAlign={'center'}>
                <TextField
                  fullWidth
                  id="email"
                  type="email"
                  label="Correo Electronico"
                  variant="outlined"
                  value={email}
                  onChange={(e) => {
                    setEmail(e.target.value);
                  }}
                  helperText="Escriba su Correo Electronico"
                />
              </Box>
            </Grid>
            <Grid item lg={12} xs={12}>
              <Box textAlign={'center'}>
                <Button variant="contained" size="medium" onClick={handleSendEmail}>
                  <Typography sx={{ margin: 1 }}>Enviar Correo</Typography>
                </Button>
              </Box>
            </Grid>
          </Grid>
        </Box>
      )}
      <MessageCard open={open} setOpen={setOpen} msg={msg} type={type} />
    </GeneralBack>
  );
};

export default SendEmailResetPassw;
