import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import axios from 'axios';
import MainCard from 'ui-component/cards/MainCard';
import { Box } from '@mui/material';
// import { Typography } from '@mui/material'

import QrcodeCard from 'components/QrcodeCard';
import configData from '../../config';

const QrcodeShow = () => {
  const account = useSelector((state) => state.account);
  const [qrcode, setQrcode] = useState(null);

  const callApi = async () => {
    axios
      .get(`${configData.API_SERVER}/api/users/qrcode/${account.user?._id}`)
      .then((response) => {
        if(!response){
          throw new Error({"msg":"error"})
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
  }, []);

  return (
    <>
      <MainCard title="Codigo QR">
        <Box textAlign={'center'}>
          <QrcodeCard qrcode={qrcode} />
        </Box>
      </MainCard>
    </>
  );
};

export default QrcodeShow;
