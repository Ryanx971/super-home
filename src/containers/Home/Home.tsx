import React from 'react';
import {
  Box,
  Button,
  Container,
  Grid,
  Skeleton,
  Typography,
} from '@mui/material';
import AlertActions from '../../components/AlertActions';
import DeviceCard from '../../components/DeviceCard';
import { useDevicesList } from '../../hooks/govee.hooks';
import { IDevice } from '../../models/govee-device.model';
import { useTranslation } from 'react-i18next';

import './Home.scss';

const Home = () => {
  const { t } = useTranslation();
  const { data, error, isFetching, isError, refetch } = useDevicesList();
  const goveeDevices: [IDevice] = data?.devices;

  return (
    <Container className="home-container">
      <Box className="home-title">
        <Typography variant="h4">{t('homePage.title')}</Typography>
        <div className="line"></div>
      </Box>
      <Box className="devices-list">
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
          {isFetching && <DevicesSkeleton repeat={6} height={200} />}
          {!isFetching &&
            goveeDevices.map((device, index) => {
              return (
                <Grid item xs={12} md={6} lg={4} key={index}>
                  <DeviceCard device={device} />
                </Grid>
              );
            })}
        </Grid>
      </Box>
    </Container>
  );
};

interface IDevicesSkeleton {
  repeat: number;
  height: number;
}

const DevicesSkeleton = ({ repeat, height }: IDevicesSkeleton) => {
  return (
    <>
      {Array.from(Array(repeat), (item: number, index: number) => {
        return (
          <Grid item xs={4} key={index}>
            <Skeleton variant="rounded" height={height} />
          </Grid>
        );
      })}
    </>
  );
};

export default Home;

