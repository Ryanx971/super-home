import React from 'react';
import { Box, Slider, Typography, Grid, IconButton } from '@mui/material';
import {
  RefreshOutlined,
  WbIncandescentOutlined,
  WifiOutlined,
  WifiOffOutlined,
} from '@mui/icons-material';
import { IDevice } from '../../models';
import {
  useDeviceControlUpdate,
  useDeviceState,
} from '../../hooks/govee.hooks';
import ToggleSwitch from '../ToggleSwitch';
import Spinner from '../Spinner';
import IconPopover from '../IconPopover';
import { CirclePicker } from 'react-color';

import './DeviceCard.scss';

interface IProps {
  device: IDevice;
}

const DeviceCard = ({ device }: IProps) => {
  const {
    isRefetching,
    isFetching: isDeviceFetching,
    refetch: refreshDevice,
  } = useDeviceState(device);
  const {
    isLoading: isDeviceControlUpdateLoading,
    mutate: updateDeviceControl,
  } = useDeviceControlUpdate();

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
    // queryClient.invalidateQueries(['govee-device-state', device.device]);
    updateDeviceControl(payload, {
      onSuccess: () => {
        // queryClient.setQueryData(
        //   ['govee-device-state', device.device],
        //   (data: any) => {
        //     data.properties[1].powerState = newValue;
        //     return data;
        //   }
        // );
        if (device.state) {
          device.state.powerState = newValue;
        }
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
        if (device.state) {
          device.state.brightness = newValue;
        }
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
        if (device.state) {
          device.state.color = color.rgb;
        }
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
      {(isRefetching || isDeviceControlUpdateLoading) && <Spinner />}

      <Grid container className="header">
        <Grid item xs={3} className="left-content">
          <WbIncandescentOutlined className="color-primary" fontSize="large" />
        </Grid>
        <Grid item xs={2} />
        <Grid item xs={7} className="right-content">
          <Box className="icons-list">
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
              children={
                <Box
                  className={`${
                    isDeviceControlUpdateLoading ? 'bg-disabled' : ''
                  } `}
                >
                  <CirclePicker onChangeComplete={handleColorChange} />
                </Box>
              }
              disabled={!device.state?.online}
              anchorOriginVertical="bottom"
              anchorOriginHorizontal="center"
              transformOriginVertical="top"
              transformOriginHorizontal="center"
            />

            {/* Online button  */}
            {device.state?.online ? (
              <WifiOutlined fontSize="small" className="color-primary" />
            ) : (
              <WifiOffOutlined fontSize="small" className="color-gray" />
            )}

            <ToggleSwitch
              id={device.deviceName}
              checked={device.state?.powerState === 'on'}
              disabled={!device.state?.online}
              onChange={handlePowerStateChange}
              small={true}
            />
          </Box>
        </Grid>
      </Grid>
      {/* Slider */}
      <Slider
        size="small"
        key={`slider-${device.state?.brightness}`}
        defaultValue={device.state?.brightness}
        disabled={!device.state?.online || device.state.powerState === 'off'}
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

