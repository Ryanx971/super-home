import {
  Box,
  Button,
  Container,
  Grid,
  Skeleton,
  Typography,
} from '@mui/material';
import { useTranslation } from 'react-i18next';
import AlertActions from '../../components/AlertActions';
import DeviceCard from '../../components/DeviceCard';
import { useDevicesList } from '../../hooks/govee.hooks';
import { IDevice } from '../../models/govee-device.model';

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
          {isFetching && <DevicesSkeleton repeat={9} height={250} />}
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
          <Grid item xs={4} key={index} height={height}>
            <Box className="device-skeleton">
              <Grid container>
                <Grid item xs={3}>
                  <Skeleton
                    variant="circular"
                    animation="wave"
                    width={60}
                    height={60}
                  />
                </Grid>
                <Grid item xs={2}></Grid>
                <Grid item xs={7} className="right-content">
                  <Skeleton
                    variant="circular"
                    animation="wave"
                    className="mr"
                    width={20}
                    height={20}
                  />
                  <Skeleton
                    variant="circular"
                    animation="wave"
                    className="mr"
                    width={20}
                    height={20}
                  />
                  <Skeleton
                    variant="circular"
                    animation="wave"
                    className="mr"
                    width={20}
                    height={20}
                  />
                  <Skeleton
                    variant="rounded"
                    animation="wave"
                    width={30}
                    height={20}
                  />
                </Grid>
              </Grid>
              <Skeleton
                className="slider"
                variant="text"
                width="100%"
                animation="wave"
                height={15}
              />
              <Skeleton
                variant="text"
                width="60%"
                animation="wave"
                height={40}
              />
              <Skeleton
                variant="text"
                width="25%"
                animation="wave"
                height={25}
              />
            </Box>
          </Grid>
        );
      })}
    </>
  );
};

export default Home;

