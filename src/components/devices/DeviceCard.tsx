import React from 'react';
import {
  Box,
  Card,
  CardContent,
  CardHeader,
  CardMedia,
  ToggleButton,
  ToggleButtonGroup,
} from '@mui/material';
import { IDevice } from '../../models';
import { useDeviceControl, useDeviceState } from '../../hooks/govee.hooks';

interface IProps {
  device: IDevice;
}

const DeviceCard = ({ device }: IProps) => {
  const { error, isLoading, isError, refetch } = useDeviceState(device);
  const mutation = useDeviceControl();

  const handleStateChange = (event: any) => {
    event.preventDefault();
    const data: any = {
      device: device.device,
      model: device.model,
      cmd: {
        name: 'turn',
        value: event.target.value,
      },
    };
    mutation.mutate(data);
  };

  return (
    <Box>
      {!isLoading && (
        <Card>
          <CardHeader title={device.deviceName} />
          <CardMedia
            component="img"
            height="130"
            image="https://m.media-amazon.com/images/S/abs-image-upload-na/7/AmazonStores/A13V1IB3VIYZZH/90bce644a4b01493cb878249e3d07772.w2276.h2276.jpg"
            alt={`${device.deviceName} image`}
          />
          {device.state && (
            <CardContent>
              <ToggleButtonGroup
                exclusive
                value={device.state?.powerState}
                disabled={!device.state?.online}
                aria-label="turn on or turn off device"
                onChange={handleStateChange}
              >
                <ToggleButton
                  value="on"
                  aria-label="on"
                  disabled={device.state?.powerState === 'on'}
                >
                  ON
                </ToggleButton>
                <ToggleButton
                  value="off"
                  aria-label="off"
                  disabled={device.state?.powerState === 'off'}
                >
                  OFF
                </ToggleButton>
              </ToggleButtonGroup>
            </CardContent>
          )}
        </Card>
      )}
    </Box>
  );
};

export default DeviceCard;

