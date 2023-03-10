import { Box, Button, Grid } from '@mui/material';
import { useTranslation } from 'react-i18next';
import { useDevices } from '../../hooks/govee.hooks';
import { Device } from '../../interfaces/govee/device.interface';
import AlertActions from '../AlertActions';
import GoveeLightDevice from '../GoveeLightDevice';
import DevicesSkeleton from '../Skeletons/DevicesSkeleton';

const GoveeDevices = () => {
  const { t } = useTranslation();
  const { data, isFetching, isError, refetch } = useDevices();
  const goveeDevices: Device[] | undefined = data;

  return (
    <Box>
      <Box sx={{ borderRadius: '25px' }}>
        {isError && (
          <AlertActions
            severity="error"
            message={t('homePage.govee.error')}
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
            {goveeDevices?.map((device, index) => {
              return (
                <Grid item xs={12} md={6} lg={4} key={index}>
                  <GoveeLightDevice device={device} />
                </Grid>
              );
            })}
          </Grid>
        )}
      </Box>
    </Box>
  );
};

export default GoveeDevices;

