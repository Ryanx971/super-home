import React from 'react';
import { Alert, AlertColor, AlertTitle, Box } from '@mui/material';
import { useTranslation } from 'react-i18next';

import './AlertActions.scss';

interface IAlertAction {
  severity: AlertColor;
  message: string;
  children?: React.ReactNode;
}

const AlertActions = ({ severity, message, children }: IAlertAction) => {
  const { t } = useTranslation();

  return (
    <Box className="alert-actions">
      <Alert severity={severity}>
        <AlertTitle>{t('common.error')}</AlertTitle>
        <p>{message}</p>
        {children}
      </Alert>
    </Box>
  );
};

export default AlertActions;

