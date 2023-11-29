// material-ui
// import { useTheme } from '@mui/material/styles';
import PropTypes from 'prop-types';
import ImagenIcon from 'assets/images/logo.png';

const Logo = ({ width }) => {
  // const theme = useTheme();
  return <img src={ImagenIcon} alt="ParkIoT" width={width} />;
};

Logo.propTypes = {
  width: PropTypes.number
};

export default Logo;
