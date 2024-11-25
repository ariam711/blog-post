import Avatar from '@mui/material/Avatar';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardHeader from '@mui/material/CardHeader';
import styled from '@mui/material/styles/styled';
import Typography from '@mui/material/Typography';
import { FC, memo } from 'react';

//region Styled Components

const SCard = styled(Card)(({ theme }) => ({
  maxWidth: '100%',
  margin: theme.spacing(1),
  boxShadow: theme.shadows[1]
}));

const SCardHeader = styled(CardHeader)({
  paddingBottom: 0
});

const SCardContent = styled(CardContent)(({ theme }) => ({
  '&:last-child': {
    paddingBottom: theme.spacing(2)
  }
}));

const STitleTypography = styled(Typography)(({ theme }) => ({
  fontWeight: theme.typography.fontWeightBold
}));

//endregion

/**
 * Props for the CommentCard component.
 *
 * @interface CommentCardProps
 * @property {number} postId - The ID of the post.
 * @property {number} id - The ID of the comment.
 * @property {string} name - The name of the comment author.
 * @property {string} email - The email of the comment author.
 * @property {string} body - The body of the comment.
 */
interface CommentCardProps {
  postId: number;
  id: number;
  name: string;
  email: string;
  body: string;
}

const CommentCard: FC<CommentCardProps> = ({ postId, id, name, email, body }) => (
  <SCard>
    <SCardHeader
      avatar={<Avatar aria-label="comment author">{email.charAt(0)}</Avatar>}
      title={<STitleTypography variant="subtitle1">{name}</STitleTypography>}
      subheader={
        <Typography variant="body2" color="text.secondary" noWrap>
          {email}
        </Typography>
      }
    />
    <SCardContent>
      <Typography variant="body2" color="text.primary" component="p">
        {body}
      </Typography>
      <Box display="flex" justifyContent="space-between" alignItems="center" mt="1rem">
        <Typography variant="caption" color="text.secondary">
          Post ID: {postId}
        </Typography>
        <Typography variant="caption" color="text.secondary">
          Comment ID: {id}
        </Typography>
      </Box>
    </SCardContent>
  </SCard>
);

export default memo(CommentCard);
