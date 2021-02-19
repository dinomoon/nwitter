import React, { useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { authService, dbService } from '../fbase';

const Profile = ({ userObj }) => {
  let history = useHistory();
  const onLogOutClick = () => {
    authService.signOut();
    history.push('/');
  };

  const getMyNweets = async () => {
    const nweets = await dbService
      .collection('nweets')
      .orderBy('createdAt', 'desc')
      .where('creatorId', '==', userObj.uid)
      .get();
    console.log(nweets.docs.map((doc) => doc.data()));
  };

  useEffect(() => {
    getMyNweets();
  }, []);

  return (
    <>
      <button onClick={onLogOutClick}>Sign Out</button>
    </>
  );
};
export default Profile;
