//react
import { useEffect, useState } from 'react';

//redux
import { useSelector } from 'react-redux';

//MUI
import { Grid, TextField, Button, Box } from '@mui/material';

//Csutom MUI
import StickyHeadTable from 'components/Mui/StickyHeadTable';
import BasicDatePicker from 'components/Mui/BasicDatepicker';

import AnimateButton from 'ui-component/extended/AnimateButton';

//Scripts
import caxiox from '../../scripts/customAxios.js';

//Custom
import GeneralBack from 'components/GeneralBack';
import MessageCard from 'components/MessageCard.jsx';

const ESReportShow = () => {
  const account = useSelector((state)=>state.account);
  const dateNow = new Date();
  const cax = caxiox(account.token);

  const [registers, setRegister] = useState(null);
  const [pickDate, setPickDate] = useState();
  const [placa, setPlaca] = useState('');

  const [open, setOpen] = useState(false);
  const [msg, setMsg] = useState(null);
  const [type, setType] = useState(null);

  const callAPI = async (year, month, day, placa = '') => {
    await cax
      .get(`/parking/register/?year=${year}&month=${month}&day=${day}&placa=${placa}`)
      .then((response) => {
        setRegister(response.data);
      })
      .catch(() => {
        setRegister([]);
        setMsg('No existen Registros con esos Datos o en la Fecha de Hoy');
        setType('error');
        setOpen(true);
      });
  };

  useEffect(() => {
    // callAPI(2023, 10, 24);
    callAPI(dateNow.getFullYear(), dateNow.getMonth() + 1, dateNow.getDate());
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  const consultar = () => {
    if (pickDate) {
      if (placa) {
        callAPI(pickDate.year, pickDate.month, pickDate.day, placa);
      } else {
        callAPI(pickDate.year, pickDate.month, pickDate.day);
      }
    } else {
      setMsg('Necesita elegir una Fecha Primero');
      setType('error');
      setOpen(true);
    }
  };

  return (
    <>
      <GeneralBack title="Reporte de E/S de Vehiculos">
        <Box textAlign={'center'}>
          <Grid container spacing={2}>
            <Grid item lg={3} xs={12}>
              <BasicDatePicker setPickDate={setPickDate} />
            </Grid>
            <Grid item lg={3} xs={12}>
              <TextField
                fullWidth
                id="placa"
                label="Placa del Vehiculo"
                variant="outlined"
                value={placa}
                onChange={(e) => {
                  setPlaca(e.target.value.toUpperCase());
                }}
                helperText="Escriba la placa del Vehiculo"
                sx={{ width: 250, height: 80 }}
              />
            </Grid>
            <Grid item lg={3} xs={12}>
              <Box>
                <Box display="flex" justifyContent="center" alignContent="center">
                  <AnimateButton>
                    <Button fullWidth variant="contained" size="large" onClick={consultar} sx={{ height: 48 }}>
                      Generar Reporte
                    </Button>
                  </AnimateButton>
                </Box>
              </Box>
            </Grid>
            <Grid item xs={12}>
              <StickyHeadTable registers={registers} />
            </Grid>
          </Grid>
        </Box>
        <MessageCard open={open} setOpen={setOpen} msg={msg} type={type} />
      </GeneralBack>
    </>
  );
};

export default ESReportShow;