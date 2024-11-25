import { Post, PostFormData } from '@/types';
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import { FC, memo } from 'react';
import CloseButton from '../common/CloseButton';
import { PostForm } from './PostForm';

interface PostFormModalProps {
  post: Post | null;
  open: boolean;
  onClose: () => void;
  onSubmit: (post: PostFormData) => void;
}

const PostFormModal: FC<PostFormModalProps> = ({ post, open, onClose, onSubmit }) => {
  return (
    <Dialog maxWidth="md" fullWidth open={open} onClose={onClose}>
      <DialogTitle>
        {post ? 'Edit Post' : 'Create New Post'} <CloseButton onClick={onClose} />
      </DialogTitle>
      <DialogContent>
        <PostForm initialValues={post || { title: '', body: '' }} onSubmit={onSubmit} />
      </DialogContent>
    </Dialog>
  );
};

export default memo(PostFormModal);
