import { Box, Button, Grid, Typography } from '@mui/material';
import { useTranslation } from 'react-i18next';
import { useDevicesList } from '../../hooks/somfy.hooks';
import { Device, DeviceType } from '../../models/somfy-device.model';
import AlertActions from '../AlertActions';
import ShutterDevice from '../ShutterDevice';
import DevicesSkeleton from '../Skeletons/DevicesSkeleton';
import SomfyLightDevice from '../SomfyLightDevice';

import './SomfyDevices.scss';

const SomfyDevices = () => {
  const { t } = useTranslation();
  const { data, error, isFetching, isError, refetch } = useDevicesList();

  const somfyDevices: Device[] | undefined = data;
  return (
    <Box>
      <Box className="somfy-devices-list">
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
            somfyDevices?.map((device, index) => {
              return (
                <Grid item xs={12} md={6} lg={4} key={index}>
                  {device.controllableName === DeviceType.LIGHT && (
                    <SomfyLightDevice device={device} />
                  )}
                  {device.controllableName === DeviceType.SHUTTER && (
                    <ShutterDevice device={device} />
                  )}
                </Grid>
              );
            })}
        </Grid>
      </Box>
    </Box>
  );
};

export default SomfyDevices;

