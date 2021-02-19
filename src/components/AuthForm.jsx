import React, { useState } from 'react';
import { authService, firebaseInstance } from '../fbase';
import styled from 'styled-components';

const Input = styled.input`
  display: block;
  width: 100%;
  margin-bottom: 1rem;
  padding: 0.4rem 0.6rem;
  font-size: 1rem;
`;

const AuthForm = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [newAccount, setNewAccount] = useState(true);
  const [error, setError] = useState('');

  const onChange = (e) => {
    const { name, value } = e.target;
    if (name === 'email') {
      setEmail(value);
    } else if (name === 'password') {
      setPassword(value);
    }
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    try {
      if (newAccount) {
        await authService.createUserWithEmailAndPassword(email, password);
      } else {
        await authService.signInWithEmailAndPassword(email, password);
      }
    } catch (error) {
      setError(error.message);
    }
  };

  const toggleAccount = () => setNewAccount((prev) => !prev);
  const onSocialClick = async (e) => {
    const { name } = e.target;
    let provider;
    if (name === 'google') {
      provider = new firebaseInstance.auth.GoogleAuthProvider();
    } else if (name === 'github') {
      provider = new firebaseInstance.auth.GithubAuthProvider();
    }
    await authService.signInWithPopup(provider);
  };
  return (
    <section>
      <div>
        <form onSubmit={onSubmit}>
          <label htmlFor="email">email</label>
          <Input
            id="email"
            name="email"
            onChange={onChange}
            value={email}
            type="text"
            placeholder="Email"
            required
          />
          <label htmlFor="password">password</label>
          <Input
            id="password"
            name="password"
            onChange={onChange}
            value={password}
            type="password"
            placeholder="Password"
            required
          />
          <button type="submit">
            {newAccount ? 'Create Account' : 'Sign In'}
          </button>
        </form>
      </div>
      <div>
        <button onClick={onSocialClick} name="google">
          Continue with Google
        </button>
        <button onClick={onSocialClick} name="github">
          Continue with Github
        </button>
      </div>
      <span onClick={toggleAccount}>
        {newAccount ? 'Sign in' : 'Create Account'}
      </span>
      <p>{error}</p>
    </section>
  );
};

export default AuthForm;
