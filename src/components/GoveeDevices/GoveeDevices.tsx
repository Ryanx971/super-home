import { Box, Button, Grid } from '@mui/material';
import { useTranslation } from 'react-i18next';
import { useDevices } from '../../hooks/govee.hooks';
import { Device } from '../../models/govee-device.model';
import AlertActions from '../AlertActions';
import GoveeLightDevice from '../GoveeLightDevice';
import DevicesSkeleton from '../Skeletons/DevicesSkeleton';

import './GoveeDevices.scss';

const GoveeDevices = () => {
  const { t } = useTranslation();
  const { data, error, isFetching, isError, refetch } = useDevices();
  const goveeDevices: Device[] | undefined = data;

  return (
    <Box>
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
            goveeDevices?.map((device, index) => {
              return (
                <Grid item xs={12} md={6} lg={4} key={index}>
                  <GoveeLightDevice device={device} />
                </Grid>
              );
            })}
        </Grid>
      </Box>
    </Box>
  );
};

export default GoveeDevices;

