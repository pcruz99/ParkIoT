//React
import { useState } from 'react';

//MUI
import { Grid, Button, Divider, TextField, MenuItem, Typography, Box } from '@mui/material';
import CheckIcon from '@mui/icons-material/Check';

//Custon MUI
import BasicDatePicker from 'components/Mui/BasicDatepicker';

import AnimateButton from 'ui-component/extended/AnimateButton';

import GeneralBack from 'components/GeneralBack';
import MenuCard from 'components/MenuCard';

const POD = [
  { value: 'MAD', label: 'MAD' },
  { value: 'MAN', label: 'MAN' },
  { value: 'TAR', label: 'TAR' },
  { value: 'NOC', label: 'NOC' }
];

const PrognosisShow = () => {
  const [pickDate, setPickDate] = useState();
  console.log(pickDate);

  return (
    <>
      <GeneralBack title="Pronóstico con IA">
        <Grid container spacing={3}>
          <Grid item lg={6}>
            <AnimateButton>
              <Button fullWidth variant="contained" size="large">
                Entrenar Modelo
              </Button>
            </AnimateButton>
          </Grid>
          <Grid item lg={6}>
            <Box alignItems={'center'}>
              <Typography variant="h3">
                Modelo Entrenado: <CheckIcon color="success" />
              </Typography>
            </Box>
          </Grid>
          <Grid item lg={12}>
            <Divider sx={{ flexGrow: 5, color: 'black', my: 1 }} orientation="horizontal" />
          </Grid>

          <Grid item lg={3} xs={12}>
            <BasicDatePicker setPickDate={setPickDate} />
          </Grid>
          <Grid item lg={3} xs={12}>
            <TextField
              fullWidth
              name="color"
              id="color-id"
              label="Parte del Dia"
              helperText="Elija la parte del dia"
              // defaultValue={''}
              // value={values.color}
              // onChange={(e) => {
              //   handleChange(e);
              //   values.color = e.target.value;
              // }}
              select
              // required
            >
              {POD.map((option) => (
                <MenuItem key={option.value} value={option.value}>
                  {option.label}
                </MenuItem>
              ))}
            </TextField>
          </Grid>
          <Grid item lg={3}>
            <AnimateButton>
              <Button fullWidth variant="contained" size="large">
                Generar Pronostico
              </Button>
            </AnimateButton>
          </Grid>

          <Grid item lg={12}>
            <MenuCard title={'Cantidad de Vehiculos'} />
          </Grid>
        </Grid>
      </GeneralBack>
    </>
  );
};

export default PrognosisShow;
