import {
  RefreshOutlined,
  ReportProblem,
  WbIncandescentOutlined,
  WifiOffOutlined,
  WifiOutlined,
} from '@mui/icons-material';
import { Box, Grid, IconButton, Typography } from '@mui/material';
// import { useDeviceState } from '../../hooks/govee.hooks';
import { Device } from '../../models/somfy-device.model';
import Spinner from '../Spinner';
import ToggleSwitch from '../ToggleSwitch';

import './SomfyLightDevice.scss';

interface Props {
  device: Device;
}

const SomfyLightDevice = ({ device }: Props) => {
  // const {
  //   data: deviceState,
  //   isRefetching: isDeviceRefetching,
  //   isFetching: isDeviceFetching,
  //   refetch: refreshDevice,
  //   isError: isDeviceError,
  // } = useDeviceState(device);

  const handlePowerStateChange = (checked: boolean): void => {
    const newValue = checked ? 'on' : 'off';
    // const payload: any = {
    //   device: device.device,
    //   model: device.model,
    //   cmd: {
    //     name: 'turn',
    //     value: newValue,
    //   },
    // };
    // updateDeviceControl(payload, {
    //   onSuccess: () => {
    //     queryClient.setQueryData(
    //       ['govee-device-state', device.device],
    //       (currentDevice: any) => {
    //         currentDevice.properties.powerState = newValue;
    //         return currentDevice;
    //       }
    //     );
    //   },
    // });
  };

  return (
    <Box
      className={
        'device-card '
        // (isDeviceFetching || isDeviceControlUpdateLoading ? 'bg-disabled ' : '')
        // (isDeviceFetching ? 'bg-disabled ' : '')
      }
    >
      {/* {(isDeviceRefetching || isDeviceControlUpdateLoading) && <Spinner />} */}
      {/* {isDeviceRefetching && <Spinner />} */}

      <Grid container className="header">
        <Grid item xs={3} className="left-content">
          <WbIncandescentOutlined className="color-primary" fontSize="large" />
        </Grid>
        <Grid item xs={2} />
        <Grid item xs={7} className="right-content">
          <Box className="icons-list">
            {/* Error */}
            {/* {isDeviceError && (
              <ReportProblem fontSize="small" className="color-error" />
            )} */}

            {/* Refresh button */}
            <IconButton
              color="primary"
              aria-label="refresh device data"
              component="button"
              className="refresh-button"
              // onClick={() => refreshDevice({ throwOnError: true })}
            >
              <input hidden accept="image/*" type="file" />
              <RefreshOutlined fontSize="small" className="color-primary" />
            </IconButton>

            {/* Online button  */}
            {device.available && device.enabled ? (
              <WifiOutlined fontSize="small" className="color-primary" />
            ) : (
              <WifiOffOutlined fontSize="small" className="color-gray" />
            )}

            <ToggleSwitch
              id={device.label}
              // checked={deviceState?.properties?.powerState === 'on'}
              checked={true}
              disabled={!device.available || !device.enabled}
              onChange={handlePowerStateChange}
              small={true}
            />
          </Box>
        </Grid>
      </Grid>
      {/* Description */}
      <Box className="content">
        <Typography variant="h6">{device.label}</Typography>
        <Typography variant="caption">{device.deviceURL}</Typography>
      </Box>
    </Box>
  );
};

export default SomfyLightDevice;

