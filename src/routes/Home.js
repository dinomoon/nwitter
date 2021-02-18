import React, { useEffect, useState } from 'react';
import Nweet from '../components/Nweet';
import { dbService } from '../fbase';

const Home = ({ userObj }) => {
  const [nweet, setNweet] = useState('');
  const [nweets, setNweets] = useState([]);

  useEffect(() => {
    // onSnapshot => database에 변경이 일어나면 실시간으로 알려줌
    dbService
      .collection('nweets')
      .orderBy('createdAt', 'desc')
      .onSnapshot((snapshot) => {
        // 왜 ({}) 이렇게 쓰는지 잘 모르겠음 {} 이렇게만 쓰면 오류남
        const nweetArray = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setNweets(nweetArray);
      });
  }, []);

  const onSubmit = async (e) => {
    e.preventDefault();
    // collection: 폴더, document: 파일
    // nweets폴더에 {nweet, createdAt} 추가
    await dbService.collection('nweets').add({
      text: nweet,
      createdAt: Date.now(),
      creatorId: userObj.uid,
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
            <Nweet
              key={nweet.id}
              nweetObj={nweet}
              isOwner={nweet.creatorId === userObj.uid}
            />
          ))}
        </ul>
      </section>
    </>
  );
};
export default Home;
