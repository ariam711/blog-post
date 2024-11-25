'use client';

import { Post, PostFormData } from '@/types';
import LoadingOverlay from '@cmp/common/LoadingOverlay';
import PostDetailsModal from '@cmp/details/PostDetailsModal';
import { usePaginatedPosts } from '@hook/usePaginatedPosts';
import AddIcon from '@mui/icons-material/Add';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import CircularProgress from '@mui/material/CircularProgress';
import Container from '@mui/material/Container';
import styled from '@mui/material/styles/styled';
import Typography from '@mui/material/Typography';
import React, { memo, useState } from 'react';
import { VirtuosoGrid } from 'react-virtuoso';
import ConfirmationDialog from './ConfirmationDialog';
import PostFormModal from './form/PostFormModal';
import Notification from './notification';
import PostCard from './PostCard';

//region Styled Components

const SContainer = styled(Container)(({ theme }) => ({
  paddingTop: theme.spacing(4),
  paddingBottom: theme.spacing(4),
  width: '100vw',
  '&': { maxWidth: '1250px' },
  position: 'relative'
}));

const SHeaderBox = styled(Box)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'flex-start',
  marginBottom: theme.spacing(4)
}));

const ItemContainer = styled('div')({
  height: '100%',
  padding: '2px'
});

const ListContainer = styled('div')({
  display: 'grid',
  gridTemplateColumns: 'repeat(auto-fill, minmax(382px, 1fr))',
  gridAutoRows: 'minmax(150px, auto)',
  gap: '12px'
});

const LoadingBox = styled(Box)({
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  height: '100vh'
});

const ErrorBox = styled(Box)({
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  height: '100vh'
});

const AddPostButton = styled(Button)({
  '&': {
    marginLeft: '2rem',
    backgroundColor: '#fff',
    border: 'unset',
    boxShadow: '0 1px 3px rgba(0, 0, 0, 0.12), 0 1px 2px rgba(0, 0, 0, 0.24)'
  }
});

//endregion

const PostsPage: React.FC = () => {
  const { displayedPosts, status, error, createPost, updatePost, deletePost, loadMore } = usePaginatedPosts();
  const [isFormOpen, setIsFormOpen] = useState<boolean>(false);
  const [editingPost, setEditingPost] = useState<Post | null>(null);
  const [deletingPost, setDeletingPost] = useState<Post | null>(null);
  const [selectedPost, setSelectedPost] = useState<Post | null>(null);

  const handleCreatePost = (postData: PostFormData) => {
    createPost(postData);
    setIsFormOpen(false);
  };

  const handleEditPost = (postData: PostFormData) => {
    if (editingPost) {
      updatePost({ id: editingPost.id, postData });
      setEditingPost(null);
    }
  };

  const handleDeletePost = () => {
    if (deletingPost) {
      deletePost(deletingPost.id);
      setDeletingPost(null);
    }
  };

  const handleCloseForm = () => {
    setIsFormOpen(false);
    setEditingPost(null);
  };

  if (status === 'loading' && displayedPosts.length === 0) {
    return (
      <LoadingBox>
        <CircularProgress />
      </LoadingBox>
    );
  }

  if (status === 'failed') {
    return (
      <ErrorBox>
        <Typography color="error">{error}</Typography>
      </ErrorBox>
    );
  }

  return (
    <SContainer>
      <SHeaderBox>
        <Typography variant="h4" component="h1">
          Posts
        </Typography>
        <AddPostButton variant="contained" startIcon={<AddIcon />} onClick={() => setIsFormOpen(true)}>
          Create new post
        </AddPostButton>
      </SHeaderBox>
      <VirtuosoGrid
        totalCount={displayedPosts.length}
        increaseViewportBy={200}
        components={{
          Item: ItemContainer,
          List: ListContainer
        }}
        endReached={loadMore}
        itemContent={(index) => (
          <PostCard
            key={displayedPosts[index].id}
            post={displayedPosts[index]}
            onEdit={setEditingPost}
            onDelete={setDeletingPost}
            onSeeMore={setSelectedPost}
          />
        )}
        style={{ height: '580px' }}
      />

      {/* Post Form Dialog */}
      <PostFormModal
        post={editingPost}
        onClose={handleCloseForm}
        open={isFormOpen || !!editingPost}
        onSubmit={editingPost ? handleEditPost : handleCreatePost}
      />

      {/* Confirmation Dialog */}
      <ConfirmationDialog
        open={!!deletingPost}
        title="Confirm Deletion"
        content="Are you sure you want to delete this post? This action cannot be undone."
        onConfirm={handleDeletePost}
        onCancel={() => setDeletingPost(null)}
      />

      {/* Post Details Modal */}
      {selectedPost && (
        <PostDetailsModal post={selectedPost} open={!!selectedPost} onClose={() => setSelectedPost(null)} />
      )}

      {/* Notifications */}
      <Notification />

      {/* Loading Action Overlay */}
      <LoadingOverlay />
    </SContainer>
  );
};

export default memo(PostsPage);
