export default {
  data: {
    devices: [
      {
        device: '83:8D:A4:C1:38:CA:C9:CF',
        model: 'H6159',
        deviceName: 'LED du canapé',
        controllable: true,
        retrievable: true,
        supportCmds: ['turn', 'brightness', 'color', 'colorTem'],
        properties: {
          colorTem: {
            range: {
              min: 2000,
              max: 9000,
            },
          },
        },
      },
      {
        device: '32:99:CD:32:32:36:40:2E',
        model: 'H6199',
        deviceName: 'LED de la télé',
        controllable: true,
        retrievable: true,
        supportCmds: ['turn', 'brightness', 'color', 'colorTem'],
        properties: {
          colorTem: {
            range: {
              min: 2000,
              max: 9000,
            },
          },
        },
      },
      {
        device: '7a:07:7c:a6:b0:e8:98:18',
        model: 'H6003',
        deviceName: 'Ampoule du salon',
        controllable: true,
        retrievable: true,
        supportCmds: ['turn', 'brightness', 'color', 'colorTem'],
        properties: {
          colorTem: {
            range: {
              min: 2000,
              max: 9000,
            },
          },
        },
      },
      {
        device: '93:e6:7c:a6:b0:14:59:c2',
        model: 'H6003',
        deviceName: 'Ampoule de la cuisine',
        controllable: true,
        retrievable: true,
        supportCmds: ['turn', 'brightness', 'color', 'colorTem'],
        properties: {
          colorTem: {
            range: {
              min: 2000,
              max: 9000,
            },
          },
        },
      },
      {
        device: '8f:70:7c:a6:b0:39:f7:9b',
        model: 'H6003',
        deviceName: 'Ampoule de la chambre',
        controllable: true,
        retrievable: true,
        supportCmds: ['turn', 'brightness', 'color', 'colorTem'],
        properties: {
          colorTem: {
            range: {
              min: 2000,
              max: 9000,
            },
          },
        },
      },
      {
        device: '53:10:D4:AD:FC:1B:6D:C6',
        model: 'H61A0',
        deviceName: 'Néon',
        controllable: true,
        retrievable: true,
        supportCmds: ['turn', 'brightness', 'color', 'colorTem'],
        properties: {
          colorTem: {
            range: {
              min: 2000,
              max: 9000,
            },
          },
        },
      },
    ],
  },
  message: 'Success',
  code: 200,
};

