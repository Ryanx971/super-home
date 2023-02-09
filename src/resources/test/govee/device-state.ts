export const deviceStateResponse = {
  data: {
    device: '83:8D:A4:C1:38:CA:C9:CF',
    model: 'H6159',
    properties: [
      {
        online: 'false',
      },
      {
        powerState: 'off',
      },
      {
        brightness: 85,
      },
      {
        color: {
          r: 159,
          b: 91,
          g: 255,
        },
      },
    ],
  },
  message: 'Success',
  code: 200,
};

export const deviceStateMapped = {
  device: '83:8D:A4:C1:38:CA:C9:CF',
  model: 'H6159',
  properties: {
    online: false,
    powerState: 'off',
    brightness: 85,
    color: {
      r: 159,
      b: 91,
      g: 255,
    },
  },
};

