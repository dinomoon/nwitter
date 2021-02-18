import React from 'react';

const Nweet = ({ nweetObj, isOwner }) => {
  return (
    <>
      <li>{nweetObj.text}</li>
      {isOwner && (
        <>
          <button>Edit</button>
          <button>Delete</button>
        </>
      )}
    </>
  );
};

export default Nweet;
