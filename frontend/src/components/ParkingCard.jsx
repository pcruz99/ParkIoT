import PropTypes from 'prop-types';

// material-ui
import { DirectionsCar, TwoWheeler } from '@mui/icons-material';
import { styled, useTheme } from '@mui/material/styles';
import { Avatar, Box, List, ListItem, ListItemAvatar, ListItemText, Typography } from '@mui/material';

// project imports
import MainCard from 'ui-component/cards/MainCard';
import TotalIncomeCard from 'ui-component/cards/Skeleton/TotalIncomeCard';

// assets

// styles
const CardWrapper = styled(MainCard)(({ theme, estado }) => ({
  backgroundColor:
    estado === 'libre' ? theme.palette.success.dark : estado === 'ocupado' ? theme.palette.error.dark : theme.palette.grey[800],
  color: theme.palette.primary.light,
  overflow: 'hidden',
  position: 'relative',
  '&:after': {
    content: '""',
    position: 'absolute',
    width: 210,
    height: 210,
    background: `linear-gradient(210.04deg, ${theme.palette.primary[200]} -50.94%, rgba(144, 202, 249, 0) 83.49%)`,
    borderRadius: '50%',
    top: -30,
    right: -180
  },
  '&:before': {
    content: '""',
    position: 'absolute',
    width: 210,
    height: 210,
    background: `linear-gradient(140.9deg, ${theme.palette.primary[200]} -14.02%, rgba(144, 202, 249, 0) 77.58%)`,
    borderRadius: '50%',
    top: -160,
    right: -130
  }
}));

// ==============================|| DASHBOARD - TOTAL INCOME DARK CARD ||============================== //

const ParkingCard = ({ isLoading, space }) => {
  const theme = useTheme();

  return (
    <>
      {isLoading ? (
        <TotalIncomeCard />
      ) : (
        <CardWrapper border={false} content={false} estado={space.state.toString()}>
          <Box sx={{ p: 2 }}>
            <List sx={{ py: 0 }}>
              <ListItem alignItems="center" disableGutters sx={{ py: 0 }}>
                <ListItemAvatar>
                  <Avatar
                    variant="rounded"
                    sx={{
                      ...theme.typography.commonAvatar,
                      ...theme.typography.largeAvatar,
                      backgroundColor: theme.palette.grey[100],
                      color: 'ThreeDDarkShadow'
                    }}
                  >
                    <Typography variant="h2" fontSize="inherit">
                      {space?.number}
                    </Typography>
                  </Avatar>
                </ListItemAvatar>
                <ListItemText
                  sx={{
                    py: 0,
                    mt: 0.45,
                    mb: 0.45
                  }}
                  primary={
                    <Box
                      textAlign="center"
                      sx={{
                        whiteSpace: 'nowrap',
                        overflow: 'hidden',
                        textOverflow: 'ellipsis'
                        // maxWidth: '90px',
                      }}
                    >
                      <Typography variant="h4" sx={{ color: 'primary.light', mt: 0.25 }}>
                        {space?.state.toUpperCase()}
                      </Typography>
                      {space.tipo === 'automovil' || space.tipo === 'camioneta' || space.tipo === 'furgoneta' ? (
                        <DirectionsCar stroke={1.5} size="1.3rem" sx={{ color: 'white' }} />
                      ) : (
                        <TwoWheeler stroke={1.5} size="1.3rem" sx={{ color: 'white' }} />
                      )}

                      <Typography variant="subtitle2" sx={{ color: 'primary.light', mt: 0.25 }}>
                        Ubicación
                      </Typography>
                      <Typography variant="h4" sx={{ color: 'primary.light' }}>
                        {space.location.toUpperCase()}
                      </Typography>
                    </Box>
                  }
                  // secondary={
                  //   <Box textAlign="center">
                  //     <Typography variant="h4" sx={{ color: 'primary.light', mt: 0.25 }}>
                  //       {space.state ? 'Libre' : 'Ocupado'}
                  //     </Typography>
                  //   </Box>
                  // }
                />
              </ListItem>
            </List>
          </Box>
        </CardWrapper>
      )}
    </>
  );
};

ParkingCard.propTypes = {
  isLoading: PropTypes.bool,
  space: PropTypes.object
};

export default ParkingCard;
