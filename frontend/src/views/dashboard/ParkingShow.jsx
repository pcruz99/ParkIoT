//react
import { useState, useEffect } from 'react';
//redux
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { LOGOUT } from 'store/actions';
//axios
import axios from 'axios';
//MUI
import { Grid, Box, Typography } from '@mui/material';
//custom
import ParkingCard from 'components/ParkingCard';
import configData from '../../config';
import GeneralBack from 'components/GeneralBack';
import Spinner from 'components/Spinner';

const ParkingShow = () => {
  const account = useSelector((state) => state.account);
  const dispatcher = useDispatch();
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
      })
      .catch((error) => {
        if (error?.response?.status === 403) {
          dispatcher({ type: LOGOUT });
        }
      });
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <>
      <GeneralBack title="Estacionamientos Disponibles">
        {spaces.length === 0 ? (
          <Spinner />
        ) : (
          <Grid container spacing={2}>
            {spaces
              .slice()
              .sort((a, b) => a.number - b.number)
              .map((data) => (
                <Grid item xs={12} md={2} key={data.id}>
                  <ParkingCard isLoading={!completed} space={data} />
                </Grid>
              ))}
            <Box textAlign={'left'} sx={{ margin: 4 }}>
              <Typography variant="h3">Como usar:</Typography>
              <Typography variant="body1" align="justify">
                {`Es importante notar que la disponibilidad de espacios de estacionamiento puede haber cambiado desde la última vez que lo viste. 
                Se sugiere verificar en tiempo real y contemplar alternativas.`}
              </Typography>
            </Box>
          </Grid>
        )}
      </GeneralBack>
    </>
  );
};

export default ParkingShow;
