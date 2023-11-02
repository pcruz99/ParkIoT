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
          <Typography variant="body1">
            Presente el codigo QR al guardia cuando ingrese al estacionamiento para que pueda ser identificado.
          </Typography>
        </Box>
      </GeneralBack>
    </>
  );
};

export default QrcodeShow;
