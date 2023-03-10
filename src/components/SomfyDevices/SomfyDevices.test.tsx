import { render, screen, waitFor } from '@testing-library/react';
import { rest } from 'msw';
import { describe, expect, it } from 'vitest';
import { SOMFY } from '../../config/configuration';
import { server } from '../../test/mocks/server';
import { devices } from '../../test/resources/somfy/devices';
import { ReactQueryWrapper } from '../../test/wrappers/react-query.wrapper';
import SomfyDevices from './SomfyDevices';

describe('SomfyDevices component', () => {
  it('should render devices', async () => {
    render(<SomfyDevices />, {
      wrapper: ReactQueryWrapper,
    });

    await waitFor(() => {
      expect(screen.getByText(devices[0].label)).toBeTruthy();
      expect(screen.getByTestId('devices-list')).toBeTruthy();
      expect(screen.queryByTestId('homePage.somfy.error')).toBeNull();
      expect(screen.queryByText('homePage.reloadDevices')).toBeNull();
    });
  });

  it('should render error', async () => {
    server.use(
      rest.get(`${SOMFY.api.baseUrl}/setup/devices`, (req, res, ctx) => {
        return res.networkError('Failed to connect');
      })
    );

    render(<SomfyDevices />, {
      wrapper: ReactQueryWrapper,
    });

    await waitFor(() => {
      expect(screen.queryByText(devices[0].deviceURL)).toBeNull();
      expect(screen.queryByTestId('devices-list')).toBeNull();
      expect(screen.getByText('homePage.somfy.error')).toBeTruthy();
      expect(screen.getByText('homePage.reloadDevices')).toBeTruthy();
    });
  });
});

