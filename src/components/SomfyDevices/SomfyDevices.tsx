import { Box, Button, Grid } from '@mui/material';
import { useTranslation } from 'react-i18next';
import { useDevices } from '../../hooks/somfy.hooks';
import {
  LightDevice,
  ShutterDeviceModel,
} from '../../interfaces/somfy/device-state.interface';
import { Device, DeviceType } from '../../interfaces/somfy/device.interface';
import AlertActions from '../AlertActions';
import ShutterDevice from '../ShutterDevice';
import DevicesSkeleton from '../Skeletons/DevicesSkeleton';
import SomfyLightDevice from '../SomfyLightDevice';

const SomfyDevices = () => {
  const { t } = useTranslation();
  const { data, isFetching, isError, refetch } = useDevices();

  const somfyDevices: Device[] | undefined = data;
  return (
    <Box>
      <Box sx={{ backgroundColor: 'inherit', borderRadius: '25px' }}>
        {isError && (
          <AlertActions
            severity="error"
            message={t('homePage.somfy.error')}
            children={
              <Button color="inherit" size="small" onClick={() => refetch()}>
                {t('homePage.reloadDevices')}
              </Button>
            }
          />
        )}
        {isFetching && <DevicesSkeleton repeat={9} height={250} />}
        {!isFetching && !isError && (
          <Grid
            container
            spacing={6}
            columnSpacing={8}
            data-testid="devices-list"
          >
            {somfyDevices?.map((device, index) => {
              return (
                <Grid item xs={12} md={6} lg={4} key={index}>
                  {device.controllableName === DeviceType.LIGHT && (
                    <SomfyLightDevice device={device as LightDevice} />
                  )}
                  {device.controllableName === DeviceType.SHUTTER && (
                    <ShutterDevice device={device as ShutterDeviceModel} />
                  )}
                </Grid>
              );
            })}
          </Grid>
        )}
      </Box>
    </Box>
  );
};

export default SomfyDevices;

