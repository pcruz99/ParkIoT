import * as React from 'react';
import PropTypes from 'prop-types';
// import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import dayjs from 'dayjs';
import 'dayjs/locale/es';

const BasicDatepicker = ({ pickDate, setPickDate }) => {
  const { day, month, year } = pickDate;
  return (
    <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale="es">
      {/* <DemoContainer components={['DatePicker']}> */}
      <DatePicker
        label="Fecha"
        value={dayjs(`${year}-${month}-${day}`)}
        onChange={(e) => {
          if (e) {
            setPickDate({ day: e.$D, month: e.$M + 1, year: e.$y });
          }
        }}
        format="DD/MM/YYYY"
        slotProps={{
          textField: {
            helperText: 'Eliga una Fecha',
            required: true
          }
        }}
        sx={{ width: 250, height: 80 }}
      />
      {/* </DemoContainer> */}
    </LocalizationProvider>
  );
};

BasicDatepicker.propTypes = {
  pickDate: PropTypes.object,
  setPickDate: PropTypes.func
};

export default BasicDatepicker;
