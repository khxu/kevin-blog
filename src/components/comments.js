import React, { useState } from 'react';
import { Magic } from 'magic-sdk';
import { useAuth } from '../hooks/useAuth';
import { useComments } from '../hooks/useComments';
import firebase from '../utils/firebase';
import Login from './login';
import CommentsComposer from './commentsComposer';
import CommentsList from './commentsList';

const Comments = ({ location }) => {
  const magic = new Magic('pk_live_D23A28869744AF1F');
  const { user } = useAuth();
  const [email, setEmail] = useState('');
  const [isLoginButtonDisabled, setisLoginButtonDisabled] = useState(false);
  const db = firebase.firestore();
  const usersCollection = db.collection('users');
  const page = location.pathname.replaceAll('/', '');
  const comments = useComments(page);

  const handleLogin = async () => {
    if (email.length) {
      try {
        setisLoginButtonDisabled(true);
        const didToken = await magic.auth.loginWithMagicLink({ email });
        const auth = firebase.functions().httpsCallable('auth');
        let result = (await auth({ didToken })).data;
        await firebase.auth().signInWithCustomToken(result.token);
        let user = await usersCollection.doc(result.uid).get();
        if (!user.exists) {
          /* Add new user to database */
          let newUser = {
            email,
          };
          await usersCollection.doc(result.uid).set(newUser);
        }
      } catch (e) {
        console.log(`Error: `, e);
      } finally {
        setisLoginButtonDisabled(false);
      }
    }
  }

  const handleLogout = async () => {
    await magic.user.logout();
    await firebase.auth().signOut();
  };

  return (
    <div className='comments-container'>
      <h1>Comments</h1>
      <CommentsList comments={comments} user={user && user.uid} page={page} />
      {
        user
          ? <CommentsComposer user={user.uid} handleLogout={handleLogout} page={page} />
          : <Login email={email} setEmail={setEmail} handleLogin={handleLogin} isLoginButtonDisabled={isLoginButtonDisabled} />
      }
    </div>
  );
};

export default Comments;