import { Box, Button, Grid } from '@mui/material';
import { useTranslation } from 'react-i18next';
import { useDevices } from '../../hooks/somfy.hooks';
import { DevicesList } from '../../interfaces/rest/response.interface';
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

  const somfyDevices: DevicesList | undefined = data;

  return (
    <Box>
      <Box sx={{ backgroundColor: 'inherit', borderRadius: '25px' }}>
        {isError && (
          <AlertActions
            severity="error"
            message={t('homePage.somfy.error')}
            children={
              <Button
                color="inherit"
                size="small"
                onClick={() => refetch()}
                sx={{ width: 'auto', padding: 1 }}
              >
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
            {somfyDevices?.lights.map((device, index) => (
              <Grid item xs={12} md={6} lg={4} key={index}>
                <SomfyLightDevice device={device as LightDevice} />
              </Grid>
            ))}

            {somfyDevices?.shutters.map((device, index) => (
              <Grid item xs={12} md={6} lg={4} key={index}>
                <ShutterDevice device={device as ShutterDeviceModel} />
              </Grid>
            ))}
          </Grid>
        )}
      </Box>
    </Box>
  );
};

export default SomfyDevices;

