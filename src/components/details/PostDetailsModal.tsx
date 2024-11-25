import { Post } from '@/types';
import { useComments } from '@hook/useComments';
import Box from '@mui/material/Box';
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import { styled } from '@mui/material/styles';
import Typography from '@mui/material/Typography';
import { FC, memo } from 'react';
import CloseButton from '../common/CloseButton';
import LoadingSpinner from '../common/LoadingSpinner';
import CommentCard from './CommentCard';

//region Styled Components

const SCommentsContainer = styled(Box)({
  overflow: 'hidden',
  maxHeight: '400px',
  overflowY: 'auto'
});

const SDialog = styled(Dialog)({
  '& .MuiTypography-root::first-letter': { textTransform: 'capitalize' }
});

//endregion

interface PostDetailsModalProps {
  post: Post | null;
  open: boolean;
  onClose: () => void;
}

const PostDetailsModal: FC<PostDetailsModalProps> = ({ post, open, onClose }) => {
  const { comments, loading, error } = useComments(post?.id ?? null);

  if (!post) return null;

  return (
    <SDialog open={open} onClose={onClose} maxWidth="md" fullWidth>
      <DialogTitle>
        {post.title}
        <CloseButton onClick={onClose} />
      </DialogTitle>
      <DialogContent>
        <Typography variant="body1" component="p">
          {post.body}
        </Typography>
        {!!comments.length && (
          <Typography variant="h6" gutterBottom mb={1} mt={2}>
            Comments
          </Typography>
        )}
        {loading && <LoadingSpinner />}
        {error && (
          <Typography variant="body2" color="error">
            {error}
          </Typography>
        )}
        {!loading && !error && (
          <SCommentsContainer>
            {comments.map((comment) => (
              <CommentCard key={comment.id} {...comment} />
            ))}
          </SCommentsContainer>
        )}
      </DialogContent>
    </SDialog>
  );
};

export default memo(PostDetailsModal);
