import { Box } from '@mui/material';
import React from 'react';
import { PageCustom } from '../ui-components/PageCustom';

export const TableList: React.FC = () => {
  return (
    <PageCustom title="Table list">
      <Box
        sx={{ display: 'flex', flexDirection: 'column', gap: 3, width: '100%' }}
      ></Box>
    </PageCustom>
  );
};
