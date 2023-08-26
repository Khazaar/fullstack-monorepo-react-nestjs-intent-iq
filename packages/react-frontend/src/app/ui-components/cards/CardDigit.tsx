import { Box, Card, Divider, Typography } from '@mui/material';
import { observer } from 'mobx-react';
import React from 'react';

interface CardDigitProps {
  title: string;
  digit: number;
  footer?: React.ReactNode;
  image: React.ReactNode;
}

const CardDigit: React.FC<CardDigitProps> = (props: CardDigitProps) => {
  return (
    <Card
      sx={{
        display: 'flex',
        flexDirection: 'row',
        minWidth: '250px',
        padding: 1,
        overflow: 'visible',
      }}
    >
      <Box sx={{ marginTop: -2 }}>{props.image}</Box>

      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'flex-end',
          width: '100%',
        }}
      >
        <Typography variant="body2">{props.title}</Typography>
        <Typography variant="h5">{props.digit}</Typography>
      </Box>
      {props.footer && <Divider />}
      {props.footer && <Box>{props.footer}</Box>}
    </Card>
  );
};

export default observer(CardDigit);
