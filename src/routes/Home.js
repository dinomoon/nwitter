import React, { useEffect, useState } from 'react';
import Nweet from '../components/Nweet';
import { dbService, storageService } from '../fbase';
import { v4 as uuidv4 } from 'uuid';

const Home = ({ userObj }) => {
  const [nweet, setNweet] = useState('');
  const [nweets, setNweets] = useState([]);
  const [imageSrc, setImageSrc] = useState('');

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
    // nweets폴더에 nweet 추가
    let imageUrl = '';
    if (imageSrc !== '') {
      const imageRef = storageService.ref().child(`${userObj.uid}/${uuidv4()}`);
      const response = await imageRef.putString(imageSrc, 'data_url');
      imageUrl = await response.ref.getDownloadURL();
    }
    const nweetObj = {
      text: nweet,
      createdAt: Date.now(),
      creatorId: userObj.uid,
      imageUrl,
    };
    await dbService.collection('nweets').add(nweetObj);
    setNweet('');
    setImageSrc('');
  };
  const onChange = (e) => {
    const { value } = e.target;
    setNweet(value);
  };

  const onFileChange = (e) => {
    const { files } = e.target;
    const theFile = files[0];
    const reader = new FileReader();
    reader.onloadend = (finishedEvent) => {
      const { result } = finishedEvent.currentTarget;
      setImageSrc(result);
    };
    reader.readAsDataURL(theFile);
  };

  const onClearImage = () => setImageSrc('');

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
          <input type="file" accept="image/*" onChange={onFileChange} />
          <input type="submit" value="Nweet" />
        </form>
        <img src={imageSrc} alt="photo" width="50px" />
        <button type="button" onClick={onClearImage}>
          Clear
        </button>
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
