import React from 'react';
import { useState, useEffect } from 'react';

import shortid from 'shortid';

import Filter from 'components/Filter';
import FormPhonebook from 'components/FormPhonebook';
import Contacts from 'components/Contacts';

import style from './phonebook.module.scss';

const KEY = 'PHONEBOOK';

const contactDefault = [
  { id: 'id-1', userName: 'Rosie Simpson', userNumber: '459-12-56' },
  { id: 'id-2', userName: 'Hermione Kline', userNumber: '443-89-12' },
  { id: 'id-3', userName: 'Eden Clements', userNumber: '645-17-79' },
  { id: 'id-4', userName: 'Annie Copeland', userNumber: '227-91-26' },
];

function Phonebook() {
  const [contacts, setContacts] = useState(() => {
    return JSON.parse(window.localStorage.getItem(KEY)) || contactDefault;
  });
  const [name, setName] = useState('');
  const [number, setNumber] = useState('');
  const [filter, setFilter] = useState('');

  const handleInputChange = event => {
    const { name, value } = event.target;

    switch (name) {
      case 'name':
        setName(value);
        break;
      case 'number':
        setNumber(value);
        break;
      default:
        return;
    }
  };

  useEffect(() => {
    window.localStorage.setItem(KEY, JSON.stringify(contacts));
  }, [contacts]);

  const formOnSubmitBtn = event => {
    event.preventDefault();

    if (contacts.find(elem => elem.userName === name)) {
      alert(`${name} is already in contacts`);
      resetFormInput();
      return;
    }

    setContacts([
      ...contacts,
      { userName: name.trim(), userNumber: number.trim(), id: shortid() },
    ]);
    resetFormInput();
  };

  const inputFilterContacts = event => {
    const input = event.currentTarget.value.toLowerCase().trim();
    setFilter(input);
    return input;
  };

  const deleteContactUser = event => {
    console.log(event.currentTarget.id);
    let result = contacts.filter(
      contact => contact.id !== event.currentTarget.id
    );
    setContacts(result);
  };

  const resetFormInput = () => {
    setName('');
    setNumber('');
  };
  return (
    <div className={style.wrapper}>
      <h2 className={style.title}>Phonebook</h2>
      <FormPhonebook
        submit={formOnSubmitBtn}
        name={name}
        number={number}
        change={handleInputChange}
      />
      <div>
        <h2 className={style.title}>Contacts</h2>
        <Filter filter={inputFilterContacts} />
        <Contacts
          contacts={contacts}
          filterUsers={filter}
          deleteContact={deleteContactUser}
        />
      </div>
    </div>
  );
}

export default Phonebook;
