import { Box, IconButton, Modal } from '@mui/material';
import { ReactNode } from 'react';
import { Close } from '@mui/icons-material';
import theme from '../../utils/theme';

interface Props {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
  children: ReactNode;
}

const BaseModal = ({ isOpen, setIsOpen, children }: Props) => {
  const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: { xs: '10rem', md: '30rem' },
    backgroundColor: theme.palette.white,
    outline: 'none',
    borderRadius: '20px',
    p: 1,
  };

  const handleClose = () => setIsOpen(false);

  return (
    <Modal open={isOpen} onClose={handleClose} data-testid="base-modal">
      <Box sx={style}>
        <Box display="flex" justifyContent="end">
          <Box>
            <IconButton onClick={() => setIsOpen(false)}>
              <Close color="primary" fontSize="medium" />
            </IconButton>
          </Box>
        </Box>
        <Box>{children}</Box>
      </Box>
    </Modal>
  );
};

export default BaseModal;

