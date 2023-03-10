import { ColorLensOutlined } from '@mui/icons-material';
import { Box, IconButton, Popover } from '@mui/material';
import React from 'react';

interface Props {
  children: React.ReactNode;
  classes?: string;
  disabled?: boolean;
  anchorOriginVertical: number | 'bottom' | 'top' | 'center';
  anchorOriginHorizontal: number | 'center' | 'left' | 'right';
  transformOriginVertical: number | 'bottom' | 'top' | 'center';
  transformOriginHorizontal: number | 'center' | 'left' | 'right';
}

const IconPopover = ({
  children,
  disabled,
  anchorOriginVertical,
  anchorOriginHorizontal,
  transformOriginVertical,
  transformOriginHorizontal,
}: Props) => {
  const [anchorEl, setAnchorEl] = React.useState<HTMLButtonElement | null>(
    null
  );

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);
  const id = open ? 'simple-popover' : undefined;

  return (
    <Box>
      <IconButton
        aria-describedby={id}
        aria-label="color picker"
        sx={{ padding: '0', marginRight: 0.5 }}
        component="button"
        size="small"
        color="primary"
        data-testid="color-picker-button"
        disabled={disabled}
        onClick={handleClick}
      >
        <ColorLensOutlined
          fontSize="small"
          className={disabled ? 'color-gray' : 'color-primary'}
        />
      </IconButton>
      <Popover
        id={id}
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{
          vertical: anchorOriginVertical,
          horizontal: anchorOriginHorizontal,
        }}
        transformOrigin={{
          vertical: transformOriginVertical,
          horizontal: transformOriginHorizontal,
        }}
      >
        <Box
          sx={{
            padding: 2,
            boxShadow: 'box-shadow: 0px 1px 5px rgba(179, 167, 255, 0.15);',
          }}
        >
          {children}
        </Box>
      </Popover>
    </Box>
  );
};

export default IconPopover;

