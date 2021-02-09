import React, { useState } from 'react';
import { dbService } from '../fbase';

const Home = () => {
  const [nweet, setNweet] = useState('');
  const onSubmit = async (e) => {
    e.preventDefault();
    await dbService.collection('nweets').add({
      nweet,
      createdAt: Date.now(),
    });
    setNweet('');
  };
  const onChange = (e) => {
    const { value } = e.target;
    setNweet(value);
  };
  return (
    <form onSubmit={onSubmit}>
      <input
        name="text"
        value={nweet}
        onChange={onChange}
        type="text"
        placeholder="What`s on your mind?"
        maxLength={120}
      />
      <input type="submit" value="Nweet" />
    </form>
  );
};
export default Home;
