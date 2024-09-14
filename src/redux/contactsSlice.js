import { createSlice } from '@reduxjs/toolkit';

const contactsSlice = createSlice({
  name: 'contacts',
  initialState: [],
  reducers: {
    addContact: (state, action) => {
      state.push(action.payload);
    },
    removeContact: (state, action) => {
      return state.filter(contact => contact.id !== action.payload);
    },
    updateContact: (state, action) => {
      const { id, name, phone } = action.payload;
      const existingContact = state.find(contact => contact.id === id);
      if (existingContact) {
        existingContact.name = name;
        existingContact.phone = phone;
      }
    },
  },
});

export const { addContact, removeContact, updateContact } = contactsSlice.actions;
export default contactsSlice.reducer;
