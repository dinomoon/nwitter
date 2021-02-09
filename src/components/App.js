import React, { useState } from 'react';
import AppRouter from './Router';
import { authService } from '../fbase';

const App = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(authService.currentUser);
  return (
    <div>
      <AppRouter isLoggedIn={isLoggedIn} />
      <footer>&copy; {new Date().getFullYear()} Nwitter</footer>
    </div>
  );
};

export default App;
