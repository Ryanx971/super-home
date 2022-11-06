import { Box, Button, Grid, Typography } from '@mui/material';
import { useTranslation } from 'react-i18next';
import { Device, DeviceType } from '../../models/somfy-device.model';
import AlertActions from '../AlertActions';
import ShutterDevice from '../ShutterDevice';
import DevicesSkeleton from '../Skeletons/DevicesSkeleton';
import SomfyLightDevice from '../SomfyLightDevice';

import './SomfyDevices.scss';

const SomfyDevices = () => {
  const { t } = useTranslation();
  // const { data, error, isFetching, isError, refetch } = useDevicesList();

  // dummy data
  const isError = false;
  const error = { message: 'undefined' };
  const refetch = () => {};
  const isFetching = false;
  const somfyDevices: Device[] = [
    {
      deviceURL: 'rts://2006-4441-1365/16720321',
      available: true,
      type: 1,
      states: [],
      label: 'Lumière du salon',
      enabled: true,
      controllableName: 'rts:LightRTSComponent',
    },
    {
      deviceURL: 'ovp://2006-4441-1365/14036424#2',
      available: true,
      type: 2,
      states: [
        {
          type: 3,
          name: 'core:StatusState',
          value: 'available',
        },
        {
          type: 3,
          name: 'core:NameState',
          value: 'RF Prog Therm',
        },
        {
          type: 2,
          name: 'core:TemperatureState',
          value: 21.7,
        },
      ],
      label: 'Chauffage',
      enabled: true,
      controllableName: 'ovp:HeatingTemperatureInterfaceTemperatureSensor',
    },
    {
      deviceURL: 'io://2006-4441-1365/2078915',
      available: true,
      type: 5,
      states: [],
      label: 'IO (2078915)',
      enabled: true,
      controllableName: 'io:StackComponent',
    },
    {
      deviceURL: 'ovp://2006-4441-1365/14036424#1',
      available: true,
      type: 1,
      states: [
        {
          type: 3,
          name: 'core:OnOffState',
          value: 'off',
        },
        {
          type: 3,
          name: 'ovp:HeatingTemperatureInterfaceSetPointModeState',
          value: 'free',
        },
        {
          type: 3,
          name: 'core:StatusState',
          value: 'available',
        },
        {
          type: 3,
          name: 'ovp:HeatingTemperatureInterfaceActiveModeState',
          value: 'manu',
        },
        {
          type: 3,
          name: 'ovp:HeatingTemperatureInterfaceOperatingModeState',
          value: 'heating',
        },
        {
          type: 3,
          name: 'core:NameState',
          value: 'RF Prog Therm',
        },
        {
          type: 3,
          name: 'core:BatteryState',
          value: 'normal',
        },
        {
          type: 1,
          name: 'core:ComfortRoomTemperatureState',
          value: 20,
        },
        {
          type: 1,
          name: 'core:EcoRoomTemperatureState',
          value: 17,
        },
        {
          type: 1,
          name: 'core:SecuredPositionTemperatureState',
          value: 5,
        },
      ],
      label: 'Chauffage',
      enabled: true,
      controllableName: 'ovp:SomfyHeatingTemperatureInterfaceOVPComponent',
    },
    {
      deviceURL: 'internal://2006-4441-1365/wifi/0',
      available: true,
      type: 1,
      states: [
        {
          type: 1,
          name: 'internal:SignalStrengthState',
          value: 82,
        },
        {
          type: 3,
          name: 'internal:WifiModeState',
          value: 'infrastructure',
        },
        {
          type: 3,
          name: 'internal:CurrentInfraConfigState',
          value: 'Orange-Home-2GHz',
        },
      ],
      label: 'INTERNAL (wifi/0)',
      enabled: true,
      controllableName: 'internal:WifiComponent',
    },
    {
      deviceURL: 'internal://2006-4441-1365/pod/0',
      available: true,
      type: 1,
      states: [
        {
          type: 3,
          name: 'core:NameState',
          value: 'Box',
        },
        {
          type: 3,
          name: 'core:CountryCodeState',
          value: 'FR',
        },
        {
          type: 1,
          name: 'internal:LightingLedPodModeState',
          value: 1,
        },
        {
          type: 3,
          name: 'core:ConnectivityState',
          value: 'online',
        },
      ],
      label: 'Box',
      enabled: true,
      controllableName: 'internal:PodV3Component',
    },
    {
      deviceURL: 'zigbee://2006-4441-1365/65535',
      available: true,
      type: 5,
      states: [],
      label: 'ZIGBEE (65535)',
      enabled: true,
      controllableName: 'zigbee:TransceiverV3_0Component',
    },
    {
      deviceURL: 'rts://2006-4441-1365/16713552',
      available: true,
      type: 1,
      states: [],
      label: 'Lumière de la cuisine',
      enabled: true,
      controllableName: 'rts:LightRTSComponent',
    },
    {
      deviceURL: 'io://2006-4441-1365/2999943',
      available: true,
      type: 4,
      states: [
        {
          type: 3,
          name: 'io:OneWayControllerButtonState',
          value: 'down',
        },
      ],
      label: 'Lanceur de scénario',
      enabled: true,
      controllableName: 'io:IORemoteController',
    },
    {
      deviceURL: 'rts://2006-4441-1365/16714621',
      available: true,
      type: 1,
      states: [],
      label: 'Lumière de la chambre',
      enabled: true,
      controllableName: 'rts:LightRTSComponent',
    },
    {
      deviceURL: 'io://2006-4441-1365/1975138',
      available: true,
      type: 1,
      states: [
        {
          type: 3,
          name: 'core:StatusState',
          value: 'available',
        },
        {
          type: 3,
          name: 'core:DiscreteRSSILevelState',
          value: 'good',
        },
        {
          type: 1,
          name: 'core:RSSILevelState',
          value: 96,
        },
        {
          type: 3,
          name: 'core:NameState',
          value: 'Volet de la cham',
        },
        {
          type: 6,
          name: 'core:MovingState',
          value: false,
        },
        {
          type: 1,
          name: 'core:TargetClosureState',
          value: 70,
        },
        {
          type: 1,
          name: 'core:Memorized1PositionState',
          value: 20,
        },
        {
          type: 11,
          name: 'core:ManufacturerSettingsState',
          value: {
            current_position: 35884,
          },
        },
        {
          type: 1,
          name: 'core:ClosureState',
          value: 70,
        },
        {
          type: 3,
          name: 'core:OpenClosedState',
          value: 'open',
        },
      ],
      label: 'Volet de la chambre',
      enabled: true,
      controllableName: 'io:RollerShutterGenericIOComponent',
    },
    {
      deviceURL: 'io://2006-4441-1365/1415497',
      available: true,
      type: 1,
      states: [
        {
          type: 3,
          name: 'core:NameState',
          value: 'Volet du salon',
        },
        {
          type: 1,
          name: 'core:TargetClosureState',
          value: 25,
        },
        {
          type: 1,
          name: 'core:Memorized1PositionState',
          value: 25,
        },
        {
          type: 3,
          name: 'core:DiscreteRSSILevelState',
          value: 'good',
        },
        {
          type: 1,
          name: 'core:RSSILevelState',
          value: 92,
        },
        {
          type: 3,
          name: 'core:StatusState',
          value: 'available',
        },
        {
          type: 6,
          name: 'core:MovingState',
          value: false,
        },
        {
          type: 11,
          name: 'core:ManufacturerSettingsState',
          value: {
            current_position: 12860,
          },
        },
        {
          type: 1,
          name: 'core:ClosureState',
          value: 25,
        },
        {
          type: 3,
          name: 'core:OpenClosedState',
          value: 'open',
        },
      ],
      label: 'Volet du salon',
      enabled: true,
      controllableName: 'io:RollerShutterGenericIOComponent',
    },
  ];

  return (
    <Box>
      <Box className="title">
        <Typography variant="h4">{t('homePage.somfy.title')}</Typography>
        <div className="line"></div>
      </Box>
      <Box className="somfy-devices-list">
        {isError && error instanceof Error && (
          <AlertActions
            severity="error"
            message={error.message}
            children={
              <Button color="inherit" size="small" onClick={() => refetch()}>
                {t('homePage.reloadDevices')}
              </Button>
            }
          />
        )}
        <Grid container spacing={6} columnSpacing={8}>
          {isFetching && <DevicesSkeleton repeat={9} height={250} />}
          {!isFetching &&
            somfyDevices.map((device, index) => {
              return (
                <>
                  {device.controllableName === DeviceType.LIGHT && (
                    <Grid item xs={12} md={6} lg={4}>
                      <SomfyLightDevice device={device} />
                    </Grid>
                  )}
                  {device.controllableName === DeviceType.SHUTTER && (
                    <Grid item xs={12} md={6} lg={4}>
                      <ShutterDevice device={device} />
                    </Grid>
                  )}
                </>
              );
            })}
        </Grid>
      </Box>
    </Box>
  );
};

export default SomfyDevices;

