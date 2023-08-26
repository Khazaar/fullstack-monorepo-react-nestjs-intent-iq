import React from 'react';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import TextField, { TextFieldProps } from '@mui/material/TextField';
import { observer } from 'mobx-react-lite';
import { useAppContext } from '../../context/appStateContextProvider';
import { Box } from '@mui/material';
import dayjs from 'dayjs';
import { colorStyles } from '../../assets/styles/theme';

const DateSetter: React.FC = observer(() => {
  const appContext = useAppContext();
  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <Box sx={{ display: 'flex', gap: 2 }}>
        <DatePicker
          label="Start Date"
          value={dayjs(appContext.startDate)}
          onChange={(date) => appContext.setStartDate(date!.toDate())}
          sx={{
            backgroundColor: colorStyles.greyLight,
            '& .MuiInputLabel-root': {
              top: '12px', // Adjust this according to your requirements
            },
            '& .MuiInputBase-root': {
              paddingTop: '6px', // Adjust padding to remove the gap
              paddingBottom: '6px', // Adjust this if needed
            },
          }}
        />
        <DatePicker
          label="End Date"
          value={dayjs(appContext.endDate)}
          onChange={(date) => appContext.setEndDate(date!.toDate())}
          sx={{
            backgroundColor: colorStyles.greyLight,
            '& .MuiInputLabel-root': {
              top: '12px', // Adjust this according to your requirements
            },
            '& .MuiInputBase-root': {
              paddingTop: '6px', // Adjust padding to remove the gap
              paddingBottom: '6px', // Adjust this if needed
            },
          }}
        />
      </Box>
    </LocalizationProvider>
  );
});

export default DateSetter;
