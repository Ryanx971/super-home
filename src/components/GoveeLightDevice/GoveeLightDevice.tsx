import {
  RefreshOutlined,
  ReportProblem,
  WbIncandescentOutlined,
  WifiOffOutlined,
  WifiOutlined,
} from '@mui/icons-material';
import {
  Box,
  Grid,
  IconButton,
  Slider,
  Switch,
  Typography,
} from '@mui/material';
import { useQueryClient } from '@tanstack/react-query';
import React, { ChangeEvent } from 'react';
import { CirclePicker, ColorResult } from 'react-color';
import { useTranslation } from 'react-i18next';
import {
  useDeviceControlUpdate,
  useDeviceState,
} from '../../hooks/govee.hooks';
import { DeviceControlPayload } from '../../interfaces/govee/device-control.interface';
import { DeviceState } from '../../interfaces/govee/device-state.interface';
import { Device } from '../../interfaces/govee/device.interface';
import theme from '../../utils/theme';
import IconPopover from '../IconPopover';
import Spinner from '../Spinner';

interface Props {
  device: Device;
}

const GoveeLightDevice = ({ device }: Props) => {
  const { t } = useTranslation();
  const {
    data: deviceState,
    isRefetching: isDeviceRefetching,
    isFetching: isDeviceFetching,
    refetch: refreshDevice,
    isError: isDeviceError,
  } = useDeviceState(device);
  const {
    isLoading: isDeviceControlUpdateLoading,
    mutate: updateDeviceControl,
  } = useDeviceControlUpdate();
  const queryClient = useQueryClient();

  const handlePowerStateChange = (
    event: ChangeEvent<HTMLInputElement>,
    checked: boolean
  ): void => {
    const newValue = checked ? 'on' : 'off';
    const payload: DeviceControlPayload = {
      device: device.device,
      model: device.model,
      cmd: {
        name: 'turn',
        value: newValue,
      },
    };
    updateDeviceControl(payload, {
      onSuccess: () => {
        queryClient.setQueryData(
          ['govee-device-state', device.device],
          (currentDevice: DeviceState | undefined) => {
            if (currentDevice?.properties) {
              currentDevice.properties.powerState = newValue;
            }
            return currentDevice;
          }
        );
      },
    });
  };

  const handleBrightnessChange = (
    event: Event | React.SyntheticEvent<Element, Event>,
    newValue: number | number[]
  ): void => {
    const payload: DeviceControlPayload = {
      device: device.device,
      model: device.model,
      cmd: {
        name: 'brightness',
        value: newValue,
      },
    };
    updateDeviceControl(payload, {
      onSuccess: () => {
        queryClient.setQueryData(
          ['govee-device-state', device.device],
          (currentDevice: DeviceState | undefined) => {
            if (currentDevice?.properties) {
              currentDevice.properties.brightness = newValue;
            }
            return currentDevice;
          }
        );
      },
    });
  };

  const handleColorChange = (
    color: ColorResult,
    event: React.ChangeEvent<HTMLInputElement>
  ): void => {
    const payload: DeviceControlPayload = {
      device: device.device,
      model: device.model,
      cmd: {
        name: 'color',
        value: color.rgb,
      },
    };
    updateDeviceControl(payload, {
      onSuccess: () => {
        queryClient.setQueryData(
          ['govee-device-state', device.device],
          (currentDevice: DeviceState | undefined) => {
            if (currentDevice?.properties) {
              currentDevice.properties.color = color.rgb;
            }
            return currentDevice;
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
        boxShadow: '0px 1px 5px rgba(179, 167, 255, 0.15)',
        borderRadius: '25px',
        backgroundColor:
          isDeviceFetching || isDeviceControlUpdateLoading
            ? theme.palette.grey40
            : theme.palette.white,
        opacity: isDeviceFetching || isDeviceControlUpdateLoading ? 0.5 : 1,
      }}
    >
      {(isDeviceRefetching || isDeviceControlUpdateLoading) && <Spinner />}

      <Grid container>
        <Grid
          item
          xs={3}
          sx={{
            backgroundColor: theme.palette.primary.light,
            borderRadius: '20px',
            padding: 2,
            textAlign: 'center',
          }}
        >
          <WbIncandescentOutlined color="primary" fontSize="large" />
        </Grid>
        <Grid item xs={2} />
        <Grid item xs={7} sx={{ textAlign: 'end' }}>
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'flex-end',
              alignItems: 'center',
            }}
          >
            {/* Error */}
            {isDeviceError && (
              <Box sx={{ marginRight: 0.5 }} data-testid="govee-device-error">
                <ReportProblem
                  fontSize="small"
                  sx={{ color: theme.palette.red }}
                />
              </Box>
            )}

            {/* Refresh button */}
            <IconButton
              color="primary"
              component="button"
              size="small"
              aria-label={t('common.buttons.refresh.label')}
              title={t('common.buttons.refresh.title')}
              sx={{ padding: 'O', marginRight: 0.5 }}
              onClick={() => refreshDevice({ throwOnError: true })}
            >
              <RefreshOutlined fontSize="small" color="primary" />
            </IconButton>

            {/* Color picker  */}
            <IconPopover
              classes={isDeviceControlUpdateLoading ? 'bg-disabled' : ''}
              children={<CirclePicker onChangeComplete={handleColorChange} />}
              disabled={!deviceState?.properties?.online}
              anchorOriginVertical="bottom"
              anchorOriginHorizontal="center"
              transformOriginVertical="top"
              transformOriginHorizontal="center"
            />

            {/* Online icon  */}
            {deviceState?.properties?.online ? (
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

            <Switch
              title={t('common.buttons.powerState.title')}
              checked={deviceState?.properties?.powerState === 'on'}
              onChange={handlePowerStateChange}
              disabled={!deviceState?.properties?.online}
              inputProps={{ 'aria-label': 'controlled' }}
            />
          </Box>
        </Grid>
      </Grid>
      {/* Slider */}
      <Slider
        size="small"
        key={`slider-${deviceState?.properties?.brightness}`}
        defaultValue={deviceState?.properties?.brightness}
        data-testid="govee-device-slider"
        sx={{ margin: '1rem 0' }}
        disabled={
          !deviceState?.properties?.online ||
          deviceState?.properties.powerState === 'off'
        }
        aria-label="brightness slider"
        valueLabelDisplay="auto"
        onChangeCommitted={handleBrightnessChange}
      />
      {/* Description */}
      <Box className="content">
        <Typography variant="h6">{device.deviceName}</Typography>
        <Typography variant="caption">{device.model}</Typography>
      </Box>
    </Box>
  );
};

export default GoveeLightDevice;

