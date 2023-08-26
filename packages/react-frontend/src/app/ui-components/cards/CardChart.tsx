import { Box, Card, Divider, Typography } from '@mui/material';
import { observer } from 'mobx-react';
import React from 'react';

interface CardChartProps {
  title: string;
  subtitle: string;
  chart: React.ReactNode;
  footerText: string;
}

const CardChart: React.FC<CardChartProps> = (props: CardChartProps) => {
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
      <Box>
        <Typography variant="body2">{props.footerText}</Typography>
      </Box>
    </Card>
  );
};

export default observer(CardChart);
