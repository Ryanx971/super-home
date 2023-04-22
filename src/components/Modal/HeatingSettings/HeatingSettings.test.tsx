import { beforeEach, describe, expect, it, vi } from 'vitest';
import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import HeatingSettings from './HeatingSettings';
import { interfaceData } from '../../../test/resources/somfy/heating';
import { ReactQueryWrapper } from '../../../test/wrappers/react-query.wrapper';

const sendCommandMock = vi.fn();

vi.mock('../../../hooks/somfy.hooks', async () => {
  const actual = await vi.importActual<
    typeof import('../../../hooks/somfy.hooks')
  >('../../../hooks/somfy.hooks');
  return {
    ...actual,
    useSendCommand: () => ({ mutate: sendCommandMock }),
  };
});

describe('HeatingSettings component', () => {
  beforeEach(() => {
    const setIsOpen = vi.fn();
    render(
      <HeatingSettings
        isOpen={true}
        setIsOpen={setIsOpen}
        interfaceData={interfaceData}
      />,
      {
        wrapper: ReactQueryWrapper,
      }
    );
  });

  it('should render component', async () => {
    expect(screen.getByText('heatingPage.heatingSettings.title')).toBeTruthy();

    // check default temperature
    // ! using toString() because input return string instead of number
    expect(
      screen.getByLabelText<HTMLInputElement>(
        'form.heatingSettings.comfort.label'
      ).value
    ).toEqual(interfaceData.states.temperatureByMode.comfort.toString());

    expect(
      screen.getByLabelText<HTMLInputElement>('form.heatingSettings.eco.label')
        .value
    ).toEqual(interfaceData.states.temperatureByMode.eco.toString());

    expect(
      screen.getByLabelText<HTMLInputElement>(
        'form.heatingSettings.secured.label'
      ).value
    ).toEqual(interfaceData.states.temperatureByMode.secured.toString());
  });

  it('should reset temperatures value', async () => {
    const comfortInput = screen.getByLabelText(
      'form.heatingSettings.comfort.label'
    );
    fireEvent.change(comfortInput, { target: { value: '22' } });

    const ecoInput = screen.getByLabelText('form.heatingSettings.eco.label');
    fireEvent.change(ecoInput, { target: { value: '18' } });

    const securedInput = screen.getByLabelText(
      'form.heatingSettings.secured.label'
    );
    fireEvent.change(securedInput, { target: { value: '10' } });

    fireEvent.click(screen.getByText('common.reset'));

    // ! using toString() because input return string instead of number
    expect(
      screen.getByLabelText<HTMLInputElement>(
        'form.heatingSettings.comfort.label'
      ).value
    ).toEqual(interfaceData.states.temperatureByMode.comfort.toString());

    expect(
      screen.getByLabelText<HTMLInputElement>('form.heatingSettings.eco.label')
        .value
    ).toEqual(interfaceData.states.temperatureByMode.eco.toString());

    expect(
      screen.getByLabelText<HTMLInputElement>(
        'form.heatingSettings.secured.label'
      ).value
    ).toEqual(interfaceData.states.temperatureByMode.secured.toString());
  });

  it('should update temperatures value', async () => {
    const newComfortValue = '22';
    const newEcoValue = '18';
    const newSecuredValue = '10';
    const expectedSendCommandPayload = {
      label: 'Update target temperature for modes',
      actions: [
        {
          commands: [
            {
              name: 'setComfortTemperature',
              parameters: [22],
            },
          ],
          deviceURL: 'ovp://2006-4441-1365/14036424#1',
        },
        {
          commands: [
            {
              name: 'setEcoTemperature',
              parameters: [18],
            },
          ],
          deviceURL: 'ovp://2006-4441-1365/14036424#1',
        },
        {
          commands: [
            {
              name: 'setSecuredPositionTemperature',
              parameters: [10],
            },
          ],
          deviceURL: 'ovp://2006-4441-1365/14036424#1',
        },
      ],
    };

    const comfortInput = screen.getByLabelText(
      'form.heatingSettings.comfort.label'
    );
    fireEvent.change(comfortInput, { target: { value: newComfortValue } });

    const ecoInput = screen.getByLabelText('form.heatingSettings.eco.label');
    fireEvent.change(ecoInput, { target: { value: newEcoValue } });

    const securedInput = screen.getByLabelText(
      'form.heatingSettings.secured.label'
    );
    fireEvent.change(securedInput, { target: { value: newSecuredValue } });

    fireEvent.click(screen.getByText('common.save'));

    await waitFor(() => {
      expect(sendCommandMock).toHaveBeenCalledWith(expectedSendCommandPayload, {
        onSuccess: expect.any(Function),
      });

      expect(
        screen.getByLabelText<HTMLInputElement>(
          'form.heatingSettings.comfort.label'
        ).value
      ).toEqual(newComfortValue);

      expect(
        screen.getByLabelText<HTMLInputElement>(
          'form.heatingSettings.eco.label'
        ).value
      ).toEqual(newEcoValue);

      expect(
        screen.getByLabelText<HTMLInputElement>(
          'form.heatingSettings.secured.label'
        ).value
      ).toEqual(newSecuredValue);
    });
  });
});

