import React, { useState } from 'react';
import { dbService } from '../fbase';

const Nweet = ({ nweetObj, isOwner }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [newText, setNewText] = useState(nweetObj.text);
  const PATH = `nweets/${nweetObj.id}`;

  const onDelete = () => {
    const ok = window.confirm('are you sure delete this nweet?');
    if (ok) {
      dbService.doc(PATH).delete();
    }
  };

  const onToggleEdit = () => {
    setIsEditing((prev) => !prev);
  };

  const onChange = (e) => {
    setNewText(e.target.value);
  };

  const onUpdate = async (e) => {
    e.preventDefault();
    await dbService.doc(PATH).update({ text: newText });
    onToggleEdit();
  };

  return (
    <>
      {isEditing ? (
        <>
          <form onSubmit={onUpdate}>
            <input type="text" value={newText} onChange={onChange} />
            <button type="submit">Update</button>
          </form>
          <button type="button" onClick={onToggleEdit}>
            Cancel
          </button>
        </>
      ) : (
        <>
          <li>{nweetObj.text}</li>
          {nweetObj.imageUrl && <img src={nweetObj.imageUrl} width="50px" />}
          {isOwner && (
            <>
              <button onClick={onToggleEdit}>Edit</button>
              <button onClick={onDelete}>Delete</button>
            </>
          )}
        </>
      )}
    </>
  );
};

export default Nweet;
