import { useState, useMemo } from 'react';
import ContactList from './ContactList';
import ContactForm from './ContactForm';
import Filter from './Filter';
import useLocalStorage from '../hooks/useLocalStorage';

export const App = () => {
  const [filter, setFilter] = useState('');
  const [contacts, setContacts] = useLocalStorage('contacts', []);

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

  const filteredContacts = useMemo(() => {
    const normalizedFilter = filter.toLowerCase();
    return contacts.filter(contact =>
      contact.name.toLowerCase().includes(normalizedFilter)
    );
  }, [contacts, filter]);

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
            contacts={filteredContacts}
            onDeleteContact={deleteContact}
          />
        </div>
      </div>
    </>
  );
};
