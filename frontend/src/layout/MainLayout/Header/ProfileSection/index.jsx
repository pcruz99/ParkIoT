import { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import configData from '../../../../config';

import { capitalizerCustom } from '../../../../scripts/cambiarSize.js';

// material-ui
import { useTheme } from '@mui/material/styles';
import {
  // Avatar,
  Box,
  Chip,
  ClickAwayListener,
  Divider,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Paper,
  Popper,
  Stack,
  Typography
} from '@mui/material';

// third-party
// import PerfectScrollbar from 'react-perfect-scrollbar';
import axios from 'axios';
// project imports
import MainCard from 'ui-component/cards/MainCard';
import Transitions from 'ui-component/extended/Transitions';
// assets
import { IconLogout, IconSettings } from '@tabler/icons';
import { QrCode, DirectionsCar } from '@mui/icons-material';

import { LOGOUT } from 'store/actions';
// ==============================|| PROFILE MENU ||============================== //

const ProfileSection = () => {
  const theme = useTheme();
  const navigate = useNavigate();
  const account = useSelector((state) => state.account);
  const dispatcher = useDispatch();

  const customization = useSelector((state) => state.customization);

  // const [sdm, setSdm] = useState(true);
  // const [value, setValue] = useState('');
  // const [notification, setNotification] = useState(false);

  const [selectedIndex, setSelectedIndex] = useState(-1);
  const [open, setOpen] = useState(false);
  /**
   * anchorRef is used on different componets and specifying one type leads to other components throwing an error
   * */
  const anchorRef = useRef(null);
  const handleLogout = async () => {
    axios
      .post(
        `${configData.API_SERVER}/api/users/logout`,
        { token: `${account.token}` },
        {
          headers: {
            Authorization: `${account.token}`
          }
        }
      )
      .then(() => {
        // response.data?.success ? dispatcher({ type: LOGOUT }) : console.log('res=', res.data.msg);
        dispatcher({ type: LOGOUT });
        navigate('/login');
      })
      .catch(() => {
        dispatcher({ type: LOGOUT });
        navigate('/login');
        // console.log('error-', error);
      });
  };

  const handleClose = (event) => {
    if (anchorRef.current && anchorRef.current.contains(event.target)) {
      return;
    }
    setOpen(false);
  };

  const handleListItemClick = (event, index, route = '') => {
    setSelectedIndex(index);
    handleClose(event);

    if (route && route !== '') {
      navigate(route);
    }
  };
  const handleToggle = () => {
    setOpen((prevOpen) => !prevOpen);
  };

  const prevOpen = useRef(open);
  useEffect(() => {
    if (prevOpen.current === true && open === false) {
      anchorRef.current.focus();
    }

    prevOpen.current = open;
  }, [open]);

  useEffect(() => {
    new Promise((resolve) => {
      setTimeout(() => {
        resolve(-1);
      }, 10000);
    }).then((res) => {
      setSelectedIndex(res);
    });
  }, [selectedIndex]);

  return (
    <>
      <Chip
        sx={{
          height: '48px',
          alignItems: 'center',
          borderRadius: '27px',
          transition: 'all .2s ease-in-out',
          borderColor: theme.palette.primary.light,
          backgroundColor: theme.palette.primary.light,
          '&[aria-controls="menu-list-grow"], &:hover': {
            borderColor: theme.palette.primary.main,
            background: `${theme.palette.primary.main}!important`,
            color: theme.palette.primary.light,
            '& svg': {
              stroke: theme.palette.primary.light
            }
          },
          '& .MuiChip-label': {
            lineHeight: 0
          }
        }}
        label={<IconSettings stroke={1.5} size="1.5rem" color={theme.palette.primary.main} />}
        variant="outlined"
        ref={anchorRef}
        aria-controls={open ? 'menu-list-grow' : undefined}
        aria-haspopup="true"
        onClick={handleToggle}
        color="primary"
      />
      <Popper
        placement="bottom-end"
        open={open}
        anchorEl={anchorRef.current}
        role={undefined}
        transition
        disablePortal
        popperOptions={{
          modifiers: [
            {
              name: 'offset',
              options: {
                offset: [0, 14]
              }
            }
          ]
        }}
      >
        {({ TransitionProps }) => (
          <Transitions in={open} {...TransitionProps}>
            <Paper>
              <ClickAwayListener onClickAway={handleClose}>
                <MainCard border={false} elevation={16} content={false} boxShadow shadow={theme.shadows[16]}>
                  <Box sx={{ p: 2 }}>
                    <Stack>
                      <Stack direction="row" spacing={0.5} alignItems="center">
                        <Typography variant="h4">Hola,</Typography>
                        <Typography component="span" variant="h4" sx={{ fontWeight: 400 }}>
                          {capitalizerCustom(account?.user?.first_name)} {capitalizerCustom(account?.user?.last_name)}
                        </Typography>
                      </Stack>
                      <Typography variant="subtitle2">
                        <b>Rol:</b> {capitalizerCustom(account?.user?.role)}
                      </Typography>
                      <Typography variant="subtitle2">
                        <b>Nombre de Usuario:</b> {account?.user?.username}
                      </Typography>
                      <Typography variant="subtitle2">
                        <b>Correo:</b> {account?.user?.email}
                      </Typography>
                      <Typography variant="subtitle2">
                        <b>Cedula:</b> {account?.user?.cedula}
                      </Typography>
                    </Stack>
                  </Box>
                  {/* <PerfectScrollbar style={{ height: '100%', maxHeight: 'calc(100vh - 250px)', overflowX: 'hidden' }}> */}
                  <Box sx={{ p: 1 }}>
                    <Divider />
                    <List
                      component="nav"
                      sx={{
                        width: '100%',
                        maxWidth: 350,
                        minWidth: 300,
                        backgroundColor: theme.palette.background.paper,
                        borderRadius: '10px',
                        [theme.breakpoints.down('md')]: {
                          minWidth: '100%'
                        },
                        '& .MuiListItemButton-root': {
                          mt: 0.5
                        }
                      }}
                    >
                      {(account.user.role === 'client' || account.user.role === 'admin') && (
                        <Box>
                          <ListItemButton
                            sx={{ borderRadius: `${customization.borderRadius}px` }}
                            selected={selectedIndex === 1}
                            onClick={(event) => handleListItemClick(event, 1, '/vehicle/show')}
                          >
                            <ListItemIcon>
                              <DirectionsCar stroke={1.5} size="1.3rem" />
                            </ListItemIcon>
                            <ListItemText primary={<Typography variant="body2">Registrar Vehículos</Typography>} />
                          </ListItemButton>
                          <ListItemButton
                            sx={{ borderRadius: `${customization.borderRadius}px` }}
                            selected={selectedIndex === 2}
                            onClick={(event) => handleListItemClick(event, 2, '/qrcode')}
                          >
                            <ListItemIcon>
                              <QrCode stroke={1.5} size="1.3rem" />
                            </ListItemIcon>
                            <ListItemText primary={<Typography variant="body2">Generar Código QR</Typography>} />
                          </ListItemButton>
                        </Box>
                      )}
                      <ListItemButton
                        sx={{ borderRadius: `${customization.borderRadius}px` }}
                        selected={selectedIndex === 4}
                        onClick={handleLogout}
                      >
                        <ListItemIcon>
                          <IconLogout stroke={1.5} size="1.3rem" />
                        </ListItemIcon>
                        <ListItemText primary={<Typography variant="body2">Cerrar Sesión</Typography>} />
                      </ListItemButton>
                    </List>
                  </Box>
                  {/* </PerfectScrollbar> */}
                </MainCard>
              </ClickAwayListener>
            </Paper>
          </Transitions>
        )}
      </Popper>
    </>
  );
};

export default ProfileSection;
