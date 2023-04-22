import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import { rest } from 'msw';
import { describe, expect, it, vi } from 'vitest';
import { SOMFY } from '../../config/configuration';
import { DeviceControlPayload } from '../../interfaces/somfy/device-control.interface';
import { ShutterDeviceModel } from '../../interfaces/somfy/device-state.interface';
import { server } from '../../test/mocks/server';
import { mappedDevices } from '../../test/resources/somfy/devices';
import { ReactQueryWrapper } from '../../test/wrappers/react-query.wrapper';
import ShutterDevice from './ShutterDevice';

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

describe('ShutterDevice component', () => {
  const device = mappedDevices.shutters[0] as ShutterDeviceModel;

  it('should render device', async () => {
    render(<ShutterDevice device={device} />, {
      wrapper: ReactQueryWrapper,
    });

    await waitFor(() => {
      expect(screen.getByText(device.label)).toBeTruthy();
      expect(screen.queryByTestId('somfy-device-error')).toBeNull();
    });
  });

  it('should render device and handle favorite position button', async () => {
    render(<ShutterDevice device={device} />, {
      wrapper: ReactQueryWrapper,
    });

    const payload: DeviceControlPayload = {
      label: 'payload.shutter.favoritePosition.label',
      actions: [
        {
          commands: [
            {
              name: 'my',
            },
          ],
          deviceURL: device.deviceURL,
        },
      ],
    };

    await waitFor(() => {
      fireEvent.click(screen.getByTestId('favorite-position-button'));
      expect(sendCommandMock).toHaveBeenCalledWith(payload, {
        onSuccess: expect.any(Function),
      });
    });
  });

  it('should render device and handle level update "OPEN"', async () => {
    render(<ShutterDevice device={device} />, {
      wrapper: ReactQueryWrapper,
    });

    const payload: DeviceControlPayload = {
      label: 'payload.shutter.levelUpdate.label',
      actions: [
        {
          commands: [
            {
              name: 'setPosition',
              parameters: [0],
            },
          ],
          deviceURL: device.deviceURL,
        },
      ],
    };

    await waitFor(() => {
      fireEvent.click(screen.getByText('shutter.open'));
      expect(sendCommandMock).toHaveBeenCalledWith(payload, {
        onSuccess: expect.any(Function),
      });
    });
  });

  it('should render device and handle level update "CLOSE"', async () => {
    render(<ShutterDevice device={device} />, {
      wrapper: ReactQueryWrapper,
    });

    const payload: DeviceControlPayload = {
      label: 'payload.shutter.levelUpdate.label',
      actions: [
        {
          commands: [
            {
              name: 'setPosition',
              parameters: [100],
            },
          ],
          deviceURL: device.deviceURL,
        },
      ],
    };

    await waitFor(() => {
      fireEvent.click(screen.getByText('shutter.close'));
      expect(sendCommandMock).toHaveBeenCalledWith(payload, {
        onSuccess: expect.any(Function),
      });
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

    render(<ShutterDevice device={device} />, {
      wrapper: ReactQueryWrapper,
    });

    await waitFor(() => {
      fireEvent.click(screen.getByTestId('refresh-device-data'));
      expect(screen.getByTestId('somfy-device-error')).toBeTruthy();
    });
  });
});

