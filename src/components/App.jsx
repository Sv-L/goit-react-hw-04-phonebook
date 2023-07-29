import { useState, useEffect } from 'react';
import { nanoid } from 'nanoid';
import ContactList from './ContactList';
import ContactForm from './ContactForm';
import Filter from './Filter';
import parseStorage from './parseStorage';

export const App = () => {
  const [contacts, setContacts] = useState([]);
  const [filter, setFilter] = useState('');

  useEffect(() => {
    if (localStorage.getItem('contacts')) {
      setContacts(parseStorage('contacts'));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('contacts', JSON.stringify(contacts));
    if (contacts.length === 0) {
      localStorage.removeItem('contacts');
      setFilter('');
    }
  }, [contacts]);

  const checkName = name => {
    const normalizeDataName = name.toLowerCase();
    const nameIsWritten = contacts.some(
      contact => contact.name.toLowerCase() === normalizeDataName
    );
    return nameIsWritten;
  };

  const formSubmitHandler = data => {
    if (!checkName(data.name)) {
      const newContact = { id: `${nanoid()}`, ...data };
      setContacts(prevState => [newContact, ...prevState]);
    } else {
      alert(`${data.name} is already in contacts.`);
    }
    document.activeElement.blur();
  };

  const onChangeFilter = e => {
    const filter = e.currentTarget.value.trim();
    setFilter(filter);
  };

  const deleteContact = contactId => {
    setContacts(prevState =>
      prevState.filter(contact => contact.id !== contactId)
    );
  };

  const normalizedFilter = filter.toLowerCase();
  const visibleContacts = contacts.filter(contact =>
    contact.name.toLowerCase().includes(normalizedFilter)
  );

  return (
    <>
      <h1>Phonebook</h1>
      <div className="wrap">
        <ContactForm onSubmit={formSubmitHandler} onCheckName={checkName} />

        <div>
          <h2>Contacts</h2>
          <Filter value={filter} onChange={onChangeFilter} />
          <ContactList
            filter={filter}
            contacts={visibleContacts}
            onDeleteContact={deleteContact}
          />
        </div>
      </div>
    </>
  );
};
