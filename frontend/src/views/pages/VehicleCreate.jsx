import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

import { Cancel } from '@mui/icons-material';
import { Button, Box, TextField, MenuItem, Grid, FormHelperText } from '@mui/material';

import { Formik } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';

import configData from '../../config';
import { listColorV, listTypesV, listBrandVCarro, listBrandVMoto } from 'static-data/vehicle';

import AnimateButton from 'ui-component/extended/AnimateButton';
import GeneralBack from 'components/GeneralBack';

const VehicleForm = () => {
  const anioActual = new Date().getFullYear();

  const [listBrandV, setListBrandV] = useState([]);
  const account = useSelector((state) => state.account);
  const navigate = useNavigate();

  const callApi = (body) => {
    axios
      .post(
        `${configData.API_SERVER}/parking/vehicle/${account.user?._id}`,
        { ...body, owner: `${account.user?._id}` },
        {
          headers: { Authorization: `${account.token}` }
        }
      )
      .then((res) => {
        console.log(res);
      })
      .catch((error) => {
        console.log(error.response.data);
      });
  };

  const handleTipo = (e) => {
    e.target.value === 'carro' ? setListBrandV(listBrandVCarro) : setListBrandV(listBrandVMoto);
  };

  return (
    <>      
      <GeneralBack title="Registrar Vehiculo">
        <Box textAlign={'end'} sx={{ margin: 2 }}>
          <Button
            variant="outlined"
            onClick={(e) => {
              e.defaultPrevented;
              navigate('/vehicle/show');
            }}
          >
            {/* Cancel Icon by MUI */}
            <Cancel /> 
          </Button>
        </Box>

        <Formik
          initialValues={{
            tipo: '',
            brand: '',
            model: '',
            year: '',
            color: '',
            placa: ''
          }}
          validationSchema={Yup.object().shape({
            model: Yup.string().max(255, 'El maximo es: 255').required('Se requiere el Modelo del Vehiculo'),
            year: Yup.number()
              .min(1500, 'El año minimo es: 1500')
              .max(anioActual, `El año maximo es: ${anioActual}`)
              .required('Se requiere el Año del Vehiculo'),
            placa: Yup.string()
              .min(6, 'Minimo de caracateres es: 6')
              .max(7, 'Maximo de caracteres es: 7')
              .required('Se requiere la Placa del Vehiculo')
          })}
          onSubmit={async (values) => {
            callApi(values);
            navigate('/vehicle/show');
            window.location.reload();
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
                    // defaultValue={''}
                    value={values.tipo}
                    onChange={(e) => {
                      handleChange(e);
                      handleTipo(e);
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
                    // defaultValue={''}
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
                      handleChange(e);
                      values.year = e.target.value;
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
                <Grid item sm={12}>
                  <AnimateButton>
                    <Button disableElevation disabled={isSubmitting} variant="contained" type="submit" size="large">
                      Agregar Vehiculo
                    </Button>
                  </AnimateButton>
                </Grid>
              </Grid>
            </Box>
          )}
        </Formik>
      </GeneralBack>
      
    </>
  );
};

export default VehicleForm;
