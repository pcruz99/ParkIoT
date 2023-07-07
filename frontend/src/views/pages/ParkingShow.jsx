import MainCard from 'ui-component/cards/MainCard';
import ParkingCard from 'components/ParkingCard';
import { Grid } from '@mui/material';

const ParkingShow = () => {
  return (
    <>
      <MainCard title="Espacios de Estacionamiento Disponibles">
        <Grid container spacing={2}>
          <Grid item xs={6} md={2} >
            <ParkingCard isLoading={false} />
          </Grid>
          <Grid item xs={6} md={2} >
            <ParkingCard isLoading={false} />
          </Grid>
          <Grid item xs={6} md={2} >
            <ParkingCard isLoading={false} />
          </Grid>
          <Grid item xs={6} md={2} >
            <ParkingCard isLoading={false} />
          </Grid>
          <Grid item xs={6} md={2} >
            <ParkingCard isLoading={false} />
          </Grid>
          <Grid item xs={6} md={2} >
            <ParkingCard isLoading={false} />
          </Grid>          
        </Grid>
      </MainCard>
    </>
  );
};

export default ParkingShow;
