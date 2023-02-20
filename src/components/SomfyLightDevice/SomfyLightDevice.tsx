import {
  RefreshOutlined,
  WbIncandescentOutlined,
  WifiOffOutlined,
  WifiOutlined,
  ReportProblem,
} from '@mui/icons-material';
import {
  Box,
  Grid,
  IconButton,
  makeStyles,
  Theme,
  ToggleButton,
  ToggleButtonGroup,
  Typography,
} from '@mui/material';
import { useDevice, useSendCommand } from '../../hooks/somfy.hooks';
import {
  DeviceControlPayload,
  LightDevice,
} from '../../interfaces/somfy.interface';
import theme from '../../utils/theme';
import Spinner from '../Spinner';

interface Props {
  device: LightDevice;
}

const SomfyLightDevice = ({ device }: Props) => {
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

  const handlePowerStateChange = (
    event: React.MouseEvent<HTMLElement>,
    newPowerState: string | null
  ): void => {
    const payload: DeviceControlPayload = {
      label: `Set power state ${newPowerState} - ${device.label}`,
      actions: [
        {
          commands: [
            {
              name: newPowerState,
            },
          ],
          deviceURL: device.deviceURL,
        },
      ],
    };
    sendCommand(payload);
  };

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'flex-start',
        padding: 4,
        borderRadius: '25px',
        backgroundColor:
          isCommandLoading || getDeviceFetching
            ? theme.palette.grey40
            : theme.palette.white,
        opacity: isCommandLoading || getDeviceFetching ? 0.5 : 1,
        boxShadow: '0px 1px 5px rgba(179, 167, 255, 0.15)',
        position: 'relative',
      }}
    >
      {(isCommandLoading || getDeviceFetching) && <Spinner />}
      <Grid container>
        <Grid
          item
          xs={3}
          sx={{
            borderRadius: '20px',
            padding: 2,
            textAlign: 'center',
            backgroundColor: theme.palette.primary.light,
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
            {(isCommandError || getDeviceIsError) && (
              <ReportProblem
                fontSize="small"
                sx={{ marginRight: 0.5, color: theme.palette.red }}
              />
            )}

            {/* Refresh button */}
            <IconButton
              color="primary"
              aria-label="refresh device data"
              component="button"
              className="refresh-button mr-05"
              sx={{ marginRight: 0.5, padding: '0' }}
              size="small"
              onClick={() => getDeviceRefetch({ throwOnError: true })}
            >
              <RefreshOutlined fontSize="small" color="primary" />
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
                sx={{ marginRight: 0.5, color: theme.palette.primaryGrey }}
              />
            )}
          </Box>
        </Grid>
      </Grid>

      {device.available && device.enabled && (
        <Grid
          container
          sx={{
            margin: '1rem 0',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          <ToggleButtonGroup
            exclusive
            size="large"
            aria-label="change light power state"
            onChange={handlePowerStateChange}
          >
            <ToggleButton
              className="somfy-light-button-on"
              sx={{
                backgroundColor: theme.palette.primary.light,
                borderTopLeftRadius: '20px',
                borderBottomLeftRadius: '20px',
                border: `1px solid ${theme.palette.grey20}`,
                color: theme.palette.primary.main,
              }}
              color="primary"
              value="on"
              aria-label="turn on"
            >
              ON
            </ToggleButton>
            <ToggleButton
              className="somfy-light-button-off"
              sx={{
                backgroundColor: theme.palette.primary.light,
                borderTopRightRadius: '20px',
                borderBottomRightRadius: '20px',
                border: `1px solid ${theme.palette.grey20}`,
                color: theme.palette.primary.main,
              }}
              value="off"
              aria-label="turn off"
            >
              OFF
            </ToggleButton>
          </ToggleButtonGroup>
        </Grid>
      )}
      {/* Description */}
      <Box className="content">
        <Typography variant="h6">{device.label}</Typography>
        <Typography variant="caption">{device.deviceURL}</Typography>
      </Box>
    </Box>
  );
};

export default SomfyLightDevice;

