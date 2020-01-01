import React, { useState, useContext } from 'react';
import { AlertContext } from "../context/alert/alertContext";
import { FirebaseContext } from "../context/firebase/firebaseContext";

export const Form = () => {
  const [value, setValue] = useState('');
  const alert = useContext(AlertContext);
  const firebase = useContext(FirebaseContext);

  const submitHandler = (e) => {
    e.preventDefault();

    if(value.trim()) {
      firebase.addNote(value.trim()).then(() => {
        alert.show('Note created', 'success');
      }).catch(() => {
        alert.show('DB not available', 'error');
      });
      setValue('');
    } else {
      alert.show('Specify note text')
    }
  };

  return (<form onSubmit={submitHandler}>
    <div className="form-group">
      <input
        type="text"
        className="form-control"
        placeholder="Input new note"
        value={value}
        onChange={e => setValue(e.target.value)}
      />
    </div>
  </form>);
};