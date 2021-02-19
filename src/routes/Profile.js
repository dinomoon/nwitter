import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { authService, dbService } from '../fbase';

const Profile = ({ userObj }) => {
  const [displayName, setDisplayName] = useState(userObj.displayName);
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

  const onChange = (e) => {
    const { value } = e.target;
    setDisplayName(value);
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    if (userObj.displayName !== displayName) {
      await userObj.updateProfile({
        displayName,
      });
    }
  };

  return (
    <>
      <form onSubmit={onSubmit}>
        <input
          type="text"
          placeholder="Display name"
          onChange={onChange}
          value={displayName}
        />
        <button type="submit">Update Profile</button>
      </form>
      <button onClick={onLogOutClick}>Sign Out</button>
    </>
  );
};
export default Profile;
