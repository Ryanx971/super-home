import { beforeAll, beforeEach, describe, expect, it, vi } from 'vitest';
import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import HeatingDevice, { TemperatureModes } from './HeatingDevice';
import { ReactQueryWrapper } from '../../test/wrappers/react-query.wrapper';
import { interfaceData, sensorData } from '../../test/resources/somfy/heating';

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

describe('HeatingDevice component', () => {
  const HEATING_TITLE = 'heating title';
  beforeEach(() => {
    const refetch = vi.fn();
    render(
      <HeatingDevice
        title={HEATING_TITLE}
        interfaceData={interfaceData}
        sensor={sensorData}
        refresh={refetch}
      />,
      {
        wrapper: ReactQueryWrapper,
      }
    );
  });

  it('should render component', () => {
    expect(screen.getByText(HEATING_TITLE)).toBeTruthy();
  });

  describe('update temperature mode', () => {
    it('should change temperature mode to auto', async () => {
      const autoButton = screen.getByText('heatingPage.modes.auto');
      fireEvent.click(autoButton);

      await waitFor(() => {
        expect(sendCommandMock).toHaveBeenCalled();
      });
    });

    it('should change temperature mode to comfort', async () => {
      const comfortButton = screen.getByText('heatingPage.modes.comfort');
      fireEvent.click(comfortButton);

      await waitFor(() => {
        expect(sendCommandMock).toHaveBeenCalled();
      });
    });

    it('should change temperature mode to eco', async () => {
      const ecoButton = screen.getByTestId('eco-mode');
      fireEvent.click(ecoButton);

      await waitFor(() => {
        expect(sendCommandMock).toHaveBeenCalled();
      });
    });

    it('should change temperature mode to secured', async () => {
      const securedButton = screen.getByText('heatingPage.modes.secured');
      fireEvent.click(securedButton);

      await waitFor(() => {
        expect(sendCommandMock).toHaveBeenCalled();
      });
    });
  });
});

