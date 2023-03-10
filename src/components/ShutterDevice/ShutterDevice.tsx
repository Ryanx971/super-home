import {
  Blinds,
  Favorite,
  RefreshOutlined,
  ReportProblem,
  WifiOffOutlined,
  WifiOutlined,
} from '@mui/icons-material';
import {
  Box,
  Button,
  Grid,
  IconButton,
  Slider,
  Typography,
} from '@mui/material';
import { useQueryClient } from '@tanstack/react-query';
import { useTranslation } from 'react-i18next';
import { useDevice, useSendCommand } from '../../hooks/somfy.hooks';
import { DeviceControlPayload } from '../../interfaces/somfy/device-control.interface';
import { ShutterDeviceModel } from '../../interfaces/somfy/device-state.interface';
import theme from '../../utils/theme';
import Spinner from '../Spinner';

interface Props {
  device: ShutterDeviceModel;
}

const ShutterDevice = ({ device }: Props) => {
  const { t } = useTranslation();
  const queryClient = useQueryClient();
  const {
    isLoading: isCommandLoading,
    isError: isCommandError,
    mutate: sendCommand,
  } = useSendCommand();
  const {
    isFetching: getDeviceFetching,
    isError: getDeviceIsError,
    refetch: getDeviceRefetch,
  } = useDevice(device.deviceURL);

  const openLevel = (): number => {
    return 100 - device.states.closeLevel;
  };

  const handleShutterLevelChange = (value: number | number[]): void => {
    const newCloseLevel: number = 100 - Number(value);
    const payload: DeviceControlPayload = {
      label: t('payload.shutter.levelUpdate.label', {
        value,
        label: device.label,
      }),
      actions: [
        {
          commands: [
            {
              name: 'setPosition',
              parameters: [newCloseLevel],
            },
          ],
          deviceURL: device.deviceURL,
        },
      ],
    };
    sendCommand(payload, {
      onSuccess: () => {
        queryClient.setQueryData(
          ['somfy-devices'],
          (currentDevices: ShutterDeviceModel[] | undefined) => {
            const currentDevice: ShutterDeviceModel | undefined =
              currentDevices?.find(
                (deviceItem: ShutterDeviceModel) =>
                  deviceItem.deviceURL === device.deviceURL
              );
            if (currentDevice) {
              currentDevice.states = {
                ...currentDevice.states,
                closeLevel: newCloseLevel,
                closeTarget: newCloseLevel,
                isOpen: newCloseLevel !== 100,
              };
            }
            return currentDevices;
          }
        );
      },
    });
  };

  const setFavoritePosition = (): void => {
    const payload: DeviceControlPayload = {
      label: t('payload.shutter.favoritePosition.label', {
        label: device.label,
      }),
      actions: [
        {
          commands: [
            {
              name: 'my',
            },
          ],
          deviceURL: device.deviceURL,
        },
      ],
    };
    sendCommand(payload, {
      onSuccess: () => {
        queryClient.setQueryData(
          ['somfy-devices'],
          (currentDevices: ShutterDeviceModel[] | undefined) => {
            const currentDevice: ShutterDeviceModel | undefined =
              currentDevices?.find(
                (deviceItem: ShutterDeviceModel) =>
                  deviceItem.deviceURL === device.deviceURL
              );
            if (currentDevice) {
              // Close level became memorized position
              const closeLevel: number =
                currentDevice?.states.memorized1Position;
              currentDevice.states = {
                ...currentDevice.states,
                closeLevel,
                closeTarget: closeLevel,
                isOpen: closeLevel !== 100,
              };
            }
            return currentDevices;
          }
        );
      },
    });
  };

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'flex-start',
        padding: 4,
        position: 'relative',
        borderRadius: '25px',
        backgroundColor:
          isCommandLoading || getDeviceFetching
            ? theme.palette.grey40
            : theme.palette.white,
        opacity: isCommandLoading || getDeviceFetching ? 0.5 : 1,
        boxShadow: '0px 1px 5px rgba(179, 167, 255, 0.15);',
      }}
    >
      {(isCommandLoading || getDeviceFetching) && <Spinner />}
      <Grid container className="header">
        <Grid
          item
          xs={4}
          className="icon"
          sx={{
            backgroundColor: theme.palette.primary.light,
            borderRadius: '20px',
            padding: 2,
            textAlign: 'center',
          }}
        >
          <Blinds color="primary" fontSize="large" />
        </Grid>
        <Grid item xs={8}>
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'flex-end',
              alignItems: 'center',
            }}
          >
            {/* Error */}
            {(isCommandError || getDeviceIsError) && (
              <Box sx={{ marginRight: 0.5 }} data-testid="somfy-device-error">
                <ReportProblem
                  fontSize="small"
                  sx={{ color: theme.palette.red, marginRight: 0.5 }}
                />
              </Box>
            )}

            {/* Refresh button */}
            <IconButton
              color="primary"
              aria-label="refresh device data"
              data-testid="refresh-device-data"
              component="button"
              sx={{ padding: '0', marginRight: 0.5 }}
              size="small"
              onClick={() => getDeviceRefetch()}
            >
              <RefreshOutlined fontSize="small" color="primary" />
            </IconButton>

            {/* Favorite position button */}
            <IconButton
              color="primary"
              aria-label="favorite position button"
              data-testid="favorite-position-button"
              component="button"
              sx={{ padding: '0', marginRight: 0.5 }}
              size="small"
              onClick={() => setFavoritePosition()}
            >
              <Favorite fontSize="small" color="primary" />
            </IconButton>

            {/* Online button  */}
            {device.available && device.enabled ? (
              <WifiOutlined
                fontSize="small"
                color="primary"
                sx={{ marginRight: 0.5 }}
              />
            ) : (
              <WifiOffOutlined
                fontSize="small"
                sx={{ color: theme.palette.primaryGrey, marginRight: 0.5 }}
              />
            )}
          </Box>
        </Grid>

        {/* Informations */}
        <Box sx={{ textAlign: 'center', width: '100%', margin: '1rem 0' }}>
          <Typography variant="h6">{device.label}</Typography>
          <Typography variant="caption">
            {t('shutter.openAt', { level: openLevel() })}
          </Typography>
        </Box>

        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            width: '100%',
          }}
        >
          <Button
            variant="contained"
            onClick={() => handleShutterLevelChange(100)}
          >
            {t('shutter.open')}
          </Button>

          {/* Slider */}
          <Slider
            size="small"
            key={`slider-${openLevel()}`}
            defaultValue={openLevel()}
            disabled={!device.available && !device.enabled}
            aria-label="shutter level slider"
            valueLabelDisplay="auto"
            color="primary"
            sx={{ height: '15rem', margin: '2rem 0' }}
            orientation="vertical"
            onChangeCommitted={(event, newValue) =>
              handleShutterLevelChange(newValue)
            }
          />
          <Button
            variant="contained"
            onClick={() => handleShutterLevelChange(0)}
          >
            {t('shutter.close')}
          </Button>
        </Box>
      </Grid>
    </Box>
  );
};

export default ShutterDevice;

