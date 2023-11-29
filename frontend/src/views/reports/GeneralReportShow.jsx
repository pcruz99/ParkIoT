//React
import { useEffect, useState } from 'react';

//MUI
import { Grid, Box } from '@mui/material';

//redux
import { useSelector } from 'react-redux';

//Scripts
import caxios from '../../scripts/customAxios.js';

//Custom
import GeneralBack from 'components/GeneralBack';
import TotalGrowthBarChart from 'components/Reports/TotalGrowthBarChart';

const ReportShow = () => {
  const account = useSelector((state) => state.account);
  const cax = caxios(account.token);

  const [isLoading, setIsLoading] = useState(true);
  const [registers, setRegisters] = useState();

  const getDataAPI = async () => {
    await cax
      .get('/parking/registertotalday/')
      .then((response) => {
        setRegisters(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  useEffect(() => {
    getDataAPI();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    if (registers) {
      setIsLoading(false);
    }
  }, [registers]);

  return (
    <>
      <GeneralBack title="Reporte General">
        <Box textAlign={'center'}>
          <Grid container spacing={2} sx={{ alignItems: 'center', display: 'flex' }}>
            <Grid item xs={12} lg={12}>
              <TotalGrowthBarChart isLoading={isLoading} registers={registers} />
            </Grid>
          </Grid>
        </Box>
      </GeneralBack>
    </>
  );
};

export default ReportShow;
