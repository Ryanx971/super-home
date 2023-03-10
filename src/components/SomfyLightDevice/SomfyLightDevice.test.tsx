import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import { rest } from 'msw';
import { describe, expect, it, vi } from 'vitest';
import { SOMFY } from '../../config/configuration';
import { DeviceControlPayload } from '../../interfaces/somfy/device-control.interface';
import { LightDevice } from '../../interfaces/somfy/device-state.interface';
import { server } from '../../test/mocks/server';
import { devices } from '../../test/resources/somfy/devices';
import { ReactQueryWrapper } from '../../test/wrappers/react-query.wrapper';
import SomfyLightDevice from './SomfyLightDevice';

const sendCommandMock = vi.fn();

vi.mock('../../hooks/somfy.hooks', async () => {
  const actual = await vi.importActual<
    typeof import('../../hooks/somfy.hooks')
  >('../../hooks/somfy.hooks');
  return {
    ...actual,
    useSendCommand: () => ({ mutate: sendCommandMock }),
  };
});

describe('SomfyLightDevice component', () => {
  const device: LightDevice = devices[1];

  it('should render device', async () => {
    render(<SomfyLightDevice device={device} />, {
      wrapper: ReactQueryWrapper,
    });

    await waitFor(() => {
      expect(screen.getByText(device.label)).toBeTruthy();
      expect(screen.queryByTestId('somfy-device-error')).toBeNull();
    });
  });

  it('should render device and handle power state change "ON"', async () => {
    render(<SomfyLightDevice device={device} />, {
      wrapper: ReactQueryWrapper,
    });

    const payload: DeviceControlPayload = {
      label: 'payload.somfyLight.powerstate',
      actions: [
        {
          commands: [
            {
              name: 'on',
            },
          ],
          deviceURL: device.deviceURL,
        },
      ],
    };

    await waitFor(() => {
      fireEvent.click(screen.getByText('common.on'));
      expect(sendCommandMock).toHaveBeenCalledWith(payload);
    });
  });

  it('should render device and handle power state change "OFF"', async () => {
    render(<SomfyLightDevice device={device} />, {
      wrapper: ReactQueryWrapper,
    });

    const payload: DeviceControlPayload = {
      label: 'payload.somfyLight.powerstate',
      actions: [
        {
          commands: [
            {
              name: 'off',
            },
          ],
          deviceURL: device.deviceURL,
        },
      ],
    };

    await waitFor(() => {
      fireEvent.click(screen.getByText('common.off'));
      expect(sendCommandMock).toHaveBeenCalledWith(payload);
    });
  });

  it('should render error', async () => {
    server.use(
      rest.get(
        `${SOMFY.api.baseUrl}/setup/devices/${encodeURIComponent(
          device.deviceURL
        )}`,
        (req, res, ctx) => {
          return res.networkError('Failed to connect');
        }
      )
    );

    render(<SomfyLightDevice device={device} />, {
      wrapper: ReactQueryWrapper,
    });

    await waitFor(() => {
      fireEvent.click(screen.getByTestId('refresh-device-data'));
      expect(screen.getByTestId('somfy-device-error')).toBeTruthy();
    });
  });
});

