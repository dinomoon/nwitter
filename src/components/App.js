import React, { useEffect, useState } from 'react';
import AppRouter from './Router';
import { authService } from '../fbase';
import '../../src/style.css';

const App = () => {
  const [init, setInit] = useState(false);
  const [userObj, setUserObj] = useState(null);
  useEffect(() => {
    // 로그인을 했어도 처음에 들어올 때는 firebase가 로드되지 않아서 로그인했다고 확인을 못해서 useEffect와 onAuthStateChanged를 사용함.
    // 그리고 로그아웃했을 때, 바로 알아차릴 수 있게 onAuthStateChanged 사용함
    authService.onAuthStateChanged((user) => {
      if (user) {
        setUserObj({
          displayName: user.displayName,
          uid: user.uid,
          updateProfile: (args) => user.updateProfile(args),
        });
      } else {
        setUserObj(null);
      }
      setInit(true);
    });
  }, []);

  const refreshUser = () => {
    const user = authService.currentUser;
    setUserObj({
      displayName: user.displayName,
      uid: user.uid,
      updateProfile: (args) => user.updateProfile(args),
    });
  };

  return (
    <div>
      <h1>Welcome to Nwitter</h1>
      {init ? (
        <AppRouter
          isLoggedIn={Boolean(userObj)}
          userObj={userObj}
          refreshUser={refreshUser}
        />
      ) : (
        'Initializing...'
      )}
      <footer>&copy; {new Date().getFullYear()} Nwitter</footer>
    </div>
  );
};

export default App;
