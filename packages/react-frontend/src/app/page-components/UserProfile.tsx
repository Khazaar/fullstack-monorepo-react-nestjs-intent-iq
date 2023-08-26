import { Box } from '@mui/material';
import React from 'react';
import { PageCustom } from '../ui-components/PageCustom';

export const UserProfile: React.FC = () => {
  return (
    <PageCustom title="User Profile">
      <Box
        sx={{ display: 'flex', flexDirection: 'column', gap: 3, width: '100%' }}
      ></Box>
    </PageCustom>
  );
};
