import React from 'react';
import { useState } from 'react';

import shortid from 'shortid';

import Filter from 'components/Filter';
import FormPhonebook from 'components/FormPhonebook';
import Contacts from 'components/Contacts';

import style from './phonebook.module.scss';

const KEY = 'PHONEBOOK';

function Phonebook() {
  const [contacts, setContacts] = useState([]);
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
