import { Box, Button, Container } from '@mui/material';
import { useTranslation } from 'react-i18next';
import AlertActions from '../../components/AlertActions';
import HeatingDevice from '../../components/HeatingDevice';
import HeatingSkeleton from '../../components/Skeletons/HeatingSkeleton';
import { useDevices } from '../../hooks/somfy.hooks';
import { DevicesList } from '../../interfaces/rest/response.interface';
import {
  HeatingInterfaceDevice,
  HeatingSensorDevice,
} from '../../interfaces/somfy/device-state.interface';
import theme from '../../utils/theme';

const Heating = () => {
  const { t } = useTranslation();
  const { data, isFetching, isError, refetch } = useDevices();
  const somfyDevices: DevicesList | undefined = data;
  const heatingInterface: HeatingInterfaceDevice | undefined =
    somfyDevices?.heating.interface;
  const heatingSensor: HeatingSensorDevice | undefined =
    somfyDevices?.heating.sensor;

  return (
    <Box sx={{ backgroundColor: theme.palette.lightGrey, paddingY: 6 }}>
      <Container>
        <Box
          sx={{
            backgroundColor: theme.palette.white,
            padding: 6,
            borderRadius: '15px',
          }}
        >
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
                  {t('homePage.reloadDevice')}
                </Button>
              }
            />
          )}

          {isFetching && (
            <Box sx={{ marginY: 4 }}>
              <HeatingSkeleton />
            </Box>
          )}

          {!isFetching && heatingInterface && heatingSensor && (
            <HeatingDevice
              title={t('heatingPage.title')}
              interfaceData={heatingInterface}
              sensor={heatingSensor}
              refresh={refetch}
            />
          )}
        </Box>
      </Container>
    </Box>
  );
};

export default Heating;

