import { useNavigate } from 'react-router';
import { useSelector } from 'react-redux';
import axios from 'axios';
import { Button, Box, TextField, MenuItem, Grid } from '@mui/material';
import MainCard from 'ui-component/cards/MainCard';
import configData from '../../config';

const VehicleForm = () => {
  const listColorV = [
    { value: 'negro', label: 'Negro' },
    { value: 'blanco', label: 'Blanco' },
    { value: 'rojo', label: 'Rojo' },
    { value: 'azul', label: 'Azul' },
    { value: 'verde', label: 'Verde' },
    { value: 'amarillo', label: 'Amarillo' },
    { value: 'gris', label: 'Gris' }
  ];

  const listTypesV = [
    { value: 'carro', label: 'Carro' },
    { value: 'moto', label: 'Moto' }
  ];

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

  function handleSubmit(e) {
    e.preventDefault();
    const form = e.target;
    const formData = new FormData(form);
    const formJson = Object.fromEntries(formData.entries());
    callApi(formJson);
    navigate('/vehicle/show');
    window.location.reload();
  }

  return (
    <>
      <MainCard title="Registrar Vehiculo">
        <Box textAlign={'end'} sx={{ margin: 2, background: 'red' }}>
          <Button variant="contained">Cancelar</Button>
        </Box>
        <Box
          component="form"
          sx={{
            '& .MuiTextField-root': { m: 1, width: '25ch' },
            background: 'green'
          }}
          autoComplete="off"
          onSubmit={handleSubmit}
          method="post"
        >
          <Grid container spacing={2}>
            <Grid item>
              <TextField name="brand" id="brand-id" label="Marca" variant="outlined" required />
              <TextField name="model" id="model-id" label="Modelo" variant="outlined" required />
              <TextField
                name="color"
                id="color-id"
                label="Color del Vehiculo"
                select
                helperText="Elija el color del Vehiculo"
                defaultValue={''}
                required
              >
                {listColorV.map((option) => (
                  <MenuItem key={option.value} value={option.value}>
                    {option.label}
                  </MenuItem>
                ))}
              </TextField>
              <TextField
                name="tipo"
                id="tipo-id"
                label="Tipo de Vehiculo"
                select
                helperText="Elija el tipo de Vehiculo"
                defaultValue={''}
                required
              >
                {listTypesV.map((option) => (
                  <MenuItem key={option.value} value={option.value}>
                    {option.label}
                  </MenuItem>
                ))}
              </TextField>
              <TextField name="placa" id="placa-id" label="Placa" variant="outlined" required />
            </Grid>
            <Grid item xl={12}>
              <Box textAlign={'center'} sx={{ background: 'red' }}>
                <Button variant="contained" type="submit">
                  Agregar Vehiculo
                </Button>
              </Box>
            </Grid>
          </Grid>
        </Box>
      </MainCard>
    </>
  );
};

export default VehicleForm;
