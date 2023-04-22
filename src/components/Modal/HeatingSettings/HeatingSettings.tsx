import { Box, Button, TextField, Typography } from '@mui/material';
import { useQueryClient } from '@tanstack/react-query';
import { SubmitHandler, useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { CONSTANTS } from '../../../config/configuration';
import { useSendCommand } from '../../../hooks/somfy.hooks';
import { heatingSettingsForm } from '../../../interfaces/form';
import { DevicesList } from '../../../interfaces/rest/response.interface';
import { HeatingInterfaceDevice } from '../../../interfaces/somfy/device-state.interface';
import { generateTargetTemperatureModePayload } from '../../../services/somfy.service';
import AlertActions from '../../AlertActions';
import Spinner from '../../Spinner';
import BaseModal from '../BaseModal';

interface Props {
  interfaceData: HeatingInterfaceDevice;
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
}

const HeatingSettingsModal = ({ isOpen, setIsOpen, interfaceData }: Props) => {
  const {
    register,
    reset,
    handleSubmit,
    formState: { errors },
  } = useForm<heatingSettingsForm>();
  const {
    isLoading: isCommandLoading,
    isError: isCommandError,
    mutate: sendCommand,
  } = useSendCommand();
  const { t } = useTranslation();
  const queryClient = useQueryClient();

  const onSubmit: SubmitHandler<heatingSettingsForm> = (
    data: heatingSettingsForm
  ) => {
    const payload = generateTargetTemperatureModePayload(interfaceData, data);
    if (payload.actions.length > 0) {
      sendCommand(payload, {
        onSuccess: () => {
          queryClient.setQueryData(
            ['somfy-devices'],
            (currentDevices: DevicesList | undefined) => {
              const heating = currentDevices?.heating;
              if (heating) {
                heating.interface.states.temperatureByMode = {
                  comfort: data.comfort,
                  eco: data.economy,
                  secured: data.secured,
                };
              }
              return currentDevices;
            }
          );
        },
      });
    }
  };

  return (
    <BaseModal isOpen={isOpen} setIsOpen={setIsOpen}>
      {isCommandLoading && <Spinner />}
      <Typography
        variant="h1"
        color="secondary"
        sx={{
          fontWeight: 'bold',
          fontSize: '2rem',
          textAlign: 'center',
          marginBottom: 6,
        }}
      >
        {t('heatingPage.heatingSettings.title')}
      </Typography>

      <Box
        component="form"
        onSubmit={handleSubmit(onSubmit)}
        noValidate
        autoComplete="off"
        sx={{
          display: 'flex',
          flexDirection: 'column',
          paddingX: 4,
          paddingBottom: 4,
        }}
        data-testid="temperature-form"
      >
        {isCommandError && (
          <AlertActions
            severity="error"
            message={t('heatingPage.heatingSettings.error')}
          />
        )}

        <TextField
          id="comfortTemperature"
          label={t('form.heatingSettings.comfort.label') || ''}
          defaultValue={interfaceData.states.temperatureByMode.comfort}
          type="number"
          error={!!errors.comfort}
          helperText={errors?.comfort?.message}
          disabled={isCommandLoading}
          sx={{
            marginBottom: 4,
            marginTop: 2,
          }}
          {...register('comfort', {
            required: t('form.heatingSettings.comfort.errors.required'),
            valueAsNumber: true,
            min: {
              value: interfaceData.states.temperatureByMode.eco,
              message: t('form.heatingSettings.comfort.errors.min'),
            },
            max: {
              value: CONSTANTS.MAX_HEATING_TEMPERATURE,
              message: t('form.heatingSettings.comfort.errors.max', {
                max: CONSTANTS.MAX_HEATING_TEMPERATURE,
              }),
            },
          })}
        />
        <TextField
          id="ecoTemperature"
          label={t('form.heatingSettings.eco.label') || ''}
          defaultValue={interfaceData.states.temperatureByMode.eco}
          type="number"
          error={!!errors.economy}
          helperText={errors?.economy?.message}
          disabled={isCommandLoading}
          sx={{
            marginBottom: 4,
          }}
          {...register('economy', {
            required: t('form.heatingSettings.eco.errors.required'),
            valueAsNumber: true,
            min: {
              value: interfaceData.states.temperatureByMode.secured,
              message: t('form.heatingSettings.eco.errors.min'),
            },
            max: {
              value: interfaceData.states.temperatureByMode.comfort,
              message: t('form.heatingSettings.eco.errors.max'),
            },
          })}
        />
        <TextField
          id="securedTemperature"
          label={t('form.heatingSettings.secured.label') || ''}
          defaultValue={interfaceData.states.temperatureByMode.secured}
          type="number"
          error={!!errors.secured}
          helperText={errors?.secured?.message}
          disabled={isCommandLoading}
          sx={{
            marginBottom: 4,
          }}
          {...register('secured', {
            required: t('form.heatingSettings.secured.errors.required'),
            valueAsNumber: true,
            min: {
              value: 0,
              message: t('form.heatingSettings.secured.errors.min'),
            },
            max: {
              value: interfaceData.states.temperatureByMode.eco,
              message: t('form.heatingSettings.secured.errors.max'),
            },
          })}
        />
        <Box sx={{ display: 'flex', gap: 4 }}>
          <Button
            type="submit"
            variant="contained"
            color="primary"
            disabled={isCommandLoading}
          >
            {t('common.save')}
          </Button>
          <Button
            variant="contained"
            color="secondary"
            disabled={isCommandLoading}
            onClick={() => reset()}
          >
            {t('common.reset')}
          </Button>
        </Box>
      </Box>
    </BaseModal>
  );
};
export default HeatingSettingsModal;

