import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import axios from 'axios';
// import MainCard from 'ui-component/cards/MainCard';
import { Box, Typography } from '@mui/material';
// import { Typography } from '@mui/material'

import QrcodeCard from 'components/QrcodeCard';
import configData from '../../config';
import GeneralBack from 'components/GeneralBack';

const QrcodeShow = () => {
  const account = useSelector((state) => state.account);
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
        console.log(error);
        setQrcode(null);
      });
  };

  useEffect(() => {
    callApi();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <>
      <GeneralBack title="Codigo QR">
        <Box textAlign={'center'}>
          <QrcodeCard qrcode={qrcode} />
        </Box>
        <Box textAlign={'left'} sx={{ margin: 4 }}>
          <Typography variant="h3">Como usar:</Typography>
          <Typography variant="body1" align='justify'>
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
