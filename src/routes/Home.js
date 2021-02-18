import React, { useEffect, useState } from 'react';
import { dbService } from '../fbase';

const Home = () => {
  const [nweet, setNweet] = useState('');
  const [nweets, setNweets] = useState([]);

  const getNweets = async () => {
    // nweets 폴더에서 데이터 가져오기
    const dbNweets = await dbService.collection('nweets').get();

    dbNweets.forEach((document) => {
      const newNweet = {
        ...document.data(),
        id: document.id,
      };
      setNweets((prev) => [newNweet, ...prev]);
    });
  };
  useEffect(() => {
    getNweets();
  }, []);

  const onSubmit = async (e) => {
    e.preventDefault();
    // collection: 폴더, document: 파일
    // nweets폴더에 {nweet, createdAt} 추가
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
    <>
      <section>
        <form onSubmit={onSubmit}>
          <input
            name="text"
            value={nweet}
            onChange={onChange}
            type="text"
            placeholder="What's on your mind?"
            maxLength={120}
          />
          <input type="submit" value="Nweet" />
        </form>
      </section>
      <section>
        <ul>
          {nweets.map((nweet) => (
            <li key={nweet.id}>{nweet.nweet}</li>
          ))}
        </ul>
      </section>
    </>
  );
};
export default Home;
