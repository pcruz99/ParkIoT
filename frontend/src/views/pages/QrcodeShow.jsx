//react
import { useEffect, useState } from 'react';
//redux
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { LOGOUT } from 'store/actions';
//axios
import axios from 'axios';
//MUI
import { Box, Typography } from '@mui/material';
//custom
import QrcodeCard from 'components/QrcodeCard';
import configData from '../../config';
import GeneralBack from 'components/GeneralBack';
import Spinner from 'components/Spinner';

const QrcodeShow = () => {
  const account = useSelector((state) => state.account);
  const dispatcher = useDispatch();
  const [qrcode, setQrcode] = useState(null);

  const callApi = async () => {
    axios
      .get(`${configData.API_SERVER}/api/users/qrcode/${account.user?._id}/`, {
        headers: {
          Authorization: `${account.token}`
        }
      })
      .then((response) => {
        if (!response) {
          throw new Error({ msg: 'error' });
        }
        setQrcode(response.data.qrcode);
      })
      .catch((error) => {
        if (error?.response?.status === 403) {
          dispatcher({ type: LOGOUT });
        }
        setQrcode(null);
      });
  };

  useEffect(() => {
    callApi();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <>
      <GeneralBack title="Código QR">
        {!qrcode ? (
          <Spinner />
        ) : (
          <Box display="flex" justifyContent="center" alignContent="center">
            <QrcodeCard qrcode={qrcode} />
          </Box>
        )}
        <Box textAlign={'left'} sx={{ margin: 4 }}>
          <Typography variant="h3">Como usar:</Typography>
          <Typography variant="body1" align="justify">
            {`Al ingresar al estacionamiento, asegúrate de mostrar el código QR al guardia para que pueda identificarte correctamente. Este
              código QR es esencial para tu identificación tanto en la entrada como en la salida del parqueadero. Por favor, ten en cuenta que
              es necesario presentar el código en ambas ocasiones para garantizar un registro preciso de tu ingreso y salida. ¡Gracias por tu
              colaboración y disfruta de tu estancia en nuestro estacionamiento!`}
          </Typography>
        </Box>
      </GeneralBack>
    </>
  );
};

export default QrcodeShow;
