import React, { useState } from 'react';
import { adjectives, colors, animals, uniqueNamesGenerator } from 'unique-names-generator';
import firebase from '../utils/firebase';
import * as toxicity from '@tensorflow-models/toxicity';
import * as tf from '@tensorflow/tfjs';

const CommentsComposer = ({ user, handleLogout, page }) => {
  const [comment, setComment] = useState('');
  const randomName = uniqueNamesGenerator({
    dictionaries: [colors, adjectives, animals],
    separator: ' ',
    style: 'capital'
  });
  const [displayName, setDisplayName] = useState(randomName);
  const [displayNamePredictions, setDisplayNamePredictions] = useState([]);
  const [commentPredictions, setCommentPredictions] = useState([]);
  const [submitButtonLabel, setSubmitButtonLabel] = useState('Submit Comment');
  const maxCommentLength = 300;

  const submitComment = async () => {
    setSubmitButtonLabel('Analyzing Comment...');
    const threshold = 0.9;
    const model = await toxicity.load(threshold);
    const analysis = await model.classify([comment, displayName]);
    const toxicCommentCategories = analysis.filter(category => category.results[0].match);
    const toxicDisplayNameCategories = analysis.filter(category => category.results[1].match);
    setCommentPredictions(toxicCommentCategories);
    setDisplayNamePredictions(toxicDisplayNameCategories);
    if (
      !toxicCommentCategories.length
      && !toxicDisplayNameCategories.length
      && comment.length <= maxCommentLength
    ) {
      setSubmitButtonLabel('Submitting Comment...');
      const commentsCollection = firebase
        .firestore()
        .collection(`pages/${page}/comments`);
      await commentsCollection.add({
        displayName,
        message: comment,
        user,
        timestamp: firebase.firestore.FieldValue.serverTimestamp()
      });
      setComment('');
    }
    setSubmitButtonLabel('Submit Comment');
  };

  return (
    <div style={{
      padding: '2em',
      border: '3px solid',
      borderRadius: '5px',
      marginBottom: '1.75em'
    }}>
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'flex-start',
          width: '100%'
        }}
      >
        <label htmlFor="displayName">Display Name</label>
        <input
          style={{ width: '100%' }}
          type="text"
          id="displayName"
          value={displayName}
          onChange={(e) => setDisplayName(e.target.value)}
        />
        {
          displayNamePredictions.length
            ? <span style={{ color: 'red' }}>
              Whoa there, let's choose a different name
            </span>
            : null
        }
        <label htmlFor="message">
          {
            comment.length
              ? `${comment.length} / 300`
              : 'Message (300 characters max)'
          }
        </label>
        <textarea
          id="message"
          style={{ width: '100%' }}
          rows="5"
          onChange={(e) => {
            setCommentPredictions([]);
            if (e.target.value.length <= maxCommentLength) {
              setComment(e.target.value);
            }
          }}
          value={comment} />
        {
          commentPredictions.length
            ? <><p
              style={{ color: 'red' }}
            >
              I'm sorry {displayNamePredictions.length ? 'bud' : displayName}, I'm afraid I can't let you submit that. I detected the following problematic elements in your message: {commentPredictions.map(prediction => prediction.label).join(', ')}.
              </p><span style={{ color: 'red' }}> Sincerely,</span><br /><span style={{ color: 'red' }}>Your Device</span></>
            : null
        }
        <button
          onClick={submitComment}
          disabled={submitButtonLabel === 'Submit Comment' ? false : true}
        >
          {submitButtonLabel}
        </button>
        <button onClick={handleLogout}>Logout</button>
      </div>
    </div >
  );
};

export default CommentsComposer;