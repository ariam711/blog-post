import CloseIcon from '@mui/icons-material/Close';
import IconButton from '@mui/material/IconButton';
import styled from '@mui/material/styles/styled';
import { FC, memo } from 'react';

//region Styled Components

const SCloseButton = styled(IconButton)({
  position: 'absolute',
  border: 'unset',
  right: 8,
  top: 8
});

//endregion

interface CloseButtonProps {
  onClick: () => void;
}

const CloseButton: FC<CloseButtonProps> = ({ onClick }) => (
  <SCloseButton aria-label="close" onClick={onClick}>
    <CloseIcon />
  </SCloseButton>
);

export default memo(CloseButton);
