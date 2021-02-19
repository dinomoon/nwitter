import React, { useState } from 'react';
import { dbService, storageService } from '../fbase';

const Nweet = ({ nweetObj, isOwner }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [newText, setNewText] = useState(nweetObj.text);
  const PATH = `nweets/${nweetObj.id}`;

  const onDelete = async () => {
    const ok = window.confirm('are you sure delete this nweet?');
    if (ok) {
      // Firestore에서 삭제
      await dbService.doc(PATH).delete();
      // Storage에서 삭제
      await storageService.refFromURL(nweetObj.imageUrl).delete();
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
          <form onSubmit={onUpdate} className="edit-form">
            <input type="text" value={newText} onChange={onChange} />
            <div>
              <button className="edit-btn" type="submit">
                Update
              </button>
              <button className="edit-btn" type="button" onClick={onToggleEdit}>
                Cancel
              </button>
            </div>
          </form>
        </>
      ) : (
        <>
          <li className="nweet-item">
            {nweetObj.text}
            {nweetObj.imageUrl && <img src={nweetObj.imageUrl} width="50px" />}
            {isOwner && (
              <div>
                <button className="edit-btn" onClick={onToggleEdit}>
                  Edit
                </button>
                <button className="edit-btn" onClick={onDelete}>
                  Delete
                </button>
              </div>
            )}
          </li>
        </>
      )}
    </>
  );
};

export default Nweet;
