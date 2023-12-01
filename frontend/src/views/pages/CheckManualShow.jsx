//react
import { useState, useEffect } from 'react';

//MUI
import { Grid, Typography, Button, Box, TextField, Divider } from '@mui/material';
import ArrowDownward from '@mui/icons-material/ArrowDownward';

//redux
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { LOGOUT } from 'store/actions.js';

//axios
import caxios from '../../scripts/customAxios.js';

//custom
import GeneralBack from 'components/GeneralBack';
import AnimateButton from 'ui-component/extended/AnimateButton';
import MessageCard from 'components/MessageCard.jsx';
import Spinner from 'components/Spinner.jsx';

const CheckManualShow = () => {
  const account = useSelector((state) => state.account);
  const dispatcher = useDispatch();
  const cax = caxios(account.token);

  const [open, setOpen] = useState(false);
  const [msg, setMsg] = useState(null);
  const [type, setType] = useState(null);

  const [placa, setPlaca] = useState('');
  const [register, setRegister] = useState(null);

  const [isLoaded, setIsLoaded] = useState(true);
  const [statusReq, setStatusReq] = useState(0);

  const handleCheckVehicle = async () => {
    if (placa) {
      setStatusReq(0);
      await cax
        .get(`/parking/check/manual/${placa}/`)
        .then((response) => {
          if (response.status === 200) {
            setRegister(response.data.register);
            setMsg('Vehículo Existente Listo para Registrar');
            setType('success');
            setOpen(true);
          } else if (response.status === 204) {
            setRegister(null);
            setMsg('Vehículo NO Existente Listo para Registrar');
            setType('success');
            setOpen(true);
          }
          setStatusReq(response.status);
          setIsLoaded(false);
        })
        .catch((error) => {
          if (error?.response?.status === 403) {
            dispatcher({ type: LOGOUT });
          }
          setMsg('No hay datos disponibles');
          setType('warning');
          setOpen(true);
        });
    } else {
      setMsg('Ingrese la Placa del Vehículo');
      setType('warning');
      setOpen(true);
    }
  };

  const registerEntry = async () => {
    if (statusReq != 0) {
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
          if (response.status === 201) {
            setMsg(`Registro de Entrada Exitoso`);
            setType('success');
            setOpen(true);
          }
        })
        .catch((error) => {
          setMsg(error?.response.data.msg[0]);
          setType('error');
          setOpen(true);
        })
        .finally(() => {
          setStatusReq(0);
        });
    }
  };
  const registerDeparture = async () => {
    if (register != null) {
      await cax
        .put(`/parking/register/${register.id}/departure/`)
        .then((response) => {
          if (response.status === 201) {
            setMsg(`Registro de Salida Exitoso`);
            setType('success');
            setOpen(true);
          }
        })
        .finally(() => {
          setStatusReq(0);
        });
    }
  };

  useEffect(() => {
    if (statusReq != 0) {
      setIsLoaded(true);
    }
  }, [statusReq]);

  return (
    <GeneralBack title="Registro Manual de Vehículos">
      {!isLoaded ? (
        <Spinner />
      ) : (
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
                inputProps={{ maxLength: 7 }}
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
                  disabled={statusReq != 0 ? (register != null ? true : false) : true}
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
                  disabled={statusReq != 0 ? (register === null ? true : false) : true}
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
      )}

      <MessageCard open={open} setOpen={setOpen} msg={msg} type={type} />
      <Box textAlign={'left'} sx={{ margin: 4 }}>
        <Typography variant="h3">Como usar:</Typography>
        <Typography variant="body1" align="justify">
          {`Cuando ingreses a la aplicación, introduce la placa del vehículo. Verifica si hay un registro existente. 
          Si la placa no está registrada, presiona "Registrar Entrada" para agregarla al sistema. 
          Si la placa ya existe y el vehículo se está retirando, selecciona "Registrar Salida" para mantener un seguimiento preciso.`}
        </Typography>
      </Box>
    </GeneralBack>
  );
};

export default CheckManualShow;
