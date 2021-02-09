import React, { useState } from 'react';

const Auth = () => {
  const [email, setEmail] = useState(null);
  const [password, setPassword] = useState(null);

  const onChange = (e) => {
    const { name, value } = e.target;
    if (name === 'email') {
      setEmail(value);
    } else if (name === 'password') {
      setPassword(value);
    }
  };

  const onSubmit = (e) => {
    e.preventDefault();
  };

  return (
    <div>
      <form onSubmit={onSubmit}>
        <input
          name="email"
          onChange={onChange}
          value={email}
          type="text"
          placeholder="Email"
          required
        />
        <input
          name="password"
          onChange={onChange}
          value={password}
          type="password"
          placeholder="Password"
          required
        />
        <input type="submit" value="Lon in" />
      </form>
      <div>
        <button>Continue with Google</button>
        <button>Continue with Github</button>
      </div>
    </div>
  );
};
export default Auth;
