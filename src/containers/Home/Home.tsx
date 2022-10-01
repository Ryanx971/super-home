import React from 'react';
import { Button, Container, Grid, Skeleton, Typography } from '@mui/material';
import DeviceCard from '../../components/devices';
import { useDevicesList } from '../../hooks/govee.hooks';
import { IDevice } from '../../models/govee-device.model';
import AlertActions from '../../components';

const Home = () => {
  const {
    data: response,
    error,
    isLoading,
    isError,
    refetch,
  } = useDevicesList();
  const goveeDevices: [IDevice] = response?.data?.devices;
  return (
    <Container>
      <Typography variant="h3" gutterBottom>
        Govee devices
      </Typography>
      {isError && error instanceof Error && (
        <AlertActions
          severity="error"
          message={error.message}
          children={
            <Button color="inherit" size="small" onClick={() => refetch()}>
              Reload devices
            </Button>
          }
        />
      )}
      <Grid container spacing={4} columnSpacing={4}>
        {isLoading && <DevicesSkeleton repeat={6} height={200} />}
        {goveeDevices &&
          goveeDevices.map((device, index) => {
            return (
              <Grid item xs={4} key={index}>
                <DeviceCard device={device} />
              </Grid>
            );
          })}
      </Grid>
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
      {Array.from(Array(repeat), (item, index) => {
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

