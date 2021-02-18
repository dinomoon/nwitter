import React from 'react';
import { useHistory } from 'react-router-dom';
import { authService } from '../fbase';

const Profile = () => {
  let history = useHistory();
  const onLogOutClick = () => {
    authService.signOut();
    history.push('/');
  };
  return (
    <>
      <button onClick={onLogOutClick}>Sign Out</button>
    </>
  );
};
export default Profile;
