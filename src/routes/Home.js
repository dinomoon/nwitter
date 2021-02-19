import React, { useEffect, useState } from 'react';
import Nweet from '../components/Nweet';
import { dbService } from '../fbase';
import NweetFactory from '../components/NweetFactory';

const Home = ({ userObj }) => {
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

  return (
    <>
      <NweetFactory userObj={userObj} />
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
