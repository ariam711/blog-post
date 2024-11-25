import Backdrop from '@mui/material/Backdrop';
import CircularProgress from '@mui/material/CircularProgress';
import styled from '@mui/material/styles/styled';
import { useAppSelector } from '@store/hooks';
import { FC, memo } from 'react';

//region Styled Components
const SBackdrop = styled(Backdrop)(({ theme }) => ({
  zIndex: theme.zIndex.drawer + 1
}));

const SCircularProgress = styled(CircularProgress)({
  position: 'relative',
  top: '-15%'
});
//endregion

const LoadingOverlay: FC = () => {
  const { status } = useAppSelector((state) => state.posts);
  return (
    <SBackdrop open={status === 'loading'}>
      <SCircularProgress color="primary" thickness={6} />
    </SBackdrop>
  );
};

export default memo(LoadingOverlay);
