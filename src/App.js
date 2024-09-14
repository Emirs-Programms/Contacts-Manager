import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addContact, removeContact, updateContact } from './redux/contactsSlice';
import './App.css';

function App() {
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [editId, setEditId] = useState(null);
  const contacts = useSelector(state => state.contacts);
  const dispatch = useDispatch();

  const handleAddOrUpdateContact = () => {
    if (editId) {
      dispatch(updateContact({ id: editId, name, phone }));
      setEditId(null);
    } else {
      dispatch(addContact({ id: Date.now(), name, phone }));
    }
    setName('');
    setPhone('');
  };

  const handleEditContact = (contact) => {
    setName(contact.name);
    setPhone(contact.phone);
    setEditId(contact.id);
  };

  const handleDeleteContact = (id) => {
    dispatch(removeContact(id));
  };

  return (
    <div className="App">
      <h1>Contact Manager</h1>
      <div>
        <input
          type="text"
          placeholder="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <input
          type="text"
          placeholder="Phone"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
        />
        <button onClick={handleAddOrUpdateContact}>
          {editId ? 'Update Contact' : 'Add Contact'}
        </button>
      </div>
      <div>
        <h2>Contacts List</h2>
        <ul>
          {contacts.map(contact => (
            <li key={contact.id}>
              {contact.name} - {contact.phone}
              <button onClick={() => handleEditContact(contact)}>Edit</button>
              <button onClick={() => handleDeleteContact(contact.id)}>Delete</button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default App;
