import { DevicesList } from '../../../interfaces/rest/response.interface';

export const devices = [
  {
    deviceURL: 'io://2006-4441-1365/1975138',
    available: true,
    synced: true,
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
        value: 100,
      },
      {
        type: 11,
        name: 'core:ManufacturerSettingsState',
        value: {
          current_position: 51200,
        },
      },
      {
        type: 1,
        name: 'core:ClosureState',
        value: 100,
      },
      {
        type: 3,
        name: 'core:OpenClosedState',
        value: 'closed',
      },
      {
        type: 1,
        name: 'core:TargetClosureState',
        value: 100,
      },
      {
        type: 6,
        name: 'core:MovingState',
        value: false,
      },
      {
        type: 3,
        name: 'core:NameState',
        value: 'Volet de la cham',
      },
      {
        type: 1,
        name: 'core:Memorized1PositionState',
        value: 20,
      },
    ],
    label: 'Volet de la chambre',
    subsystemId: 0,
    attributes: [
      {
        type: 10,
        name: 'core:SupportedManufacturerSettingsCommands',
        value: [
          'dead_man_up',
          'dead_man_down',
          'dead_man_stop',
          'dead_man_impulse_up',
          'dead_man_impulse_down',
          'enter_settings_mode',
          'save_upper_end_limit',
          'save_lower_end_limit',
          'stop_after_save_limit',
          'save_settings',
          'invert_rotation',
          'save_my_position',
          'delete_my_position',
          'reset_actuator',
          'double_power_cut',
          'eject_from_setting_mode',
        ],
      },
      {
        type: 3,
        name: 'core:Manufacturer',
        value: 'Somfy',
      },
      {
        type: 3,
        name: 'core:FirmwareRevision',
        value: '5100394X22',
      },
    ],
    enabled: true,
    controllableName: 'io:RollerShutterGenericIOComponent',
    definition: {
      states: [
        {
          name: 'core:StatusState',
          rawStateId: '2147426304',
        },
        {
          name: 'core:NameState',
          rawStateId: '1',
        },
        {
          name: 'core:AdditionalStatusState',
          rawStateId: '2146500645',
        },
        {
          name: 'core:TargetClosureState',
          rawStateId: '16832522',
        },
        {
          name: 'core:SecuredPositionState',
          rawStateId: '16832522',
        },
        {
          name: 'core:ManufacturerSettingsState',
          rawStateId: '65537',
        },
        {
          name: 'core:ClosureState',
          rawStateId: '65537',
        },
        {
          name: 'core:OpenClosedState',
          rawStateId: '65537',
        },
        {
          name: 'core:MovingState',
          rawStateId: '65557',
        },
        {
          name: 'core:ManufacturerDiagnosticsState',
          rawStateId: '2',
        },
        {
          name: 'core:DiscreteRSSILevelState',
          rawStateId: '2146500638',
        },
        {
          name: 'core:RSSILevelState',
          rawStateId: '2146500638',
        },
        {
          name: 'core:Memorized1PositionState',
          rawStateId: '16832512',
        },
      ],
      widgetName: 'PositionableRollerShutter',
      attributes: [
        {
          name: 'core:SupportedManufacturerSettingsCommands',
        },
        {
          name: 'core:Manufacturer',
        },
        {
          name: 'core:FirmwareRevision',
        },
      ],
      uiClass: 'RollerShutter',
      commands: [
        {
          commandName: 'stop',
          nparams: 0,
        },
        {
          nparams: 1,
          commandName: 'setDeployment',
          paramsSig: 'p1',
        },
        {
          nparams: 1,
          commandName: 'delayedStopIdentify',
          paramsSig: 'p1',
        },
        {
          nparams: 2,
          commandName: 'runManufacturerSettingsCommand',
          paramsSig: 'p1,p2',
        },
        {
          commandName: 'down',
          nparams: 0,
        },
        {
          nparams: 1,
          commandName: 'setClosure',
          paramsSig: 'p1',
        },
        {
          commandName: 'unpairAllOneWayControllers',
          nparams: 0,
        },
        {
          nparams: 1,
          commandName: 'setConfigState',
          paramsSig: 'p1',
        },
        {
          nparams: 1,
          commandName: 'pairOneWayController',
          paramsSig: 'p1,*p2',
        },
        {
          commandName: 'unpairAllOneWayControllersAndDeleteNode',
          nparams: 0,
        },
        {
          nparams: 1,
          commandName: 'advancedRefresh',
          paramsSig: 'p1,*p2',
        },
        {
          commandName: 'refreshMemorized1Position',
          nparams: 0,
        },
        {
          commandName: 'startIdentify',
          nparams: 0,
        },
        {
          commandName: 'stopIdentify',
          nparams: 0,
        },
        {
          commandName: 'up',
          nparams: 0,
        },
        {
          commandName: 'open',
          nparams: 0,
        },
        {
          commandName: 'keepOneWayControllersAndDeleteNode',
          nparams: 0,
        },
        {
          commandName: 'sendIOKey',
          nparams: 0,
        },
        {
          nparams: 1,
          commandName: 'setMemorized1Position',
          paramsSig: 'p1',
        },
        {
          nparams: 1,
          commandName: 'wink',
          paramsSig: 'p1',
        },
        {
          commandName: 'close',
          nparams: 0,
        },
        {
          nparams: 1,
          commandName: 'setName',
          paramsSig: 'p1',
        },
        {
          commandName: 'identify',
          nparams: 0,
        },
        {
          nparams: 1,
          commandName: 'setPosition',
          paramsSig: 'p1',
        },
        {
          nparams: 1,
          commandName: 'unpairOneWayController',
          paramsSig: 'p1,*p2',
        },
        {
          nparams: 1,
          commandName: 'setSecuredPosition',
          paramsSig: 'p1',
        },
        {
          commandName: 'my',
          nparams: 0,
        },
        {
          commandName: 'getName',
          nparams: 0,
        },
      ],
      type: 'ACTUATOR',
    },
  },
  {
    creationTime: 1678189712608,
    deviceURL: 'rts://2006-4441-1365/16720321',
    available: true,
    synced: true,
    type: 1,
    states: [],
    label: 'Lumière du salon',
    definition: {
      states: [],
      widgetName: 'OnOffLight',
      attributes: [],
      uiClass: 'Light',
      commands: [
        {
          nparams: 0,
          commandName: 'stop',
          paramsSig: '*p1',
        },
        {
          nparams: 1,
          commandName: 'myWithTimer',
          paramsSig: 'p1',
        },
        {
          nparams: 0,
          commandName: 'down',
          paramsSig: '*p1',
        },
        {
          nparams: 1,
          commandName: 'onWithTimer',
          paramsSig: 'p1',
        },
        {
          nparams: 0,
          commandName: 'up',
          paramsSig: '*p1',
        },
        {
          commandName: 'test',
          nparams: 0,
        },
        {
          commandName: 'off',
          nparams: 0,
        },
        {
          commandName: 'on',
          nparams: 0,
        },
        {
          nparams: 0,
          commandName: 'my',
          paramsSig: '*p1',
        },
        {
          commandName: 'identify',
          nparams: 0,
        },
        {
          nparams: 0,
          commandName: 'openConfiguration',
          paramsSig: '*p1',
        },
        {
          nparams: 0,
          commandName: 'rest',
          paramsSig: '*p1',
        },
      ],
      type: 'ACTUATOR',
    },
    attributes: [],
    enabled: true,
    controllableName: 'rts:LightRTSComponent',
    subsystemId: 0,
  },
  {
    deviceURL: 'ovp://2006-4441-1365/14036424#2',
    available: true,
    synced: true,
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
        type: 1,
        name: 'core:TemperatureState',
        value: 20.5,
      },
    ],
    label: 'Chauffage',
    subsystemId: 2,
    attributes: [],
    enabled: true,
    controllableName: 'ovp:HeatingTemperatureInterfaceTemperatureSensor',
    definition: {
      states: [
        {
          name: 'core:StatusState',
          rawStateId: '2147426304',
        },
        {
          name: 'core:NameState',
          rawStateId: '1',
        },
        {
          name: 'core:TemperatureState',
          rawStateId: '65558',
        },
      ],
      widgetName: 'TemperatureSensor',
      attributes: [],
      uiClass: 'TemperatureSensor',
      commands: [
        {
          commandName: 'getName',
          nparams: 0,
        },
        {
          nparams: 1,
          commandName: 'setName',
          paramsSig: 'p1',
        },
      ],
      type: 'SENSOR',
    },
  },
  {
    creationTime: 1678189712389,
    deviceURL: 'rts://2006-4441-1365/16714621',
    available: true,
    synced: true,
    type: 1,
    states: [],
    label: 'Lumière de la chambre',
    definition: {
      states: [],
      widgetName: 'OnOffLight',
      attributes: [],
      uiClass: 'Light',
      commands: [
        {
          nparams: 0,
          commandName: 'stop',
          paramsSig: '*p1',
        },
        {
          nparams: 1,
          commandName: 'myWithTimer',
          paramsSig: 'p1',
        },
        {
          nparams: 0,
          commandName: 'down',
          paramsSig: '*p1',
        },
        {
          nparams: 1,
          commandName: 'onWithTimer',
          paramsSig: 'p1',
        },
        {
          nparams: 0,
          commandName: 'up',
          paramsSig: '*p1',
        },
        {
          commandName: 'test',
          nparams: 0,
        },
        {
          commandName: 'off',
          nparams: 0,
        },
        {
          commandName: 'on',
          nparams: 0,
        },
        {
          nparams: 0,
          commandName: 'my',
          paramsSig: '*p1',
        },
        {
          commandName: 'identify',
          nparams: 0,
        },
        {
          nparams: 0,
          commandName: 'openConfiguration',
          paramsSig: '*p1',
        },
        {
          nparams: 0,
          commandName: 'rest',
          paramsSig: '*p1',
        },
      ],
      type: 'ACTUATOR',
    },
    attributes: [],
    enabled: true,
    controllableName: 'rts:LightRTSComponent',
    subsystemId: 0,
  },
  {
    deviceURL: 'io://2006-4441-1365/2078915',
    available: true,
    synced: true,
    type: 5,
    states: [],
    label: 'IO (2078915)',
    subsystemId: 0,
    attributes: [],
    enabled: true,
    controllableName: 'io:StackComponent',
    definition: {
      states: [],
      widgetName: 'IOStack',
      attributes: [],
      uiClass: 'ProtocolGateway',
      commands: [
        {
          nparams: 1,
          commandName: 'discoverActuators',
          paramsSig: 'p1',
        },
        {
          commandName: 'joinNetwork',
          nparams: 0,
        },
        {
          nparams: 1,
          commandName: 'advancedSomfyDiscover',
          paramsSig: 'p1',
        },
        {
          commandName: 'resetNetworkSecurity',
          nparams: 0,
        },
        {
          commandName: 'shareNetwork',
          nparams: 0,
        },
        {
          nparams: 0,
          commandName: 'discover1WayController',
          paramsSig: '*p1,*p2',
        },
        {
          nparams: 1,
          commandName: 'discoverSensors',
          paramsSig: 'p1',
        },
        {
          commandName: 'discoverSomfyUnsetActuators',
          nparams: 0,
        },
      ],
      type: 'PROTOCOL_GATEWAY',
    },
  },
  {
    deviceURL: 'internal://2006-4441-1365/wifi/0',
    available: true,
    synced: true,
    type: 1,
    states: [
      {
        type: 1,
        name: 'internal:SignalStrengthState',
        value: 78,
      },
      {
        type: 3,
        name: 'internal:CurrentInfraConfigState',
        value: 'Orange-Home-2GHz',
      },
      {
        type: 3,
        name: 'internal:WifiModeState',
        value: 'infrastructure',
      },
    ],
    label: 'INTERNAL (wifi/0)',
    subsystemId: 0,
    attributes: [],
    enabled: true,
    controllableName: 'internal:WifiComponent',
    definition: {
      states: [
        {
          name: 'internal:CurrentInfraConfigState',
          rawStateId: 'currentInfraConfig',
        },
        {
          name: 'internal:SignalStrengthState',
          rawStateId: 'signalStrength',
        },
        {
          name: 'internal:WifiModeState',
          rawStateId: 'mode',
        },
      ],
      widgetName: 'Wifi',
      attributes: [],
      uiClass: 'Wifi',
      commands: [
        {
          nparams: 1,
          commandName: 'setWifiMode',
          paramsSig: 'p1',
        },
        {
          commandName: 'clearCredentials',
          nparams: 0,
        },
        {
          nparams: 2,
          commandName: 'setTargetInfraConfig',
          paramsSig: 'p1,p2',
        },
      ],
      type: 'ACTUATOR',
    },
  },
  {
    deviceURL: 'ovp://2006-4441-1365/14036424#1',
    available: true,
    synced: true,
    type: 1,
    states: [
      {
        type: 3,
        name: 'core:StatusState',
        value: 'available',
      },
      {
        type: 3,
        name: 'ovp:HeatingTemperatureInterfaceActiveModeState',
        value: 'auto',
      },
      {
        type: 3,
        name: 'ovp:HeatingTemperatureInterfaceOperatingModeState',
        value: 'heating',
      },
      {
        type: 3,
        name: 'core:OnOffState',
        value: 'on',
      },
      {
        type: 3,
        name: 'ovp:HeatingTemperatureInterfaceSetPointModeState',
        value: 'eco',
      },
      {
        type: 3,
        name: 'core:BatteryState',
        value: 'normal',
      },
      {
        type: 3,
        name: 'core:NameState',
        value: 'RF Prog Therm',
      },
      {
        type: 1,
        name: 'core:SecuredPositionTemperatureState',
        value: 5,
      },
      {
        type: 1,
        name: 'core:EcoRoomTemperatureState',
        value: 17,
      },
      {
        type: 2,
        name: 'core:ComfortRoomTemperatureState',
        value: 20.5,
      },
      {
        type: 2,
        name: 'core:TargetTemperatureState',
        value: 17,
      },
    ],
    label: 'Chauffage',
    subsystemId: 1,
    attributes: [],
    enabled: true,
    controllableName: 'ovp:SomfyHeatingTemperatureInterfaceOVPComponent',
    definition: {
      states: [
        {
          name: 'core:BatteryState',
          rawStateId: '65556',
        },
        {
          name: 'core:NameState',
          rawStateId: '1',
        },
        {
          name: 'core:ComfortRoomTemperatureState',
          rawStateId: '65558',
        },
        {
          name: 'core:EcoRoomTemperatureState',
          rawStateId: '65558',
        },
        {
          name: 'core:SecuredPositionTemperatureState',
          rawStateId: '65558',
        },
        {
          name: 'core:TargetTemperatureState',
          rawStateId: '65558',
        },
        {
          name: 'core:OnOffState',
          rawStateId: '16830720',
        },
        {
          name: 'ovp:HeatingTemperatureInterfaceSetPointModeState',
          rawStateId: '16830720',
        },
        {
          name: 'ovp:HeatingTemperatureInterfaceActiveModeState',
          rawStateId: '65546',
        },
        {
          name: 'ovp:HeatingTemperatureInterfaceOperatingModeState',
          rawStateId: '65546',
        },
        {
          name: 'core:StatusState',
          rawStateId: '2147426304',
        },
      ],
      widgetName: 'SomfyHeatingTemperatureInterface',
      attributes: [],
      uiClass: 'HeatingSystem',
      commands: [
        {
          nparams: 1,
          commandName: 'setOnOff',
          paramsSig: 'p1',
        },
        {
          commandName: 'refreshEcoTemperature',
          nparams: 0,
        },
        {
          nparams: 1,
          commandName: 'setOperatingMode',
          paramsSig: 'p1',
        },
        {
          nparams: 1,
          commandName: 'setManuAndSetPointModes',
          paramsSig: 'p1',
        },
        {
          nparams: 1,
          commandName: 'setEcoTemperature',
          paramsSig: 'p1',
        },
        {
          commandName: 'refreshSetPointMode',
          nparams: 0,
        },
        {
          nparams: 1,
          commandName: 'setComfortTemperature',
          paramsSig: 'p1',
        },
        {
          commandName: 'refreshTargetTemperature',
          nparams: 0,
        },
        {
          commandName: 'refreshActiveMode',
          nparams: 0,
        },
        {
          commandName: 'getName',
          nparams: 0,
        },
        {
          commandName: 'refreshComfortTemperature',
          nparams: 0,
        },
        {
          commandName: 'refreshSecuredPositionTemperature',
          nparams: 0,
        },
        {
          nparams: 1,
          commandName: 'setName',
          paramsSig: 'p1',
        },
        {
          commandName: 'identify',
          nparams: 0,
        },
        {
          commandName: 'refreshBatteryLevel',
          nparams: 0,
        },
        {
          nparams: 1,
          commandName: 'setActiveMode',
          paramsSig: 'p1',
        },
        {
          nparams: 1,
          commandName: 'setSecuredPositionTemperature',
          paramsSig: 'p1',
        },
        {
          commandName: 'refreshTemperature',
          nparams: 0,
        },
        {
          commandName: 'refreshOnOffState',
          nparams: 0,
        },
      ],
      type: 'ACTUATOR',
    },
  },
  {
    deviceURL: 'io://2006-4441-1365/2999943',
    available: true,
    synced: true,
    type: 4,
    states: [
      {
        type: 3,
        name: 'io:OneWayControllerButtonState',
        value: 'down',
      },
    ],
    label: 'Lanceur de scénario',
    subsystemId: 0,
    attributes: [],
    enabled: true,
    controllableName: 'io:IORemoteController',
    definition: {
      states: [
        {
          name: 'io:OneWayControllerButtonState',
          rawStateId: '33554442',
        },
      ],
      widgetName: 'RemoteControllerOneWay',
      attributes: [
        {
          name: 'core:GroupId',
        },
        {
          name: 'core:GroupIndex',
        },
      ],
      uiClass: 'RemoteController',
      commands: [],
      type: 'REMOTE_CONTROLLER',
    },
  },
  {
    deviceURL: 'zigbee://2006-4441-1365/65535',
    available: true,
    synced: true,
    type: 5,
    states: [],
    label: 'ZIGBEE (65535)',
    subsystemId: 0,
    attributes: [],
    enabled: true,
    controllableName: 'zigbee:TransceiverV3_0Component',
    definition: {
      states: [],
      widgetName: 'ZigbeeStack',
      attributes: [],
      uiClass: 'ProtocolGateway',
      commands: [],
      type: 'PROTOCOL_GATEWAY',
    },
  },
  {
    creationTime: 1678189712186,
    deviceURL: 'rts://2006-4441-1365/16713552',
    available: true,
    synced: true,
    type: 1,
    states: [],
    label: 'Lumière de la cuisine',
    definition: {
      states: [],
      widgetName: 'OnOffLight',
      attributes: [],
      uiClass: 'Light',
      commands: [
        {
          nparams: 0,
          commandName: 'stop',
          paramsSig: '*p1',
        },
        {
          nparams: 1,
          commandName: 'myWithTimer',
          paramsSig: 'p1',
        },
        {
          nparams: 0,
          commandName: 'down',
          paramsSig: '*p1',
        },
        {
          nparams: 1,
          commandName: 'onWithTimer',
          paramsSig: 'p1',
        },
        {
          nparams: 0,
          commandName: 'up',
          paramsSig: '*p1',
        },
        {
          commandName: 'test',
          nparams: 0,
        },
        {
          commandName: 'off',
          nparams: 0,
        },
        {
          commandName: 'on',
          nparams: 0,
        },
        {
          nparams: 0,
          commandName: 'my',
          paramsSig: '*p1',
        },
        {
          commandName: 'identify',
          nparams: 0,
        },
        {
          nparams: 0,
          commandName: 'openConfiguration',
          paramsSig: '*p1',
        },
        {
          nparams: 0,
          commandName: 'rest',
          paramsSig: '*p1',
        },
      ],
      type: 'ACTUATOR',
    },
    attributes: [],
    enabled: true,
    controllableName: 'rts:LightRTSComponent',
    subsystemId: 0,
  },
  {
    deviceURL: 'internal://2006-4441-1365/pod/0',
    available: true,
    synced: true,
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
    subsystemId: 0,
    attributes: [],
    enabled: true,
    controllableName: 'internal:PodV3Component',
    definition: {
      states: [
        {
          name: 'core:ConnectivityState',
          rawStateId: 'networkConnectivity',
        },
        {
          name: 'core:LocalAccessProofState',
          rawStateId: 'localAccessProof',
        },
        {
          name: 'internal:Button2State',
          rawStateId: 'button2',
        },
        {
          name: 'core:LocalIPv4AddressState',
          rawStateId: 'ip',
        },
        {
          name: 'core:CountryCodeState',
          rawStateId: 'countryCode',
        },
        {
          name: 'internal:Button3State',
          rawStateId: 'button3',
        },
        {
          name: 'internal:LightingLedPodModeState',
          rawStateId: 'lightingLedPodMode',
        },
        {
          name: 'core:NameState',
          rawStateId: 'name',
        },
        {
          name: 'internal:Button1State',
          rawStateId: 'button1',
        },
      ],
      widgetName: 'Pod',
      attributes: [],
      uiClass: 'Pod',
      commands: [
        {
          commandName: 'deactivateCalendar',
          nparams: 0,
        },
        {
          commandName: 'refreshPodMode',
          nparams: 0,
        },
        {
          commandName: 'getName',
          nparams: 0,
        },
        {
          commandName: 'setPodLedOff',
          nparams: 0,
        },
        {
          nparams: 1,
          commandName: 'setCalendar',
          paramsSig: 'p1',
        },
        {
          commandName: 'setPodLedOn',
          nparams: 0,
        },
        {
          commandName: 'activateCalendar',
          nparams: 0,
        },
        {
          nparams: 1,
          commandName: 'setLightingLedPodMode',
          paramsSig: 'p1',
        },
        {
          commandName: 'update',
          nparams: 0,
        },
        {
          commandName: 'refreshUpdateStatus',
          nparams: 0,
        },
        {
          nparams: 1,
          commandName: 'setCountryCode',
          paramsSig: 'p1',
        },
      ],
      type: 'ACTUATOR',
    },
  },
  {
    deviceURL: 'io://2006-4441-1365/1415497',
    available: true,
    synced: true,
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
        value: 90,
      },
      {
        type: 11,
        name: 'core:ManufacturerSettingsState',
        value: {
          current_position: 51200,
        },
      },
      {
        type: 1,
        name: 'core:ClosureState',
        value: 100,
      },
      {
        type: 3,
        name: 'core:OpenClosedState',
        value: 'closed',
      },
      {
        type: 1,
        name: 'core:TargetClosureState',
        value: 100,
      },
      {
        type: 6,
        name: 'core:MovingState',
        value: false,
      },
      {
        type: 3,
        name: 'core:NameState',
        value: 'Volet du salon',
      },
      {
        type: 1,
        name: 'core:Memorized1PositionState',
        value: 25,
      },
    ],
    label: 'Volet du salon',
    subsystemId: 0,
    attributes: [
      {
        type: 10,
        name: 'core:SupportedManufacturerSettingsCommands',
        value: [
          'dead_man_up',
          'dead_man_down',
          'dead_man_stop',
          'dead_man_impulse_up',
          'dead_man_impulse_down',
          'enter_settings_mode',
          'save_upper_end_limit',
          'save_lower_end_limit',
          'stop_after_save_limit',
          'save_settings',
          'invert_rotation',
          'save_my_position',
          'delete_my_position',
          'reset_actuator',
          'double_power_cut',
          'eject_from_setting_mode',
        ],
      },
      {
        type: 3,
        name: 'core:Manufacturer',
        value: 'Somfy',
      },
      {
        type: 3,
        name: 'core:FirmwareRevision',
        value: '5100394X22',
      },
    ],
    enabled: true,
    controllableName: 'io:RollerShutterGenericIOComponent',
    definition: {
      states: [
        {
          name: 'core:StatusState',
          rawStateId: '2147426304',
        },
        {
          name: 'core:NameState',
          rawStateId: '1',
        },
        {
          name: 'core:AdditionalStatusState',
          rawStateId: '2146500645',
        },
        {
          name: 'core:TargetClosureState',
          rawStateId: '16832522',
        },
        {
          name: 'core:SecuredPositionState',
          rawStateId: '16832522',
        },
        {
          name: 'core:ManufacturerSettingsState',
          rawStateId: '65537',
        },
        {
          name: 'core:ClosureState',
          rawStateId: '65537',
        },
        {
          name: 'core:OpenClosedState',
          rawStateId: '65537',
        },
        {
          name: 'core:MovingState',
          rawStateId: '65557',
        },
        {
          name: 'core:ManufacturerDiagnosticsState',
          rawStateId: '2',
        },
        {
          name: 'core:DiscreteRSSILevelState',
          rawStateId: '2146500638',
        },
        {
          name: 'core:RSSILevelState',
          rawStateId: '2146500638',
        },
        {
          name: 'core:Memorized1PositionState',
          rawStateId: '16832512',
        },
      ],
      widgetName: 'PositionableRollerShutter',
      attributes: [
        {
          name: 'core:SupportedManufacturerSettingsCommands',
        },
        {
          name: 'core:Manufacturer',
        },
        {
          name: 'core:FirmwareRevision',
        },
      ],
      uiClass: 'RollerShutter',
      commands: [
        {
          commandName: 'stop',
          nparams: 0,
        },
        {
          nparams: 1,
          commandName: 'setDeployment',
          paramsSig: 'p1',
        },
        {
          nparams: 1,
          commandName: 'delayedStopIdentify',
          paramsSig: 'p1',
        },
        {
          nparams: 2,
          commandName: 'runManufacturerSettingsCommand',
          paramsSig: 'p1,p2',
        },
        {
          commandName: 'down',
          nparams: 0,
        },
        {
          nparams: 1,
          commandName: 'setClosure',
          paramsSig: 'p1',
        },
        {
          commandName: 'unpairAllOneWayControllers',
          nparams: 0,
        },
        {
          nparams: 1,
          commandName: 'setConfigState',
          paramsSig: 'p1',
        },
        {
          nparams: 1,
          commandName: 'pairOneWayController',
          paramsSig: 'p1,*p2',
        },
        {
          commandName: 'unpairAllOneWayControllersAndDeleteNode',
          nparams: 0,
        },
        {
          nparams: 1,
          commandName: 'advancedRefresh',
          paramsSig: 'p1,*p2',
        },
        {
          commandName: 'refreshMemorized1Position',
          nparams: 0,
        },
        {
          commandName: 'startIdentify',
          nparams: 0,
        },
        {
          commandName: 'stopIdentify',
          nparams: 0,
        },
        {
          commandName: 'up',
          nparams: 0,
        },
        {
          commandName: 'open',
          nparams: 0,
        },
        {
          commandName: 'keepOneWayControllersAndDeleteNode',
          nparams: 0,
        },
        {
          commandName: 'sendIOKey',
          nparams: 0,
        },
        {
          nparams: 1,
          commandName: 'setMemorized1Position',
          paramsSig: 'p1',
        },
        {
          nparams: 1,
          commandName: 'wink',
          paramsSig: 'p1',
        },
        {
          commandName: 'close',
          nparams: 0,
        },
        {
          nparams: 1,
          commandName: 'setName',
          paramsSig: 'p1',
        },
        {
          commandName: 'identify',
          nparams: 0,
        },
        {
          nparams: 1,
          commandName: 'setPosition',
          paramsSig: 'p1',
        },
        {
          nparams: 1,
          commandName: 'unpairOneWayController',
          paramsSig: 'p1,*p2',
        },
        {
          nparams: 1,
          commandName: 'setSecuredPosition',
          paramsSig: 'p1',
        },
        {
          commandName: 'my',
          nparams: 0,
        },
        {
          commandName: 'getName',
          nparams: 0,
        },
      ],
      type: 'ACTUATOR',
    },
  },
];

export const mappedDevices: DevicesList = {
  shutters: [
    {
      deviceURL: 'io://2006-4441-1365/1975138',
      available: true,
      type: 1,
      states: {
        isOpen: true,
        status: 'available',
        isMoving: false,
        closeTarget: 85,
        memorized1Position: 20,
        closeLevel: 85,
      },
      label: 'Volet de la chambre',

      enabled: true,
      controllableName: 'io:RollerShutterGenericIOComponent',
    },
    {
      deviceURL: 'io://2006-4441-1365/1415497',
      available: true,
      type: 1,
      states: {
        isOpen: true,
        status: 'available',
        isMoving: false,
        closeTarget: 90,
        memorized1Position: 25,
        closeLevel: 90,
      },
      label: 'Volet du salon',
      enabled: true,
      controllableName: 'io:RollerShutterGenericIOComponent',
    },
  ],
  lights: [
    {
      deviceURL: 'rts://2006-4441-1365/16720321',
      available: true,
      type: 1,
      states: {},
      label: 'Lumière du salon',
      enabled: true,
      controllableName: 'rts:LightRTSComponent',
    },
    {
      deviceURL: 'rts://2006-4441-1365/16713552',
      available: true,
      type: 1,
      states: {},
      label: 'Lumière de la cuisine',
      enabled: true,
      controllableName: 'rts:LightRTSComponent',
    },
    {
      deviceURL: 'rts://2006-4441-1365/16714621',
      available: true,
      type: 1,
      states: {},
      label: 'Lumière de la chambre',
      enabled: true,
      controllableName: 'rts:LightRTSComponent',
    },
  ],
  heating: {
    interface: {
      deviceURL: 'ovp://2006-4441-1365/14036424#1',
      available: true,
      type: 1,
      states: {
        activeMode: 'manu',
        currentMode: 'eco',
        power: 'on',
        battery: 'normal',
        temperatureByMode: {
          comfort: 21,
          eco: 17,
          secured: 5,
        },
      },
      label: 'Chauffage',
      enabled: true,
      controllableName: 'ovp:SomfyHeatingTemperatureInterfaceOVPComponent',
    },
    sensor: {
      deviceURL: 'ovp://2006-4441-1365/14036424#2',
      available: true,
      type: 2,
      states: {
        temperature: 20.6,
      },
      label: 'Chauffage',
      enabled: true,
      controllableName: 'ovp:HeatingTemperatureInterfaceTemperatureSensor',
    },
  },
};

