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
        minWidth: '250px',
        padding: 1,
        overflow: 'visible',
        minHeight: '75px',
      }}
    >
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          width: '100%',
        }}
      >
        <Box
          sx={{
            display: 'flex',
            width: '100%',
          }}
        >
          <Box sx={{ marginTop: -2 }}>{props.image}</Box>
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'flex-end',
              justifyContent: 'flex-end',
              width: '100%',
            }}
          >
            <Typography variant="body2">{props.title}</Typography>
            <Typography variant="h5">{props.digit}</Typography>
          </Box>
        </Box>
        {props.footer && (
          <Box
            sx={{
              display: 'flex',
            }}
          >
            <Divider />
            <Box>{props.footer}</Box>
          </Box>
        )}
      </Box>
    </Card>
  );
};

export default observer(CardDigit);
