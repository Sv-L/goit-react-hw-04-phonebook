import { useState, useMemo } from 'react';
import ContactList from './ContactList';
import ContactForm from './ContactForm';
import Filter from './Filter';
import useLocalStorageReducer from '../hooks/useLocalStorageReducer';

export const App = () => {
  const [filter, setFilter] = useState('');
  const [contacts, dispatch] = useLocalStorageReducer([], 'contacts');

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
        <ContactForm onSubmit={dispatch} contacts={contacts} />

        <div>
          <h2>Contacts</h2>
          <Filter value={filter} onChange={setFilter} />
          <ContactList
            filter={filter}
            contacts={filteredContacts}
            onDeleteContact={dispatch}
          />
        </div>
      </div>
    </>
  );
};
