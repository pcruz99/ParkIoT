import MainCard from 'ui-component/cards/MainCard';
import ParkingCard from 'components/ParkingCard';
import { Grid } from '@mui/material';

const ParkingShow = () => {
  return (
    <>
      <MainCard title="Espacios de Estacionamiento Disponibles">
        {/* <ParkingCard id={1} estado={'libre'} /> */}
        <Grid container spacing={2}>
          <Grid item xs={1.3} md={2} sm={4} lg={6}>
            <ParkingCard isLoading={false} />
          </Grid>
          <Grid item xs={1.3} md={2} sm={4} lg={6}>
            <ParkingCard isLoading={false} />
          </Grid>
          <Grid item xs={1.3} md={2} sm={4} lg={6}>
            <ParkingCard isLoading={false} />
          </Grid>
          <Grid item xs={1.3} md={2} sm={4} lg={6}>
            <ParkingCard isLoading={false} />
          </Grid>
          <Grid item xs={1.3} md={2} sm={4} lg={6}>
            <ParkingCard isLoading={false} />
          </Grid>
          <Grid item xs={1.3} md={2} sm={4} lg={6}>
            <ParkingCard isLoading={false} />
          </Grid>          
        </Grid>
      </MainCard>
    </>
  );
};

export default ParkingShow;
