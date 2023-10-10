//react
import { useState, useEffect } from 'react';
//axios
import axios from 'axios';
//react-router
import { useNavigate } from 'react-router-dom';
//redux
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { SET_VEHICLES } from 'store/actions';

//MUI
import { Grid, Box } from '@mui/material';
import { Button } from '@mui/material';

import AnimateButton from 'ui-component/extended/AnimateButton';

import configData from '../../config';
import VehicleCard from 'components/VehicleCard';
import GeneralBack from 'components/GeneralBack';

const VehicleShow = () => {
  const account = useSelector((state) => state.account);
  const { vehicles, slots } = useSelector((state) => state.vehicles);
  const dispatcher = useDispatch();
  const [disableAddButton, setDisableAddButton] = useState(false);
  const navigate = useNavigate();

  const handleAddVehicle = () => {
    if (slots < 3) {
      navigate('/vehicle/create');
    }
  };

  useEffect(() => {
    axios
      .get(`${configData.API_SERVER}/parking/vehicle/`, {
        headers: {
          Authorization: `${account.token}`
        }
      })
      .then((response) => {
        dispatcher({
          type: SET_VEHICLES,
          payload: [...response.data]
        });
      });
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    slots === 3 ? setDisableAddButton(true): setDisableAddButton(false);
  }, [vehicles]);

  return (
    <>
      <GeneralBack title="Vehiculos Registrados">
        <Box textAlign="center" sx={{ margin: 3 }}>
          <AnimateButton>
            <Button variant="contained" onClick={handleAddVehicle} disabled={disableAddButton} size="large">
              Nuevo Vehículo
            </Button>
          </AnimateButton>
        </Box>
        <Grid container spacing={3}>
          {vehicles.map((data) => (
            <Grid item lg={4} md={6} sm={6} xs={12} key={data.id}>
              <VehicleCard isLoading={false} vehicle={data} isForCheck={false} />
            </Grid>
          ))}
        </Grid>
      </GeneralBack>
    </>
  );
};

export default VehicleShow;
