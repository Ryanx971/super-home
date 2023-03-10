import { render, screen, waitFor } from '@testing-library/react';
import { rest } from 'msw';
import { describe, expect, it } from 'vitest';
import { GOVEE } from '../../config/configuration';
import { server } from '../../test/mocks/server';
import { devices } from '../../test/resources/govee/devices';
import { ReactQueryWrapper } from '../../test/wrappers/react-query.wrapper';
import GoveeDevices from './GoveeDevices';

describe('GoveeDevices component', () => {
  it('should render devices', async () => {
    render(<GoveeDevices />, {
      wrapper: ReactQueryWrapper,
    });

    await waitFor(() => {
      expect(screen.getByText(devices[0].deviceName)).toBeTruthy();
      expect(screen.getByText(devices[0].model)).toBeTruthy();
      expect(screen.getByTestId('devices-list')).toBeTruthy();
      expect(screen.queryByText('homePage.govee.error')).toBeNull();
      expect(screen.queryByText('homePage.reloadDevices')).toBeNull();
    });
  });

  it('should render error', async () => {
    server.use(
      rest.get(`${GOVEE.baseUrl}/devices`, (req, res, ctx) => {
        return res.networkError('Failed to connect');
      })
    );

    render(<GoveeDevices />, {
      wrapper: ReactQueryWrapper,
    });

    await waitFor(() => {
      expect(screen.queryByText(devices[0].deviceName)).toBeNull();
      expect(screen.queryByText(devices[0].model)).toBeNull();
      expect(screen.queryByTestId('devices-list')).toBeNull();
      expect(screen.getByText('homePage.govee.error')).toBeTruthy();
      expect(screen.getByText('homePage.reloadDevices')).toBeTruthy();
    });
  });
});

