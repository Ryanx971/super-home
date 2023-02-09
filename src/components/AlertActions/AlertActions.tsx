import React from 'react';
import { Alert, AlertColor, AlertTitle, Box, Typography } from '@mui/material';
import { useTranslation } from 'react-i18next';

import './AlertActions.scss';

interface Props {
  severity: AlertColor;
  message: string;
  children?: React.ReactNode;
}

const AlertActions = ({ severity, message, children }: Props) => {
  const { t } = useTranslation();

  return (
    <Box className="alert-actions">
      <Alert severity={severity}>
        <AlertTitle>{t('common.error')}</AlertTitle>
        <Typography variant="body1" component="p">
          {message}
        </Typography>
        {children}
      </Alert>
    </Box>
  );
};

export default AlertActions;

