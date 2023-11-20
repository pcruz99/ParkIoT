import PropTypes from 'prop-types';
import { useState } from 'react';

//react-redux
import { SET_VEHICLES } from 'store/actions.js';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';

//react-router
import { useNavigate } from 'react-router';

// material-ui
import { styled, useTheme } from '@mui/material/styles';
import { Avatar, Box, Grid, Menu, MenuItem, Typography } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import EditIcon from '@mui/icons-material/Edit';

// project imports
import MainCard from 'ui-component/cards/MainCard';
import SkeletonEarningCard from 'ui-component/cards/Skeleton/EarningCard';
import { capitalizerCustom } from 'scripts/cambiarSize';

// assets
import { DirectionsCar, TwoWheeler } from '@mui/icons-material';

//custom-axios
import caxios from '../scripts/customAxios.js';

const CardWrapper = styled(MainCard)(({ theme, ischecked }) => ({
  backgroundColor: ischecked === 'true' ? theme.palette.secondary.light : theme.palette.secondary.dark,
  color: ischecked === 'true' ? '#000000' : '#fff',
  overflow: 'hidden',
  position: 'relative',
  // height: 180,
  '&:after': {
    content: '""',
    position: 'absolute',
    width: 210,
    height: 210,
    background: theme.palette.secondary[800],
    borderRadius: '50%',
    top: -85,
    right: -95,
    [theme.breakpoints.down('sm')]: {
      top: -105,
      right: -140
    }
  },
  '&:before': {
    content: '""',
    position: 'absolute',
    width: 210,
    height: 210,
    background: theme.palette.secondary[800],
    borderRadius: '50%',
    top: -125,
    right: -15,
    opacity: 0.5,
    [theme.breakpoints.down('sm')]: {
      top: -155,
      right: -70
    }
  }
}));

// ===========================|| DASHBOARD DEFAULT - EARNING CARD ||=========================== //

const VehicleCard = ({ isLoading, vehicle, isForCheck, setVehicleId, vehicleId }) => {
  const theme = useTheme();
  const navigate = useNavigate();

  const account = useSelector((state) => state.account);
  const { vehicles } = useSelector((state) => state.vehicles);
  const dispatcher = useDispatch();

  const [anchorEl, setAnchorEl] = useState(null);

  //! Esto no es definitivo, hay que mejorar la funcionliad
  const callAPI = async () => {
    const cax = caxios(account?.token);
    await cax.delete(`/parking/vehicle/${vehicle.id}`).then((response) => {
      if (response.status == 204) {
        dispatcher({
          type: SET_VEHICLES,
          payload: vehicles.filter((v) => v.id != vehicle.id)
        });
      }
    });
  };

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleCheckVehicle = () => {
    if (isForCheck) {
      setVehicleId(vehicle.id);
    }
  };

  const handleDeleteVehicle = () => {
    callAPI();
  };

  const hanldeEditVehicle = () => {
    navigate(`/vehicle/edit/${vehicle.id}`);
  };

  return (
    <>
      {isLoading ? (
        <SkeletonEarningCard />
      ) : (
        <Box sx={{ cursor:  isForCheck ? 'pointer': 'default' }} onClick={handleCheckVehicle} component="div">
          <CardWrapper border={false} content={false} ischecked={vehicleId === vehicle.id ? 'true' : 'false'}>
            <Box sx={{ p: 2.25 }}>
              <Grid container direction="column">
                <Grid item>
                  <Grid container justifyContent="space-between">
                    <Grid item>
                      <Avatar
                        variant="rounded"
                        sx={{
                          ...theme.typography.commonAvatar,
                          ...theme.typography.largeAvatar,
                          backgroundColor: theme.palette.secondary[800],
                          mt: 1
                        }}
                      >
                        {vehicle.tipo === 'carro' ? (
                          <DirectionsCar stroke={1.5} size="1.3rem" sx={{ color: 'white' }} />
                        ) : (
                          <TwoWheeler stroke={1.5} size="1.3rem" sx={{ color: 'white' }} />
                        )}
                      </Avatar>
                    </Grid>
                    {!isForCheck && (
                      <Grid item>
                        <Avatar
                          variant="rounded"
                          sx={{
                            ...theme.typography.commonAvatar,
                            ...theme.typography.mediumAvatar,
                            backgroundColor: theme.palette.secondary.dark,
                            color: theme.palette.secondary[200],
                            zIndex: 1
                          }}
                          aria-controls="menu-earning-card"
                          aria-haspopup="true"
                          onClick={handleClick}
                        >
                          <MoreHorizIcon fontSize="inherit" />
                        </Avatar>
                        <Menu
                          id="menu-earning-card"
                          anchorEl={anchorEl}
                          keepMounted
                          open={Boolean(anchorEl)}
                          onClose={handleClose}
                          variant="selectedMenu"
                          anchorOrigin={{
                            vertical: 'bottom',
                            horizontal: 'right'
                          }}
                          transformOrigin={{
                            vertical: 'top',
                            horizontal: 'right'
                          }}
                        >
                          <MenuItem onClick={hanldeEditVehicle}>
                            <EditIcon sx={{ mr: 1.75 }} />
                            Editar
                          </MenuItem>

                          <MenuItem onClick={handleDeleteVehicle}>
                            <DeleteIcon sx={{ mr: 1.75 }} />
                            Eliminar
                          </MenuItem>
                        </Menu>
                      </Grid>
                    )}
                  </Grid>
                </Grid>
                <Grid item>
                  <Grid container alignItems="center">
                    <Grid item>
                      <Typography sx={{ fontSize: '2.125rem', fontWeight: 500, mr: 1, mt: 1.75, mb: 0.75 }}>
                        {capitalizerCustom(vehicle.brand)} - {capitalizerCustom(vehicle.model)}
                      </Typography>
                    </Grid>
                    <Grid item></Grid>
                  </Grid>
                </Grid>
                <Grid item sx={{ mb: 1.25 }}>
                  <Typography
                    sx={{
                      fontSize: '1rem',
                      fontWeight: 500,
                      color: theme.palette.secondary[200]
                    }}
                  >
                    {capitalizerCustom(vehicle.color)} - {vehicle.placa.toUpperCase()}
                  </Typography>
                </Grid>
              </Grid>
            </Box>
          </CardWrapper>
        </Box>
      )}
    </>
  );
};

VehicleCard.propTypes = {
  isLoading: PropTypes.bool,
  vehicle: PropTypes.object,
  isForCheck: PropTypes.bool,
  setVehicleId: PropTypes.func,
  vehicleId: PropTypes.number
};

export default VehicleCard;
