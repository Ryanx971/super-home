import { rest } from 'msw';
import { GOVEE, SOMFY } from '../../config/configuration';
import { devices as goveeDevices } from '../resources/govee/devices';
import { devices as somfyDevices } from '../resources/somfy/devices';
import { deviceState } from '../resources/govee/device-state';

export const handlers = [
  // Govee
  rest.get(`${GOVEE.baseUrl}/devices`, (req, res, ctx) => {
    return res(
      ctx.status(200),
      ctx.json({
        data: {
          devices: goveeDevices,
        },
      })
    );
  }),

  rest.get(`${GOVEE.baseUrl}/devices/state`, (req, res, ctx) => {
    return res(ctx.status(200), ctx.json(deviceState));
  }),

  // Somfy
  rest.get(`${SOMFY.api.baseUrl}/setup/devices`, (req, res, ctx) => {
    return res(ctx.status(200), ctx.json(somfyDevices));
  }),
];

