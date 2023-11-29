//React
import { useState, useEffect } from 'react';

//MUI
import { Grid, Button, Divider, TextField, MenuItem, Typography, Box } from '@mui/material';

//Redux
import { useSelector } from 'react-redux';

//Custon MUI
import BasicDatePicker from 'components/Mui/BasicDatepicker';

//Custom Axios
import caxios from '../../scripts/customAxios.js';

//custom
import AnimateButton from 'ui-component/extended/AnimateButton';
import GeneralBack from 'components/GeneralBack';
import MessageCard from 'components/MessageCard.jsx';
import Spinner from 'components/Spinner.jsx';

const POD = [
  { value: 'MAD', label: 'Madrugada' },
  { value: 'MAN', label: 'Mañana' },
  { value: 'TAR', label: 'Tarde' },
  { value: 'NOC', label: 'Noche' }
];

const PrognosisShow = () => {
  const account = useSelector((state) => state.account);
  const cax = caxios(account.token);

  const [pickDate, setPickDate] = useState({ day: '', month: '', year: '' });
  const [pod, setPod] = useState('');

  const [score, setScore] = useState(0);
  const [cantVehicles, setCantVehicles] = useState(-1);

  const [prognosticado, setPrognosticado] = useState(false);

  const [open, setOpen] = useState(false);
  const [msg, setMsg] = useState(null);
  const [type, setType] = useState(null);

  const [isLoaded1, setIsLoaded1] = useState(true);
  const [isLoaded2, setIsLoaded2] = useState(true);

  const callAPI = async () => {
    await cax
      .get('/parking/ml/status/')
      .then((response) => {
        setScore(response.data?.score);
      })
      .catch((error) => {
        console.log(error);
        setScore(0);
      });
  };

  useEffect(() => {
    callAPI();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    if (isLoaded1 === false) {
      setIsLoaded1(true);
    }
  }, [isLoaded1]);

  useEffect(() => {
    if (isLoaded2 === false) {
      setIsLoaded2(true);
    }
  }, [isLoaded2]);

  const trainModel = async () => {
    await cax
      .post('/parking/ml/teach/', {}, { timeout: 5000 })
      .then((response) => {
        setScore(response.data?.score);

        setOpen(true);
        setMsg('Modelo entrenado con Exito');
        setType('success');
        setIsLoaded1(false);
      })
      .catch((error) => {
        setOpen(true);
        setMsg(error.response.data?.msg);
        setType('error');
      });
  };

  const doPrognosis = async () => {
    if (pickDate.year != '' && pod != '') {
      if (score != 0) {
        await cax
          .get(`/parking/ml/prognosis/?year=${pickDate.year}&month=${pickDate.month}&day=${pickDate.day}&pod=${pod}`, { timeout: 5000 })
          .then((response) => {
            setCantVehicles(response.data?.data);
            setPrognosticado(true);

            setOpen(true);
            setMsg('Prediccion realizada con Exito');
            setType('success');
            setIsLoaded2(false);
          })
          .catch((error) => {
            setOpen(true);
            setMsg(error.response.data?.msg);
            setType('error');
          });
      }
    } else {
      setOpen(true);
      setMsg('Completa los Campos');
      setType('error');
    }
  };

  //TODO: Cuando se realiza el prognostico la fecha seleccionada se borra del field
  return (
    <>
      <GeneralBack title="Pronóstico con IA">
        {!isLoaded1 ? (
          <Spinner />
        ) : (
          <Box>
            <Grid container spacing={3}>
              <Grid item lg={12} xs={12}>
                <Divider sx={{ flexGrow: 5, color: 'black', my: 1 }} orientation="horizontal" />
              </Grid>
              <Grid item lg={6} xs={12}>
                <Box display="flex" justifyContent="center" alignContent="center">
                  <AnimateButton>
                    <Button disableElevation variant="contained" size="large" sx={{ height: 48 }} onClick={trainModel}>
                      {score === 0 ? 'Entrenar Modelo' : 'Volver a Entrenar Modelo'}
                    </Button>
                  </AnimateButton>
                </Box>
              </Grid>
              <Grid item lg={6} xs={12}>
                <Box display="flex" justifyContent="center" alignContent="center">
                  <Typography variant="h4">Estado:_</Typography>
                  <Typography variant="body1" sx={{ color: score != 0 ? 'green' : 'red' }}>
                    {score != 0 ? 'Entrenado' : 'No Entrenado'}
                  </Typography>
                </Box>
              </Grid>
              <Grid item lg={12} xs={12}>
                <Divider sx={{ flexGrow: 5, color: 'black', my: 1 }} orientation="horizontal" />
              </Grid>
            </Grid>
          </Box>
        )}
        {!isLoaded2 ? (
          <Spinner />
        ) : (
          <Box>
            <Grid container spacing={3}>
              <Grid item lg={3} xs={12}>
                <Box display="flex" justifyContent="center" alignContent="center">
                  <BasicDatePicker setPickDate={setPickDate} pickDate={pickDate} />
                </Box>
              </Grid>
              <Grid item lg={3} xs={12}>
                <Box display="flex" justifyContent="center" alignContent="center">
                  <TextField
                    // fullWidth
                    label="Parte del Dia"
                    helperText="Elija la parte del dia"
                    value={pod}
                    onChange={(e) => {
                      setPod(e.target.value);
                    }}
                    select
                    required
                    sx={{ width: 250, height: 80 }}
                  >
                    {POD.map((option) => (
                      <MenuItem key={option.value} value={option.value}>
                        {option.label}
                      </MenuItem>
                    ))}
                  </TextField>
                </Box>
              </Grid>
              <Grid item lg={3} xs={12}>
                <Box display="flex" justifyContent="center" alignContent="center">
                  <AnimateButton>
                    <Button fullWidth disabled={!score} variant="contained" size="large" sx={{ height: 48 }} onClick={doPrognosis}>
                      Generar Pronostico
                    </Button>
                  </AnimateButton>
                </Box>
              </Grid>

              <Grid item lg={3} xs={12}>
                <Box display="flex" justifyContent="center" alignContent="center">
                  <Typography variant="h4">Cantidad de Vehiculos:_</Typography>
                  {prognosticado && (
                    <Typography variant="body1" sx={{ color: cantVehicles === 1 ? 'green' : 'red' }}>
                      {cantVehicles === 1 ? 'ALTO' : 'BAJO'}
                    </Typography>
                  )}
                </Box>
              </Grid>
            </Grid>
          </Box>
        )}
        <Box textAlign={'left'} sx={{ margin: 4 }}>
          <Typography variant="h3">Como usar:</Typography>
          <Typography variant="body1" align="justify">
            {`Descubre la potencia de nuestra funcionalidad de Machine Learning para el pronóstico de tráfico. Para comenzar, utiliza el botón 
            "Entrenar Modelo" para iniciar el proceso y observa el estado en tiempo real en el campo correspondiente. Si necesitas
            actualizar el modelo con datos recientes, simplemente vuelve a entrenarlo después de generar informes diarios. Una vez
            entrenado, selecciona la fecha y la parte del día para realizar pronósticos con un máximo de 10 días hacia adelante. Los
            resultados se clasificarán como "ALTO" o "BAJO", indicando la cantidad prevista de vehículos. ¡Optimiza tus decisiones de
            gestión de tráfico con esta herramienta intuitiva y potente!`}
          </Typography>
        </Box>

        <MessageCard open={open} setOpen={setOpen} msg={msg} type={type} />
      </GeneralBack>
    </>
  );
};

export default PrognosisShow;
