import {
  Box,
  Button,
  Grid,
  IconButton,
  Slider,
  Typography,
} from '@mui/material';
import { Device } from '../../models/somfy-device.model';
import {
  Blinds,
  RefreshOutlined,
  SettingsSuggest,
  WifiOffOutlined,
  WifiOutlined,
} from '@mui/icons-material';

import './ShutterDevice.scss';

interface Props {
  device: Device;
}

const ShutterDevice = ({ device }: Props) => {
  return (
    <Box className="shutter">
      <Grid container className="header">
        <Grid item xs={4} className="icon">
          <Blinds className="color-primary" fontSize="large" />
        </Grid>
        <Grid item xs={8}>
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

            {/* Favorite position button */}
            <IconButton
              color="primary"
              aria-label="favorite position button"
              component="button"
              className="favorite-position-button"
              // onClick={() => refreshDevice({ throwOnError: true })}
            >
              <input hidden accept="image/*" type="file" />
              <SettingsSuggest fontSize="small" className="color-primary" />
            </IconButton>

            {/* Online button  */}
            {device.available && device.enabled ? (
              <WifiOutlined fontSize="small" className="color-primary" />
            ) : (
              <WifiOffOutlined fontSize="small" className="color-gray" />
            )}
          </Box>
        </Grid>
        {/* Informations */}
        <Box className="infos center w-100">
          <Typography variant="h6">{device.label}</Typography>
          <Typography variant="caption">Open at xx%</Typography>
        </Box>

        <Box className="slider-container">
          <Button variant="contained" className="btn-default">
            Open
          </Button>
          {/* Slider */}
          <Slider
            size="small"
            // key={`slider-${deviceState?.properties?.brightness}`}
            // defaultValue={deviceState?.properties?.brightness}
            // disabled={
            //   !deviceState?.properties?.online ||
            //   deviceState?.properties.powerState === 'off'
            // }
            aria-label="shutter level slider"
            valueLabelDisplay="auto"
            className="slider"
            orientation="vertical"
            // onChangeCommitted={handleBrightnessChange}
          />
          <Button variant="contained" className="btn-default">
            Close
          </Button>
        </Box>
      </Grid>
    </Box>
  );
};

export default ShutterDevice;

