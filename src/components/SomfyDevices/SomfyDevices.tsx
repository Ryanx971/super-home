import { Box, Button, Grid } from '@mui/material';
import { useTranslation } from 'react-i18next';
import { useDevices } from '../../hooks/somfy.hooks';
import {
  Device,
  DeviceType,
  LightDevice,
  ShutterDeviceModel,
} from '../../interfaces/somfy.interface';
import AlertActions from '../AlertActions';
import ShutterDevice from '../ShutterDevice';
import DevicesSkeleton from '../Skeletons/DevicesSkeleton';
import SomfyLightDevice from '../SomfyLightDevice';

const SomfyDevices = () => {
  const { t } = useTranslation();
  const { data, error, isFetching, isError, refetch } = useDevices();

  const somfyDevices: Device[] | undefined = data;
  return (
    <Box>
      <Box sx={{ backgroundColor: 'inherit', borderRadius: '25px' }}>
        {isError && error instanceof Error && (
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
        <Grid container spacing={6} columnSpacing={8}>
          {isFetching && <DevicesSkeleton repeat={9} height={250} />}
          {!isFetching &&
            somfyDevices?.map((device, index) => {
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
      </Box>
    </Box>
  );
};

export default SomfyDevices;

