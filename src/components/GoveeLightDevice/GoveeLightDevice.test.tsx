import { SliderProps, SliderTypeMap } from '@mui/material';
import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import { rest } from 'msw';
import { describe, expect, it, vi } from 'vitest';
import { GOVEE } from '../../config/configuration';
import { DeviceControlPayload } from '../../interfaces/govee/device-control.interface';
import { Device } from '../../interfaces/govee/device.interface';
import { server } from '../../test/mocks/server';
import { devices } from '../../test/resources/govee/devices';
import { ReactQueryWrapper } from '../../test/wrappers/react-query.wrapper';
import GoveeLightDevice from './GoveeLightDevice';

const deviceCommandMock = vi.fn();

vi.mock('../../hooks/govee.hooks', async () => {
  const actual = await vi.importActual<
    typeof import('../../hooks/govee.hooks')
  >('../../hooks/govee.hooks');
  return {
    ...actual,
    useDeviceControlUpdate: () => ({ mutate: deviceCommandMock }),
  };
});

describe('GoveeLightDevice component', () => {
  const device: Device = devices[0];

  it('should render device', async () => {
    render(<GoveeLightDevice device={device} />, {
      wrapper: ReactQueryWrapper,
    });

    await waitFor(() => {
      expect(screen.getByText(device.deviceName)).toBeTruthy();
      expect(screen.getByText(device.model)).toBeTruthy();
      expect(screen.queryByTestId('govee-device-error')).toBeNull();
    });
  });

  it('should render device and handle power state change "OFF"', async () => {
    render(<GoveeLightDevice device={device} />, {
      wrapper: ReactQueryWrapper,
    });

    const payload: DeviceControlPayload = {
      device: device.device,
      model: device.model,
      cmd: {
        name: 'turn',
        value: 'off',
      },
    };

    await waitFor(() => {
      const switchElement = screen.getByRole('checkbox');
      switchElement.click();
      fireEvent.change(switchElement, {
        target: { checked: '' },
      });
      expect(deviceCommandMock).toHaveBeenCalledWith(payload, {
        onSuccess: expect.any(Function),
      });
    });
  });

  it('should render error', async () => {
    server.use(
      rest.get(`${GOVEE.baseUrl}/devices/state`, (req, res, ctx) => {
        return res.networkError('Failed to connect');
      })
    );

    render(<GoveeLightDevice device={device} />, {
      wrapper: ReactQueryWrapper,
    });

    await waitFor(() => {
      expect(screen.queryByTestId('govee-device-error')).toBeTruthy();
    });
  });
});

