import PropTypes from 'prop-types';

// material-ui
import { styled } from '@mui/material/styles';
import { Box } from '@mui/material';

// project imports
import MainCard from 'ui-component/cards/MainCard';

// styles
const CardWrapper = styled(MainCard)(({ theme }) => ({
  overflow: 'hidden',
  position: 'relative',
  margin: 15,
  padding: 3,

  '&:after': {
    content: '""',
    position: 'absolute',
    width: 210,
    height: 210,
    background: `linear-gradient(210.04deg, ${theme.palette.warning.dark} -50.94%, rgba(144, 202, 249, 0) 83.49%)`,
    borderRadius: '50%',
    top: -30,
    right: -180
  },
  '&:before': {
    content: '""',
    position: 'absolute',
    width: 210,
    height: 210,
    background: `linear-gradient(140.9deg, ${theme.palette.warning.dark} -14.02%, rgba(144, 202, 249, 0) 70.50%)`,
    borderRadius: '50%',
    top: -160,
    right: -130
  }
}));

// ==============================|| DASHBOARD - TOTAL INCOME LIGHT CARD ||============================== //

const GeneralBack = ({ children, title }) => {
  return (
    <>
      <CardWrapper border={false} content={false} title={title}>
        <Box sx={{ p: 2 }}>{children}</Box>
      </CardWrapper>
    </>
  );
};

GeneralBack.propTypes = {
  isLoading: PropTypes.bool
};

export default GeneralBack;
