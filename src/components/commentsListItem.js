import React, { useState } from 'react';
import { DateTime } from 'luxon';
import firebase from '../utils/firebase';

const CommentsListItem = ({ comment, user, page }) => {
  const [isDeleteButtonDisabled, setisDeleteButtonDisabled] = useState(false);
  const deleteComment = async (e) => {
    try {
      setisDeleteButtonDisabled(true);
      const commentDoc = firebase.firestore().doc(`pages/${page}/comments/${e.target.dataset.commentId}`);
      await commentDoc.delete();
    } catch (e) {
      console.log(`Error: `, e);
      setisDeleteButtonDisabled(false);
    }
  };

  return (
    <div>
      <h3>
        {comment.displayName} at {
          comment.timestamp
            ? DateTime
              .fromISO(
                comment.timestamp
                  .toDate()
                  .toISOString()
              )
              .toLocaleString(DateTime.DATETIME_MED)
            : null
        }
      </h3>
      <p>
        {comment.message} {
          user && comment.user === user
            ? <button
              onClick={deleteComment}
              data-comment-id={comment.id}
              disabled={isDeleteButtonDisabled}
            >
              {isDeleteButtonDisabled ? 'Deleting...' : 'Delete'}
            </button>
            : null}
      </p>
    </div>
  )
};

export default CommentsListItem;