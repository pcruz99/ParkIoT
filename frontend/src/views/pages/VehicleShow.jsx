import { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router';
import { useSelector } from 'react-redux';
import MainCard from 'ui-component/cards/MainCard';
import { Grid, Box } from '@mui/material';
import VehicleCard from 'components/VehicleCard';

import { Button } from '@mui/material';

import configData from '../../config';

const VehicleShow = () => {
  const account = useSelector((state) => state.account);
  const [vehicles, setVehicles] = useState([]);
  const [slots, setSlots] = useState(0);
  const [disableAddButton, setDisableAddButton] = useState(false);
  const navigate = useNavigate();

  const handleAddVehicle = () => {
    if (slots < 3) {
      navigate('/vehicle/create');
    }
  };

  useEffect(() => {
    axios
      .get(`${configData.API_SERVER}/parking/vehicle/${account.user?._id}`, {
        headers: {
          Authorization: `${account.token}`
        }
      })
      .then((response) => {
        setVehicles(response.data);
        setSlots(response.data.length);
      });
  }, []);

  useEffect(() => {
    slots === 3 && setDisableAddButton(true);
  }, [slots]);

  return (
    <>
      <MainCard title="Vehiculos Registrados">
        <Box textAlign="center" sx={{ margin: 3 }}>
          <Button variant="contained" onClick={handleAddVehicle} disabled={disableAddButton}>
            Agregar Vehiculo
          </Button>
        </Box>
        <Grid container spacing={3}>
          {vehicles.map((data) => {
            return (
              <Grid item lg={4} md={6} sm={6} xs={12} key={data.id}>
                <VehicleCard isLoading={false} vehicle={data} />
              </Grid>
            );
          })}
        </Grid>
      </MainCard>
    </>
  );
};

export default VehicleShow;
