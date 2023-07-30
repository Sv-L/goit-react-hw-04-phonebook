import { useState, useEffect } from 'react';
import ContactList from './ContactList';
import ContactForm from './ContactForm';
import Filter from './Filter';
import parseStorage from './parseStorage';

export const App = () => {
  const [filter, setFilter] = useState('');
  const [contacts, setContacts] = useState(
    () => parseStorage('contacts') ?? []
  );

  useEffect(() => {
    localStorage.setItem('contacts', JSON.stringify(contacts));
    if (contacts.length === 0) {
      localStorage.removeItem('contacts');
      setFilter('');
    }
  }, [contacts]);

  const addNewContact = newContact => {
    setContacts(prevState => [newContact, ...prevState]);
  };

  const deleteContact = contactId => {
    setContacts(prevState =>
      prevState.filter(contact => contact.id !== contactId)
    );
  };

  const onChangeFilter = filter => {
    setFilter(filter);
  };

  const filteredContacts = () => {
    const normalizedFilter = filter.toLowerCase();
    const visibleContacts = contacts.filter(contact =>
      contact.name.toLowerCase().includes(normalizedFilter)
    );
    return visibleContacts;
  };

  return (
    <>
      <h1>Phonebook</h1>
      <div className="wrap">
        <ContactForm onSubmit={addNewContact} contacts={contacts} />

        <div>
          <h2>Contacts</h2>
          <Filter value={filter} onChange={onChangeFilter} />
          <ContactList
            filter={filter}
            contacts={filteredContacts()}
            onDeleteContact={deleteContact}
          />
        </div>
      </div>
    </>
  );
};
