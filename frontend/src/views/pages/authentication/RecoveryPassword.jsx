//React
import { useState, useEffect } from 'react';

//react-router
import { useNavigate } from 'react-router-dom';
import { useParams } from 'react-router-dom';

//Libreria de Terceros
import * as Yup from 'yup';
import { Formik } from 'formik';

//MUI
import {
  Typography,
  Box,
  Button,
  Grid,
  OutlinedInput,
  InputLabel,
  FormControl,
  FormHelperText,
  IconButton,
  InputAdornment
} from '@mui/material';
// assets
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';

//customs
import { strengthColor, strengthIndicator } from 'utils/password-strength';

import GeneralBack from 'components/GeneralBack';
import MessageCard from 'components/MessageCard';

import caxios from 'scripts/customAxios.js';

const RecoveryPassword = () => {
  const cax = caxios();
  const navigate = useNavigate();

  const { token } = useParams();

  const [showPassword1, setShowPassword1] = useState(false);
  const [showPassword2, setShowPassword2] = useState(false);

  const [strength, setStrength] = useState(0);
  const [level, setLevel] = useState();

  const [open, setOpen] = useState(false);
  const [msg, setMsg] = useState(null);
  const [type, setType] = useState(null);

  useEffect(() => {
    cax
      .get(`/api/users/checkrecovery/${token}/`)
      .then((response) => {
        if (response.status === 200) {
          setOpen(true);
          setMsg('Enlace de Recuperación Correcto');
          setType('success');
        }
      })
      .catch(() => {
        navigate('/errorrecoverypassword');
      });
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  const handleClickShowPassword1 = () => {
    setShowPassword1(!showPassword1);
  };

  const handleClickShowPassword2 = () => {
    setShowPassword2(!showPassword2);
  };

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  const changePassword = (value) => {
    const temp = strengthIndicator(value);
    setStrength(temp);
    setLevel(strengthColor(temp));
  };

  const handleSamePassword = (value, value2) => {
    if (value !== value2) {
      setOpen(true);
      setMsg('Las contraseñas no coinciden');
      setType('error');
    } else {
      setOpen(false);
    }
  };

  return (
    <GeneralBack title="Restaurar Contraseña">
      <Typography variant="h3">Ingresa tu Nueva Contraseña</Typography>
      <Grid container spacing={2}>
        <Grid item lg={12} xs={12}>
          <Typography variant="body1" align="justify">
            {`Para garantizar la seguridad de tu cuenta, por favor, ingresa tu nueva contraseña en los campos a continuación. 
            Es importante que ingreses la misma contraseña en ambos campos para confirmar la exactitud de la información. 
            Asegúrate de crear una contraseña segura y única que combine letras, números y caracteres especiales.`}
          </Typography>
        </Grid>
        <Grid item lg={12} xs={12}>
          <Box textAlign={'center'}>
            <Formik
              initialValues={{ password1: '', password2: '' }}
              validationSchema={Yup.object().shape({
                password1: Yup.string().max(255).required('La contrasena es requerida'),
                password2: Yup.string().max(255).required('La contrasena es requerida')
              })}
              onSubmit={async (values, { setStatus, setSubmitting }) => {
                await cax
                  .post('/api/users/recoverypass/', {
                    token: token,
                    password1: values.password1,
                    password2: values.password2
                  })
                  .then((response) => {
                    console.log(response);
                    if (response.status === 200) {
                      setOpen(true);
                      setMsg('Contraseña Restaurada Correctamente');
                      setType('success');

                      setStatus({ success: true });
                      setSubmitting(true);

                      navigate('/login');
                    }
                  })
                  .catch((error) => {
                    console.log(error);
                    setOpen(true);
                    setMsg('Error al Restaurar la Contraseña');
                    setType('error');

                    setStatus({ success: false });
                    setSubmitting(false);
                  });
              }}
            >
              {({ errors, handleBlur, handleChange, isSubmitting, handleSubmit, touched, values }) => (
                <Box component={'form'} autoComplete="off" onSubmit={handleSubmit} method="post" noValidate textAlign="center">
                  <Grid container spacing={2}>
                    <Grid item lg={12} xs={12}>
                      <FormControl fullWidth error={Boolean(touched.password1 && errors.password1)}>
                        <InputLabel htmlFor="outlined-adornment-password1-register">Contraseña</InputLabel>
                        <OutlinedInput
                          id="outlined-adornment-password1-register"
                          type={showPassword1 ? 'text' : 'password'}
                          value={values.password1}
                          name="password1"
                          label="Password"
                          onBlur={handleBlur}
                          onChange={(e) => {
                            handleChange(e);
                            changePassword(e.target.value);
                            handleSamePassword(e.target.value, values.password2);
                          }}
                          endAdornment={
                            <InputAdornment position="end">
                              <IconButton
                                aria-label="toggle password visibility"
                                onClick={handleClickShowPassword1}
                                onMouseDown={handleMouseDownPassword}
                                edge="end"
                                size="large"
                              >
                                {showPassword1 ? <Visibility /> : <VisibilityOff />}
                              </IconButton>
                            </InputAdornment>
                          }
                          inputProps={{}}
                        />
                        {touched.password1 && errors.password1 && (
                          <FormHelperText error id="standard-weight-helper-text-password-register">
                            {errors.password1}
                          </FormHelperText>
                        )}
                      </FormControl>
                    </Grid>
                    <Grid item lg={12} xs={12}>
                      <FormControl fullWidth error={Boolean(touched.password2 && errors.password2)}>
                        <InputLabel htmlFor="outlined-adornment-password2-register">Contraseña</InputLabel>
                        <OutlinedInput
                          id="outlined-adornment-password2-register"
                          type={showPassword2 ? 'text' : 'password'}
                          value={values.password2}
                          name="password2"
                          label="Password"
                          onBlur={handleBlur}
                          onChange={(e) => {
                            handleChange(e);
                            handleSamePassword(e.target.value, values.password1);
                          }}
                          endAdornment={
                            <InputAdornment position="end">
                              <IconButton
                                aria-label="toggle password visibility"
                                onClick={handleClickShowPassword2}
                                onMouseDown={handleMouseDownPassword}
                                edge="end"
                                size="large"
                              >
                                {showPassword2 ? <Visibility /> : <VisibilityOff />}
                              </IconButton>
                            </InputAdornment>
                          }
                          inputProps={{}}
                        />
                        {touched.password2 && errors.password2 && (
                          <FormHelperText error id="standard-weight-helper-text-password-register">
                            {errors.password2}
                          </FormHelperText>
                        )}
                      </FormControl>
                    </Grid>
                    <Grid item lg={12} xs={12}>
                      {strength !== 0 && (
                        <FormControl fullWidth>
                          <Box sx={{ mb: 2 }}>
                            <Grid container spacing={2} alignItems="center">
                              <Grid item>
                                <Box style={{ backgroundColor: level?.color }} sx={{ width: 85, height: 8, borderRadius: '7px' }} />
                              </Grid>
                              <Grid item>
                                <Typography variant="subtitle1" fontSize="0.75rem">
                                  {level?.label}
                                </Typography>
                              </Grid>
                            </Grid>
                          </Box>
                        </FormControl>
                      )}
                    </Grid>
                    <Grid item lg={12} xs={12}>
                      <Box textAlign={'center'}>
                        <Button variant="contained" size="medium" disabled={isSubmitting} type="submit">
                          <Typography sx={{ margin: 1 }}>Cambiar Contraseña</Typography>
                        </Button>
                      </Box>
                    </Grid>
                  </Grid>
                </Box>
              )}
            </Formik>
          </Box>
        </Grid>
      </Grid>
      <MessageCard open={open} setOpen={setOpen} msg={msg} type={type} />
    </GeneralBack>
  );
};

export default RecoveryPassword;
