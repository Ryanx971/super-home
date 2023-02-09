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
import {
  DeviceControlPayload,
  ShutterDeviceModel,
} from '../../interfaces/somfy.interface';
import Spinner from '../Spinner';

import './ShutterDevice.scss';

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
      label: `Set shutter level ${value}% - ${device.label}`,
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
      label: `Set shutter favorite position - ${device.label}`,
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
      className={
        'shutter ' +
        (isCommandLoading || getDeviceFetching ? 'bg-disabled' : '')
      }
    >
      {(isCommandLoading || getDeviceFetching) && <Spinner />}
      <Grid container className="header">
        <Grid item xs={4} className="icon">
          <Blinds className="color-primary" fontSize="large" />
        </Grid>
        <Grid item xs={8}>
          <Box className="icons-list">
            {/* Error */}
            {(isCommandError || getDeviceIsError) && (
              <ReportProblem fontSize="small" className="color-error mr-05" />
            )}

            {/* Refresh button */}
            <IconButton
              color="primary"
              aria-label="refresh device data"
              component="button"
              className="refresh-button mr-05"
              size="small"
              onClick={() => getDeviceRefetch({ throwOnError: true })}
            >
              <RefreshOutlined fontSize="small" className="color-primary" />
            </IconButton>

            {/* Favorite position button */}
            <IconButton
              color="primary"
              aria-label="favorite position button"
              component="button"
              className="favorite-position-button mr-05"
              size="small"
              onClick={() => setFavoritePosition()}
            >
              <Favorite fontSize="small" className="color-primary" />
            </IconButton>

            {/* Online button  */}
            {device.available && device.enabled ? (
              <WifiOutlined fontSize="small" className="color-primary mr-05" />
            ) : (
              <WifiOffOutlined fontSize="small" className="color-gray mr-05" />
            )}
          </Box>
        </Grid>

        {/* Informations */}
        <Box className="infos center w-100">
          <Typography variant="h6">{device.label}</Typography>
          <Typography variant="caption">
            {t('shutter.openAt', { level: openLevel() })}
          </Typography>
        </Box>

        <Box className="slider-container">
          <Button
            variant="contained"
            className="btn-default"
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
            className="slider"
            orientation="vertical"
            onChangeCommitted={(event, newValue) =>
              handleShutterLevelChange(newValue)
            }
          />
          <Button
            variant="contained"
            className="btn-default"
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

