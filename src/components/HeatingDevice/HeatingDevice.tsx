import {
  RefreshOutlined,
  ReportProblem,
  Settings,
  Battery20,
} from '@mui/icons-material';
import { Box, Grid, IconButton, Typography } from '@mui/material';
import { useQueryClient } from '@tanstack/react-query';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useSendCommand } from '../../hooks/somfy.hooks';
import { DevicesList } from '../../interfaces/rest/response.interface';
import { DeviceControlPayload } from '../../interfaces/somfy/device-control.interface';
import {
  HeatingInterfaceDevice,
  HeatingSensorDevice,
} from '../../interfaces/somfy/device-state.interface';
import theme from '../../utils/theme';
import HeatingSettingsModal from '../Modal/HeatingSettings/HeatingSettings';
import Spinner from '../Spinner';

interface Props {
  title: string;
  interfaceData: HeatingInterfaceDevice;
  sensor: HeatingSensorDevice;
  refresh: () => void;
}

const HeatingDevice = ({ title, interfaceData, sensor, refresh }: Props) => {
  const { t } = useTranslation();
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const queryClient = useQueryClient();
  const {
    isLoading: isCommandLoading,
    isError: isCommandError,
    mutate: sendCommand,
  } = useSendCommand();

  const itemStyle = {
    textAlign: 'center',
    borderRadius: '20px',
    padding: 4,
    backgroundColor: theme.palette.primary.light,
    cursor: 'pointer',
  };

  const changeTemperatureMode = (
    mode: TemperatureModes,
    auto: boolean = false
  ): void => {
    const payload: DeviceControlPayload = {
      label: t('payload.heating.changeTemperatureMode.label', {
        newTemperatureMode: mode,
        label: interfaceData.label,
      }),
      actions: [
        {
          commands: [
            {
              name: auto ? 'setActiveMode' : 'setManuAndSetPointModes',
              parameters: [mode],
            },
          ],
          deviceURL: interfaceData.deviceURL,
        },
      ],
    };
    sendCommand(payload, {
      onSuccess: () => {
        queryClient.setQueryData(
          ['somfy-devices'],
          (currentDevices: DevicesList | undefined) => {
            const heating = currentDevices?.heating;
            if (heating) {
              heating.interface.states.activeMode = TemperatureModes.MANU;
              heating.interface.states.currentMode = mode;
              if (auto) {
                heating.interface.states.activeMode = mode;
              }
            }
            return currentDevices;
          }
        );
      },
    });
  };

  return (
    <Box>
      <HeatingSettingsModal
        isOpen={isModalOpen}
        setIsOpen={setIsModalOpen}
        interfaceData={interfaceData}
      />
      <Grid container alignItems="center">
        <Grid item xs={8}>
          <Typography
            variant="h4"
            sx={{
              fontWeight: 600,
              color: theme.palette.secondary.main,
            }}
          >
            {title}
          </Typography>
        </Grid>
        <Grid item xs={4}>
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'flex-end',
              alignItems: 'center',
              marginRight: 0.5,
            }}
          >
            {/* Error */}
            {isCommandError && (
              <ReportProblem
                fontSize="large"
                sx={{
                  color: theme.palette.red,
                  marginRight: 2,
                  fontSize: '3rem',
                }}
              />
            )}

            {/* Refresh button */}
            <IconButton
              color="primary"
              component="button"
              size="large"
              aria-label={t('common.buttons.refresh.label')}
              title={t('common.buttons.refresh.title')}
              sx={{ padding: 'O' }}
              onClick={() => refresh()}
            >
              <RefreshOutlined
                fontSize="large"
                color="primary"
                sx={{
                  fontSize: '3rem',
                }}
              />
            </IconButton>

            {/* Settings button */}
            <IconButton
              color="primary"
              component="button"
              size="large"
              aria-label={t('common.buttons.settings.label')}
              title={t('common.buttons.settings.title')}
              sx={{ padding: 'O' }}
              onClick={() => setIsModalOpen(true)}
            >
              <Settings
                fontSize="large"
                color="primary"
                sx={{
                  fontSize: '3rem',
                }}
              />
            </IconButton>
          </Box>
        </Grid>
      </Grid>

      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          padding: 8,
          backgroundColor: isCommandLoading ? theme.palette.grey40 : 'inherit',
          opacity: isCommandLoading ? 0.5 : 1,
          borderRadius: '25px',
        }}
      >
        {isCommandLoading && <Spinner />}
        {/* Circle */}
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            width: '22rem',
            height: '22rem',
            borderRadius: '50%',
            marginBottom: 8,
            backgroundColor: theme.palette.primary.light,
          }}
        >
          <Typography
            variant="h1"
            color="primary"
            data-testid="current-temperature"
            sx={{ fontWeight: 600, fontSize: '4rem', marginBottom: 2 }}
          >
            {t('heatingPage.temperature', {
              value: sensor.states.temperature,
            })}
          </Typography>
          <Typography
            color="primary"
            variant="h6"
            sx={{ textTransform: 'capitalize' }}
          >
            {interfaceData.states.activeMode === TemperatureModes.AUTO
              ? t(`heatingPage.modes.${interfaceData.states.activeMode}`)
              : t(`heatingPage.modes.${interfaceData.states.currentMode}`)}
          </Typography>
        </Box>
        <Box>
          <Grid container spacing={6} justifyContent="center">
            {/* Anti frost mode */}
            <Grid item xs={12} md={6} lg={4}>
              <Box
                sx={itemStyle}
                onClick={() =>
                  changeTemperatureMode(TemperatureModes.FROST_PROTECTION)
                }
              >
                <Typography
                  color="primary"
                  variant="h6"
                  sx={{ fontWeight: 500 }}
                >
                  {t('heatingPage.modes.secured')}
                </Typography>
              </Box>
            </Grid>
            {/* Eco mode */}
            <Grid item xs={12} md={6} lg={4}>
              <Box
                sx={itemStyle}
                onClick={() => changeTemperatureMode(TemperatureModes.ECO)}
                data-testid="eco-mode"
              >
                <Typography
                  color="primary"
                  variant="h6"
                  sx={{ fontWeight: 500 }}
                >
                  {t('heatingPage.modes.eco')}
                </Typography>
              </Box>
            </Grid>
            {/* Confort mode */}
            <Grid item xs={12} md={6} lg={4}>
              <Box
                sx={itemStyle}
                onClick={() => changeTemperatureMode(TemperatureModes.COMFORT)}
              >
                <Typography
                  color="primary"
                  variant="h6"
                  sx={{ fontWeight: 500 }}
                >
                  {t('heatingPage.modes.comfort')}
                </Typography>
              </Box>
            </Grid>
            {/* Auto mode  */}
            <Grid item xs={12} md={6} lg={4}>
              <Box
                sx={itemStyle}
                onClick={() =>
                  changeTemperatureMode(TemperatureModes.AUTO, true)
                }
              >
                <Typography
                  color="primary"
                  variant="h6"
                  sx={{ fontWeight: 500 }}
                >
                  {t('heatingPage.modes.auto')}
                </Typography>
              </Box>
            </Grid>
          </Grid>
        </Box>
      </Box>
    </Box>
  );
};

export enum TemperatureModes {
  FROST_PROTECTION = 'secured',
  ECO = 'eco',
  COMFORT = 'comfort',
  AUTO = 'auto',
  MANU = 'manu',
}

export default HeatingDevice;

