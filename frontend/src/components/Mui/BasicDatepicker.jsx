import * as React from 'react';
// import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import 'dayjs/locale/es';

export default function BasicDatePicker({ setPickDate }) {
  return (
    <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale="es">
      {/* <DemoContainer components={['DatePicker']}> */}
      <DatePicker        
        label="Fecha"
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
        sx={{width:250, height:80}}
      />
      {/* </DemoContainer> */}
    </LocalizationProvider>
  );
}
