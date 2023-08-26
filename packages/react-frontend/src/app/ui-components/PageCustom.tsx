import { Box, Typography } from '@mui/material';
import React from 'react';

interface PageCuntomProps {
  title: string;
  actionItem?: React.ReactNode;
  children: React.ReactNode;
}

export const PageCustom: React.FC<PageCuntomProps> = (
  props: PageCuntomProps
) => {
  return (
    <Box
      sx={{
        display: 'flex',
        width: '100%',
        height: '100%',
        flexDirection: 'column',
        gap: 4,
      }}
    >
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
          flexWrap: 'wrap',
          gap: 2,
        }}
      >
        <Typography variant="h4">{props.title}</Typography>
        {props.actionItem && <Box>{props.actionItem}</Box>}
      </Box>
      <Box
        sx={{
          display: 'flex',
          width: '100%',
          height: '100%',
          gap: 4,
        }}
      >
        {props.children}
      </Box>
    </Box>
  );
};
