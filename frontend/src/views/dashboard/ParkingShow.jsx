import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import axios from 'axios';
import { Grid } from '@mui/material';
import ParkingCard from 'components/ParkingCard';
import configData from '../../config';
import GeneralBack from 'components/GeneralBack';

const ParkingShow = () => {
  const account = useSelector((state) => state.account);
  const [spaces, setSpaces] = useState([]);
  const [completed, setCompleted] = useState(false);
  useEffect(() => {
    axios
      .get(`${configData.API_SERVER}/parking/space/`, {
        headers: {
          Authorization: `${account.token}`
        }
      })
      .then((response) => {
        setSpaces(response.data);
        setCompleted(true);
      });
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <>
      <GeneralBack title="Estacionamientos Disponibles">
        <Grid container spacing={2}>
          {spaces.map((data) => (
            <Grid item xs={12} md={2} key={data.id}>
              <ParkingCard isLoading={!completed} space={data} />
            </Grid>
          ))}
        </Grid>
      </GeneralBack>
    </>
  );
};

export default ParkingShow;
