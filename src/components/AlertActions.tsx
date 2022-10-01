import React from 'react';
import { Alert, AlertColor, AlertTitle, Box } from '@mui/material';

interface IAlertAction {
  severity: AlertColor | undefined;
  message: string;
  children?: React.ReactNode;
}

const AlertAction = ({ severity, message, children }: IAlertAction) => {
  return (
    <Box>
      <Alert severity={severity}>
        <AlertTitle>Error</AlertTitle>
        <p>{message}</p>
        {children}
      </Alert>
    </Box>
  );
};

export default AlertAction;

