//react
import { useState } from 'react';

//MUI
import { Grid, Typography, Button, Box, TextField, Divider } from '@mui/material';
import ArrowDownward from '@mui/icons-material/ArrowDownward';

//redux
import { useSelector } from 'react-redux';

//axios
import caxios from '../../scripts/customAxios.js';

import GeneralBack from 'components/GeneralBack';
import AnimateButton from 'ui-component/extended/AnimateButton';
import MessageCard from 'components/MessageCard.jsx';

const CheckManualShow = () => {
  const account = useSelector((state) => state.account);
  const cax = caxios(account.token);

  const [open, setOpen] = useState(false);
  const [msg, setMsg] = useState(null);
  const [type, setType] = useState(null);

  const [placa, setPlaca] = useState('');
  const [checked, setCheked] = useState(false);
  const [register, setRegister] = useState(null);

  const handleCheckVehicle = async () => {
    await cax
      .get(`/parking/check/manual/${placa}`)
      .then((response) => {
        if (response.status === 200) {
          setRegister(response.data.register);
          setCheked(true);
          setMsg('Vehiculo Existente Listo para Registrar');
          setType('success');
          setOpen(true);
        }else if(response.status === 204){
          setCheked(true);
          setMsg('Vehiculo no Existente Listo para Registrar');
          setType('success');
          setOpen(true);
        }
      })
      .catch(() => {
        setMsg('No hay datos disponibles');
        setType('warning');
        setOpen(true);
      });
  };

  console.log(register);

  const registerEntry = async () => {
    if (checked) {
      await cax
        .post(
          '/parking/register/entry/',
          {
            user: 0,
            placa: placa,
            guard: account.user._id
          },
          { timeout: 5000 }
        )
        .then((response) => {
          console.log(response.data);
          if (response.status === 201) {            
            setMsg(`Registro de Entrada Existoso`);
            setType('success');
            setOpen(true);
            setCheked(false);
          }
        })
        .catch((error) => {
          setMsg(error?.response.data.msg[0]);
          setType('error');
          setOpen(true);
        });
    }
  };
  const registerDeparture = async () => {
    if (register != null) {
      await cax.put(`/parking/register/${register.id}/departure/`).then((response) => {
        if (response.status === 201) {
          setMsg(`Registro de Salida Existoso`);
          setType('success');
          setOpen(true);
          setCheked(false);          
        }
      });
    }
  };

  return (
    <GeneralBack title="Registro Manual de Vehículos">
      <Box textAlign={'center'}>
        <Grid container spacing={2}>
          <Grid item lg={12} xs={12}>
            <Divider sx={{ flexGrow: 5, color: 'black', my: 1 }} orientation="horizontal" />
          </Grid>
          <Grid item lg={12} xs={12}>
            <Typography variant="h3">Ingrese el Numero de Placa del Vehículo</Typography>
          </Grid>
          <Grid item lg={12} xs={12}>
            <Box>
              <ArrowDownward sx={{ width: 50, height: 50 }} />
            </Box>
          </Grid>
          {placa != '' && (
            <Grid item lg={12} xs={12}>
              <Typography variant="h2">{placa.toUpperCase()}</Typography>
            </Grid>
          )}
          <Grid item lg={12} xs={12}>
            <TextField
              fullWidth
              id="placa"
              label="Placa del Vehículo"
              variant="outlined"
              value={placa}
              onChange={(e) => {
                setPlaca(e.target.value.toUpperCase());
              }}
              helperText="Escriba la placa del Vehículo"
              sx={{ width: 250, height: 80, fontSize: 50 }}
            />
          </Grid>
          <Grid item lg={12} xs={12}>
            <AnimateButton>
              <Button
                disableElevation
                variant="contained"
                size="large"
                color="secondary"
                onClick={handleCheckVehicle}
                sx={{ width: 200, height: 50 }}
              >
                Verificar la Placa
              </Button>
            </AnimateButton>
          </Grid>
          <Grid item lg={12} xs={12}>
            <Divider sx={{ flexGrow: 5, color: 'black', my: 1 }} orientation="horizontal" />
          </Grid>
          <Grid item lg={6} xs={12}>
            <AnimateButton>
              <Button
                disableElevation
                disabled={checked ? (register != null ? true : false) : true}
                variant="contained"
                size="large"
                color="success"
                onClick={registerEntry}
                sx={{ width: 250, height: 50 }}
              >
                Registrar Entrada
              </Button>
            </AnimateButton>
          </Grid>
          <Grid item lg={6} xs={12}>
            <AnimateButton>
              <Button
                disableElevation
                disabled={checked ? (register === null ? true : false) : true}
                variant="contained"
                size="large"
                color="error"
                onClick={registerDeparture}
                sx={{ width: 250, height: 50 }}
              >
                Registrar Salida
              </Button>
            </AnimateButton>
          </Grid>
          <Grid item lg={12} xs={12}>
            <Divider sx={{ flexGrow: 5, color: 'black', my: 1 }} orientation="horizontal" />
          </Grid>
        </Grid>
      </Box>
      <MessageCard open={open} setOpen={setOpen} msg={msg} type={type} />
    </GeneralBack>
  );
};

export default CheckManualShow;
