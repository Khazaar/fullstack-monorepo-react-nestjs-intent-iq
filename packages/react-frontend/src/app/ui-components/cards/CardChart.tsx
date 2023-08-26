import { Box, Card, Divider, Typography } from '@mui/material';
import { observer } from 'mobx-react';
import { useAppContext } from 'packages/react-frontend/src/context/appStateContextProvider';
import React from 'react';
import AccessTimeIcon from '@mui/icons-material/AccessTime';

interface CardChartProps {
  title: string;
  subtitle: string;
  chart: React.ReactNode;
}

const CardChart: React.FC<CardChartProps> = (props: CardChartProps) => {
  const appContext = useAppContext();
  const footerString = `Starting from ${
    appContext.startDate ? appContext.startDate.toString() : ''
  }`;
  return (
    <Card
      sx={{
        display: 'flex',
        flexDirection: 'column',
        maxWidth: '350px',
        minWidth: '350px',
        padding: 1,
        gap: 2,
        overflow: 'visible',
      }}
    >
      <Box sx={{ marginTop: -2 }}> {props.chart}</Box>
      <Box>
        <Typography variant="h6">{props.title}</Typography>
      </Box>
      <Box>
        <Typography variant="body2">{props.subtitle}</Typography>
      </Box>
      <Divider />
      <Box sx={{ display: 'flex', gap: 2, alignItems: 'center' }}>
        <AccessTimeIcon />
        <Typography variant="body2">{footerString}</Typography>
      </Box>
    </Card>
  );
};

export default observer(CardChart);
