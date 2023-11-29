//react
import { useState, useEffect } from 'react';
//redux
import { useSelector } from 'react-redux';
//axios
import axios from 'axios';
//MUI
import { Grid } from '@mui/material';
//custom
import ParkingCard from 'components/ParkingCard';
import configData from '../../config';
import GeneralBack from 'components/GeneralBack';
import Spinner from 'components/Spinner';

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
          </Grid>
        )}
      </GeneralBack>
    </>
  );
};

export default ParkingShow;
