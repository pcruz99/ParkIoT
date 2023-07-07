import { useSelector } from 'react-redux';

import { ThemeProvider } from '@mui/material/styles';
import { CssBaseline, StyledEngineProvider } from '@mui/material';

// routing
import Routes from 'routes';

// defaultTheme
import themes from 'themes';

// project imports
import NavigationScroll from 'layout/NavigationScroll';
import { useEffect } from 'react';
import { useNavigate } from 'react-router';
// ==============================|| APP ||============================== //

const App = () => {
  const customization = useSelector((state) => state.customization);
  
  //Personalizado miooooo
  const account = useSelector((state) => state.account);
  const navigate = useNavigate();  
  useEffect(()=>{
    !account.isLoggedIn ? navigate('/login'): navigate('/');
  },[]);

  return (
    <StyledEngineProvider injectFirst>
      <ThemeProvider theme={themes(customization)}>
        <CssBaseline />
        <NavigationScroll>
          <Routes />
        </NavigationScroll>
      </ThemeProvider>
    </StyledEngineProvider>
  );
};

export default App;
