import React from 'react';
import CommentsListItem from './commentsListItem';

const CommentsList = ({ comments, user, page }) => {
  return (
    <div>
      {
        comments.map(comment => <CommentsListItem key={comment.id} comment={comment} user={user} page={page} />)
      }
    </div>
  )
};

export default CommentsList;