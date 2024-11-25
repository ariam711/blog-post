import { Post } from '@/types';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import VisibilityIcon from '@mui/icons-material/Visibility';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import IconButton from '@mui/material/IconButton';
import { styled } from '@mui/material/styles';
import Tooltip from '@mui/material/Tooltip';
import Typography from '@mui/material/Typography';
import { FC, memo } from 'react';

//region Styled Components
const SCard = styled(Card)({
  height: '100%',
  display: 'flex',
  flexDirection: 'column',
  transition: 'all 0.2s ease-in-out',
  borderRadius: '8px',
  '&:hover': {
    boxShadow: '0 4px 20px 0 #0000001f',
    transform: 'translateY(-4px)'
  }
});

const SCardContent = styled(CardContent)({
  flexGrow: 1,
  padding: '16px 16px 0',
  '& .MuiTypography-root': {
    overflow: 'hidden',
    display: '-webkit-box',
    textOverflow: 'ellipsis',
    WebkitBoxOrient: 'vertical',
    '&::first-letter': { textTransform: 'capitalize' },
    '&:first-child': { WebkitLineClamp: 1, marginBottom: '8px', lineHeight: 1.3, fontWeight: 'bold' },
    '&:last-child': { WebkitLineClamp: 3, marginBottom: '16px', lineHeight: 1.5 }
  }
});

const SCardActions = styled(CardActions)({
  justifyContent: 'flex-end',
  padding: '0 16px 16px',
  marginTop: 'auto'
});

//endregion

/**
 * Props for the ActionButton component.
 * @property {string} title - The tooltip title for the button.
 * @property {() => void} onClick - The click handler for the button.
 * @property {string} ariaLabel - The aria-label for accessibility.
 * @property {string} color - The color of the button.
 * @property {React.ElementType} Icon - The icon component to be displayed in the button.
 */
interface ActionButtonProps {
  title: string;
  onClick: () => void;
  ariaLabel: string;
  color?: string;
  Icon: React.ElementType;
}

const ActionButton: FC<ActionButtonProps> = ({ title, onClick, ariaLabel, Icon, color = 'primary' }) => (
  <Tooltip title={title} arrow>
    <IconButton
      size="small"
      onClick={onClick}
      aria-label={ariaLabel}
      sx={{ color: `${color}.main`, borderColor: `${color}.light`, '&:hover': { color: `${color}.dark` } }}
    >
      <Icon />
    </IconButton>
  </Tooltip>
);

/**
 * Props for the PostCard component.
 * @property {Post} post - The post data to be displayed.
 * @property {(post: Post) => void} onEdit - The handler for editing the post.
 * @property {(post: Post) => void} onDelete - The handler for deleting the post.
 * @property {(post: Post) => void} onSeeMore - The handler for viewing more details of the post.
 */
interface PostCardProps {
  post: Post;
  onEdit: (post: Post) => void;
  onDelete: (post: Post) => void;
  onSeeMore: (post: Post) => void;
}

const PostCard: FC<PostCardProps> = ({ post, onEdit, onDelete, onSeeMore }) => (
  <SCard>
    <SCardContent>
      <Typography variant="h6" component="h2" gutterBottom>
        {post.title}
      </Typography>
      <Typography variant="body2" color="text.secondary">
        {post.body}
      </Typography>
    </SCardContent>
    <SCardActions>
      <ActionButton
        title="See more"
        onClick={() => onSeeMore(post)}
        ariaLabel="see more details"
        Icon={VisibilityIcon}
      />
      <ActionButton title="Edit post" onClick={() => onEdit(post)} ariaLabel="edit post" Icon={EditIcon} />
      <ActionButton
        title="Delete post"
        onClick={() => onDelete(post)}
        ariaLabel="delete post"
        color="secondary"
        Icon={DeleteIcon}
      />
    </SCardActions>
  </SCard>
);

export default memo(PostCard);
