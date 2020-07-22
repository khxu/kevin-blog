import React, { useState } from 'react';
import { adjectives, colors, animals, uniqueNamesGenerator } from 'unique-names-generator';
import firebase from '../utils/firebase';

const CommentsComposer = ({ user, handleLogout, page }) => {
  const [comment, setComment] = useState('');
  const randomName = uniqueNamesGenerator({
    dictionaries: [colors, adjectives, animals],
    separator: ' ',
    style: 'capital'
  });
  const [displayName, setDisplayName] = useState(randomName);

  const submitComment = async () => {
    const commentsCollection = firebase.firestore().collection(`pages/${page}/comments`);
    await commentsCollection.add({
      displayName,
      message: comment,
      user,
      timestamp: firebase.firestore.FieldValue.serverTimestamp()
    });
    setComment('');
  };

  return (
    <div style={{
      padding: '2em',
      border: '3px solid',
      borderRadius: '5px',
      marginBottom: '1.75em'
    }}>
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start', width: '100%' }}>
        <label htmlFor="displayName">Display Name</label>
        <input style={{ width: '100%' }} type="text" id="displayName" value={displayName} onChange={(e) => setDisplayName(e.target.value)} />
        <label htmlFor="message">Message (300 characters max)</label>
        <textarea
          id="message"
          style={{ width: '100%' }}
          rows="5"
          onChange={(e) => {
            if (e.target.value.length < 300) {
              setComment(e.target.value);
            }
          }}
          value={comment} />
        <button onClick={submitComment}>Submit Comment</button>
        <button onClick={handleLogout}>Logout</button>
      </div>
    </div>
  );
};

export default CommentsComposer;