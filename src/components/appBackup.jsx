import React from 'react';

import shortid from 'shortid';

import Filter from 'components/Filter';
import FormPhonebook from 'components/FormPhonebook';
import Contacts from 'components/Contacts';

import style from './phonebook.module.scss';

const KEY = 'PHONEBOOK';

class Phonebook extends React.Component {
  state = {
    contacts: [
      { id: 'id-1', name: 'Rosie Simpson', number: '459-12-56' },
      { id: 'id-2', name: 'Hermione Kline', number: '443-89-12' },
      { id: 'id-3', name: 'Eden Clements', number: '645-17-79' },
      { id: 'id-4', name: 'Annie Copeland', number: '227-91-26' },
    ],
    filter: '',
    name: '',
    number: '',
  };

  componentDidMount() {
    let localPhonebook = localStorage.getItem(KEY);
    if (localPhonebook && JSON.parse(localPhonebook).length) {
      this.setState({ contacts: JSON.parse(localPhonebook) });
    }
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevState.contacts.length !== this.state.contacts.length) {
      localStorage.setItem(KEY, JSON.stringify(this.state.contacts));
    }
  }

  //   inputChange = event => {
  //     const { name, value } = event.currentTarget;
  //     this.setState({ [name]: value });
  //   };

  //   formOnSubmit = event => {
  //     event.preventDefault();

  //     if (this.state.contacts.find(elem => elem.name === this.state.name)) {
  //       alert(`${this.state.name} is already in contacts`);
  //       this.reset();
  //       return;
  //     }

  //     const { name, number } = this.state;
  //     this.setState(prevState => ({
  //       contacts: [
  //         { name: name, number: number, id: shortid() },
  //         ...prevState.contacts,
  //       ],
  //     }));
  //     this.reset();
  //   };
  //   reset = () => {
  //     this.setState({ name: '', number: '' });
  //   };

  inputSrc = event => {
    const input = event.currentTarget.value.toLowerCase().trim();

    this.setState({ filter: input });
  };
  deleteContact = event => {
    let result = this.state.contacts.filter(
      elem => elem.id !== event.currentTarget.id
    );

    this.setState({ contacts: result });
  };

  render() {
    const contactsData = this.state.contacts;
    const filterData = this.state.filter;
    return (
      <div className={style.wrapper}>
        <h2 className={style.title}>Phonebook</h2>
        <FormPhonebook
          submit={this.formOnSubmit}
          name={this.state.name}
          number={this.state.number}
          change={this.inputChange}
        />
        <div>
          <h2 className={style.title}>Contacts</h2>
          <Filter filter={this.inputSrc} />
          <Contacts
            contacts={contactsData}
            filter={filterData}
            deleteContact={this.deleteContact}
          />
        </div>
      </div>
    );
  }
}

export default Phonebook;
