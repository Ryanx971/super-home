import {
  RefreshOutlined,
  ReportProblem,
  WbIncandescentOutlined,
  WifiOffOutlined,
  WifiOutlined,
} from '@mui/icons-material';
import { Box, Grid, IconButton, Slider, Typography } from '@mui/material';
import { useQueryClient } from '@tanstack/react-query';
import React from 'react';
import { CirclePicker } from 'react-color';
import {
  useDeviceControlUpdate,
  useDeviceState,
} from '../../hooks/govee.hooks';
import { Device } from '../../models';
import IconPopover from '../IconPopover';
import Spinner from '../Spinner';
import ToggleSwitch from '../ToggleSwitch';

import './DeviceCard.scss';

interface IProps {
  device: Device;
}

const DeviceCard = ({ device }: IProps) => {
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

  const handlePowerStateChange = (checked: boolean): void => {
    const newValue = checked ? 'on' : 'off';
    const payload: any = {
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
          (currentDevice: any) => {
            currentDevice.properties.powerState = newValue;
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
    const payload: any = {
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
          (currentDevice: any) => {
            currentDevice.properties.brightness = newValue;
            return currentDevice;
          }
        );
      },
    });
  };

  const handleColorChange = (color: any, event: any): void => {
    const payload: any = {
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
          (currentDevice: any) => {
            currentDevice.properties.color = color.rgb;
            return currentDevice;
          }
        );
      },
    });
  };

  return (
    <Box
      className={
        'device-card ' +
        (isDeviceFetching || isDeviceControlUpdateLoading ? 'bg-disabled ' : '')
      }
    >
      {(isDeviceRefetching || isDeviceControlUpdateLoading) && <Spinner />}

      <Grid container className="header">
        <Grid item xs={3} className="left-content">
          <WbIncandescentOutlined className="color-primary" fontSize="large" />
        </Grid>
        <Grid item xs={2} />
        <Grid item xs={7} className="right-content">
          <Box className="icons-list">
            {/* Error */}
            {isDeviceError && (
              <ReportProblem fontSize="small" className="color-error" />
            )}

            {/* Refresh button */}
            <IconButton
              color="primary"
              aria-label="refresh device data"
              component="button"
              className="refresh-button"
              onClick={() => refreshDevice({ throwOnError: true })}
            >
              <input hidden accept="image/*" type="file" />
              <RefreshOutlined fontSize="small" className="color-primary" />
            </IconButton>

            {/* Color picker  */}
            <IconPopover
              iconName="color_lens_outlined"
              classes={isDeviceControlUpdateLoading ? 'bg-disabled' : ''}
              children={<CirclePicker onChangeComplete={handleColorChange} />}
              disabled={!deviceState?.properties?.online}
              anchorOriginVertical="bottom"
              anchorOriginHorizontal="center"
              transformOriginVertical="top"
              transformOriginHorizontal="center"
            />

            {/* Online button  */}
            {deviceState?.properties?.online ? (
              <WifiOutlined fontSize="small" className="color-primary" />
            ) : (
              <WifiOffOutlined fontSize="small" className="color-gray" />
            )}

            <ToggleSwitch
              id={device.deviceName}
              checked={deviceState?.properties?.powerState === 'on'}
              disabled={!deviceState?.properties?.online}
              onChange={handlePowerStateChange}
              small={true}
            />
          </Box>
        </Grid>
      </Grid>
      {/* Slider */}
      <Slider
        size="small"
        key={`slider-${deviceState?.properties?.brightness}`}
        defaultValue={deviceState?.properties?.brightness}
        disabled={
          !deviceState?.properties?.online ||
          deviceState?.properties.powerState === 'off'
        }
        aria-label="brightness slider"
        valueLabelDisplay="auto"
        className="slider"
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

export default DeviceCard;

