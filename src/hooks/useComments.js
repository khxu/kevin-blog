import { useState, useEffect } from 'react';
import firebase from '../utils/firebase';

export const useComments = (page) => {
  const [comments, setComments] = useState([]);

  useEffect(() => {
    const commentsCollection = firebase.firestore().collection(`pages/${page}/comments`);
    const unsubscribe = commentsCollection.orderBy('timestamp', 'asc').onSnapshot(querySnapshot => {
      let c = [];
      querySnapshot.forEach(comment => {
        c.push({ ...comment.data(), id: comment.id });
      });
      setComments(c);
    });

    return () => unsubscribe();
  }, [page]);

  return comments;
};