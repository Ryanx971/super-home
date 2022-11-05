import React from 'react';
import AlertActions from '../AlertActions';
import LightDevice from '../LightDevice';
import DevicesSkeleton from '../Skeletons/DevicesSkeleton';
import { useDevicesList } from '../../hooks/govee.hooks';
import { Device } from '../../models/govee-device.model';
import { Box, Button, Grid, Typography } from '@mui/material';
import { useTranslation } from 'react-i18next';

import './GoveeDevices.scss';

const GoveeDevices = () => {
  const { t } = useTranslation();
  const { data, error, isFetching, isError, refetch } = useDevicesList();
  const goveeDevices: [Device] = data?.devices;

  return (
    <Box>
      <Box className="title">
        <Typography variant="h4">{t('homePage.govee.title')}</Typography>
        <div className="line"></div>
      </Box>
      <Box className="govee-devices-list">
        {isError && error instanceof Error && (
          <AlertActions
            severity="error"
            message={error.message}
            children={
              <Button color="inherit" size="small" onClick={() => refetch()}>
                {t('homePage.reloadDevices')}
              </Button>
            }
          />
        )}
        <Grid container spacing={6} columnSpacing={8}>
          {isFetching && <DevicesSkeleton repeat={9} height={250} />}
          {!isFetching &&
            goveeDevices.map((device, index) => {
              return (
                <Grid item xs={12} md={6} lg={4} key={index}>
                  <LightDevice device={device} />
                </Grid>
              );
            })}
        </Grid>
      </Box>
    </Box>
  );
};

export default GoveeDevices;

