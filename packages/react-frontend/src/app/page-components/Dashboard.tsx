import React from 'react';
import { PageCustom } from '../ui-components/PageCustom';
import { Box, Button, Typography } from '@mui/material';
import CardDigit from '../ui-components/cards/CardDigit';
import copyImage from '../../assets/images/copy-icon-png-19.jpg';
import storeImage from '../../assets/images/store-icon.png';
import alertImage from '../../assets/images/alert-image.png';
import twitterImage from '../../assets/images/twitter-white2.png';
import { colorStyles } from '../../assets/styles/theme';
import { useAppContext } from '../../context/appStateContextProvider';
import { observer } from 'mobx-react';
import { fetchReports } from '../../services/fetchReports.service';
import CardChart from '../ui-components/cards/CardChart';
import LineChart from '../ui-components/charts/LineChart';
import DateSetter from '../ui-components/DateSetter';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import UpdateIcon from '@mui/icons-material/Update';

const Dashboard: React.FC = () => {
  const appContext = useAppContext();
  return (
    <PageCustom
      title="Dashboard"
      actionItem={
        <Box sx={{ display: 'flex', gap: 2, flexWrap: 'wrap' }}>
          <Button
            variant="contained"
            onClick={() => {
              appContext.setIsReportsLoading(true);
              fetchReports()
                .then((reports) => {
                  appContext.setReports(reports);
                  appContext.setIsReportsLoading(false);
                })
                .catch((error) => {
                  console.log(error);
                  appContext.setIsReportsLoading(false);
                });
            }}
          >
            Fetch reports
          </Button>
          <DateSetter></DateSetter>
        </Box>
      }
    >
      <Box
        sx={{ display: 'flex', flexDirection: 'column', gap: 3, width: '100%' }}
      >
        <Box
          sx={{
            display: 'flex',
            gap: 4,
            flexWrap: 'wrap',
            width: '100%',
            justifyContent: 'space-around',
          }}
        >
          <CardDigit
            title="Reports amount"
            digit={appContext.getReportsCount()}
            image={
              <Box
                component="img"
                sx={{
                  width: 70,
                  backgroundColor: colorStyles.orange,
                  padding: '5px',
                }}
                src={copyImage}
                alt="Reports amount"
              />
            }
          />
          <CardDigit
            title="Partner count"
            digit={appContext.getClientsCount()}
            image={
              <Box
                component="img"
                sx={{
                  width: 70,
                  backgroundColor: colorStyles.green,
                }}
                src={storeImage}
                alt="Partner count"
              />
            }
            footer={
              <Box sx={{ display: 'flex', gap: 2, alignItems: 'center' }}>
                <CalendarMonthIcon />
                <Typography variant="body2">{`Since ${
                  appContext.startDate ? appContext.startDate.toString() : ''
                }`}</Typography>
              </Box>
            }
          />
          <CardDigit
            title="Countries count"
            digit={appContext.getCountriesCount()}
            image={
              <Box
                component="img"
                sx={{
                  width: 70,
                  backgroundColor: colorStyles.red,
                }}
                src={alertImage}
                alt="Countries count"
              />
            }
          />
          <CardDigit
            title="Reports rate"
            digit={appContext.getAverageReportsPerDay()}
            image={
              <Box
                component="img"
                sx={{
                  width: 70,
                  backgroundColor: colorStyles.marine,
                  padding: 1,
                }}
                src={twitterImage}
                alt="Reports rate"
              />
            }
            footer={
              <Box sx={{ display: 'flex', gap: 2, alignItems: 'center' }}>
                <UpdateIcon />
                <Typography variant="body2">Per day</Typography>
              </Box>
            }
          />
        </Box>
        <Box
          sx={{
            display: 'flex',
            gap: 4,
            flexWrap: 'wrap',
            width: '100%',
            justifyContent: 'space-around',
          }}
        >
          <CardChart
            title="Weekly breakdown"
            subtitle="avg peer day"
            chart={
              <LineChart
                data={appContext.getReportsPerDayOfWeek()}
                backgroundColor={colorStyles.green}
              />
            }
          />
          <CardChart
            title="Breakdown by categories"
            subtitle="For the whole period"
            chart={
              <LineChart
                data={appContext.getReportsBreakdownByCategories()}
                backgroundColor={colorStyles.orange}
              />
            }
          />
          <CardChart
            title="Breakdown by countries"
            subtitle="For the whole period"
            chart={
              <LineChart
                data={appContext.getReportsBreakdownByCountries()}
                backgroundColor={colorStyles.red}
              />
            }
          />
        </Box>
      </Box>
    </PageCustom>
  );
};
export default observer(Dashboard);
