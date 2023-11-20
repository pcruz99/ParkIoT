//react
import { useState, useEffect } from 'react';
//react-router
import { useNavigate, useParams } from 'react-router-dom';
//redux
import { useSelector } from 'react-redux';

//custom-axios
import caxios from '../../scripts/customAxios.js';

//formik
import { Formik } from 'formik';
import * as Yup from 'yup';

//MUI
import { Cancel } from '@mui/icons-material';
import { Button, Box, TextField, MenuItem, Grid, FormHelperText } from '@mui/material';

import { listColorV, listTypesV, listBrandVCarro, listBrandVMoto } from 'static-data/vehicle';

import AnimateButton from 'ui-component/extended/AnimateButton';
import GeneralBack from 'components/GeneralBack';

const VehicleEdit = () => {
  const account = useSelector((state) => state.account);
  const cax = caxios(account.token);
  const anioActual = new Date().getFullYear();

  const navigate = useNavigate();
  const { id } = useParams();

  const [listBrandV, setListBrandV] = useState([]);
  const [vehicle, setVehicle] = useState();
  const [vehicleBrand, setVehicleBrand] = useState('');

  const handleTipo = (tipo) => {
    tipo === 'carro' ? setListBrandV(listBrandVCarro) : setListBrandV(listBrandVMoto);
  };

  const callAPI = async () => {
    await cax(`/parking/vehicle/${id}`).then((response) => {
      if (response.status === 200) {
        setVehicle(response.data);
      }
    });
  };

  useEffect(() => {
    callAPI();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    if (vehicle) {
      handleTipo(vehicle.tipo);
      setVehicleBrand(vehicle.brand);
    }
  }, [vehicle]);

  return (
    <>
      <GeneralBack title="Editar Vehiculo">
        <Box textAlign={'end'} sx={{ margin: 2 }}>
          <Button
            variant="outlined"
            onClick={(e) => {
              e.defaultPrevented;
              navigate('/vehicle/show');
            }}
          >
            <Cancel />
          </Button>
        </Box>
        {vehicle && vehicleBrand && (
          <Formik
            initialValues={{
              tipo: vehicle.tipo,
              brand: vehicleBrand,
              model: vehicle.model,
              year: vehicle.year,
              color: vehicle.color,
              placa: vehicle.placa
            }}
            validationSchema={Yup.object().shape({
              model: Yup.string().max(255, 'El maximo es: 255').required('Se requiere el Modelo del Vehiculo'),
              year: Yup.number()
                .min(1500, 'El año minimo es: 1500')
                .max(anioActual, `El año maximo es: ${anioActual + 1}`)
                .required('Se requiere el Año del Vehiculo'),
              placa: Yup.string()
                .min(6, 'Minimo de caracateres es: 6')
                .max(7, 'Maximo de caracteres es: 7')
                .required('Se requiere la Placa del Vehiculo')
            })}
            onSubmit={async (values, { setErrors, setStatus, setSubmitting }) => {
              // onSubmit={async (values) => {
              await cax
                .put(`/parking/vehicle/${id}/`, values)
                .then((response) => {
                  if (response.status === 204) {
                    setSubmitting(true);
                    setStatus({ success: true });
                    navigate('/vehicle/show');
                  } else {
                    // setStatus({ success: false });
                    // setErrors({ submit: response.data });
                    // setSubmitting(false);
                  }
                })
                .catch((error) => {
                  setErrors({ submit: { placa: error.response.data.placa[0] } });
                  setStatus({ success: false });
                  setSubmitting(false);
                });
            }}
          >
            {({ errors, handleChange, handleSubmit, isSubmitting, touched, values }) => (
              <Box
                component="form"
                // sx={{
                //   '& .MuiTextField-root': { m: 1, width: '25ch' }
                // }}
                autoComplete="off"
                onSubmit={handleSubmit}
                method="post"
                noValidate
                textAlign="center"
              >
                <Grid container spacing={2}>
                  <Grid item xs={12} sm={4}>
                    <TextField
                      fullWidth
                      name="tipo"
                      id="tipo-id"
                      label="Tipo de Vehiculo"
                      helperText="Elija el tipo de Vehiculo"
                      variant="outlined"
                      value={values.tipo}
                      onChange={(e) => {
                        handleChange(e);
                        handleTipo(e.target.value);
                        values.tipo = e.target.value;
                      }}
                      select
                      required
                    >
                      {listTypesV.map((option) => (
                        <MenuItem key={option.value} value={option.value}>
                          {option.label}
                        </MenuItem>
                      ))}
                    </TextField>
                  </Grid>
                  <Grid item xs={12} sm={4}>
                    <TextField
                      fullWidth
                      name="brand"
                      id="brand-id"
                      label="Marca"
                      helperText="Elija el color del Vehiculo"
                      variant="outlined"
                      value={values.brand}
                      onChange={(e) => {
                        handleChange(e);
                        values.brand = e.target.value;
                      }}
                      select
                      required
                    >
                      {listBrandV.map((option) => (
                        <MenuItem key={option.value} value={option.value}>
                          {option.label}
                        </MenuItem>
                      ))}
                    </TextField>
                  </Grid>
                  <Grid item xs={12} sm={4}>
                    <TextField
                      fullWidth
                      error={Boolean(touched.model && errors.model)}
                      name="model"
                      id="model-id"
                      label="Modelo"
                      type="text"
                      variant="outlined"
                      value={values.model}
                      onChange={(e) => {
                        handleChange(e);
                        values.model = e.target.value;
                      }}
                      InputProps={{
                        sx: {
                          '& input': {
                            textAlign: 'center'
                          }
                        }
                      }}
                      required
                    />
                    {touched.model && errors.model && (
                      <FormHelperText error id="standard-weight-helper-text--register">
                        {errors.model}
                      </FormHelperText>
                    )}
                  </Grid>
                  <Grid item xs={12} sm={4}>
                    <TextField
                      fullWidth
                      error={Boolean(touched.year && errors.year)}
                      name="year"
                      id="year-id"
                      label="Año del Vehiculo"
                      type="number"
                      variant="outlined"
                      value={values.year}
                      onChange={(e) => {
                        const inputValue = e.target.value;
                        if (inputValue > 0) {
                          handleChange(e);
                          values.year = inputValue;
                        }
                      }}
                      InputProps={{
                        sx: {
                          '& input': {
                            textAlign: 'center'
                          }
                        },
                        min: 0
                      }}
                      required
                    />
                    {touched.year && errors.year && (
                      <FormHelperText error id="standard-weight-helper-text--register">
                        {errors.year}
                      </FormHelperText>
                    )}
                  </Grid>
                  <Grid item xs={12} sm={4}>
                    <TextField
                      fullWidth
                      name="color"
                      id="color-id"
                      label="Color del Vehiculo"
                      helperText="Elija el color del Vehiculo"
                      // defaultValue={''}
                      value={values.color}
                      onChange={(e) => {
                        handleChange(e);
                        values.color = e.target.value;
                      }}
                      select
                      required
                    >
                      {listColorV.map((option) => (
                        <MenuItem key={option.value} value={option.value}>
                          {option.label}
                        </MenuItem>
                      ))}
                    </TextField>
                  </Grid>

                  <Grid item xs={12} sm={4}>
                    <TextField
                      fullWidth
                      name="placa"
                      id="placa-id"
                      label="Placa"
                      variant="outlined"
                      value={values.placa}
                      onChange={(e) => {
                        handleChange(e);
                        values.placa = e.target.value;
                      }}
                      InputProps={{
                        sx: {
                          '& input': {
                            textAlign: 'center'
                          }
                        }
                      }}
                      required
                    />

                    {touched.placa && errors.placa && (
                      <FormHelperText error id="standard-weight-helper-text--register">
                        {errors.placa}
                      </FormHelperText>
                    )}
                  </Grid>

                  {errors.submit && errors.submit.placa && (
                    <Box sx={{ mt: 3 }}>
                      <FormHelperText error>{errors.submit.placa}</FormHelperText>
                    </Box>
                  )}

                  <Grid item lg={12} xs={12} md={12}>
                    <Box display="flex" justifyContent="center" alignContent="center">
                      <AnimateButton>
                        <Button disableElevation disabled={isSubmitting} variant="contained" type="submit" size="large" color="secondary">
                          Editar Vehículo
                        </Button>
                      </AnimateButton>
                    </Box>
                  </Grid>
                </Grid>
              </Box>
            )}
          </Formik>
        )}
      </GeneralBack>
    </>
  );
};

export default VehicleEdit;
