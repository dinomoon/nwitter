# nwitter

[https://nomadcoders.co/nwitter](https://nomadcoders.co/nwitter)

## 이해 안되는 것

### 3.3 Realtime Nweets

- nweetArray에 어떻게 모든 nweet이 들어가는지 잘 이해가 안된다. map으로 하니까 마지막 nweet만 들어갈 것처럼 보이는 데..

```jsx
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
```

## 익숙하지 않은 것

### 4. File Upload

```jsx
<input type="file" accept="image/*" onChange={onFileChange} />;

const onFileChange = (e) => {
  const { files } = e.target;
  const theFile = files[0];
  // FileReader 사용
  const reader = new FileReader();
  reader.onloadend = (finishedEvent) => {
    const { result } = finishedEvent.currentTarget;
    setImageSrc(result);
  };
  reader.readAsDataURL(theFile);
};

const onSubmit = async (e) => {
  e.preventDefault();
  let imageUrl = '';
  if (imageSrc !== '') {
    // ref().child()
    const imageRef = storageService.ref().child(`${userObj.uid}/${uuidv4()}`);
    // putString()
    const response = await imageRef.putString(imageSrc, 'data_url');
    // getDownloadURL()
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
```
