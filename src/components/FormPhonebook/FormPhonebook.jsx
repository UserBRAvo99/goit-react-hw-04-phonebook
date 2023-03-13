import React from 'react';
import PropTypes from 'prop-types';

import style from './formPhonebook.module.scss';

function FormPhonebook({ submit, name, number, change }) {
  return (
    <div className={style.box}>
      <form action="#" onSubmit={submit} className={style.form}>
        <label className={style.label}>
          <p className={style.title}>Name</p>
          <input
            className={style.input}
            type="text"
            name="name"
            pattern="^[a-zA-Zа-яА-Я]+(([' -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$"
            title="Name may contain only letters, apostrophe, dash and spaces. For example Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan"
            required
            value={name}
            onChange={change}
            placeholder="Your name"
          />
        </label>
        <label className={style.label}>
          <p className={style.title}>Number</p>
          <input
            className={style.input}
            type="tel"
            name="number"
            pattern="\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}"
            title="Phone number must be digits and can contain spaces, dashes, parentheses and can start with +"
            required
            value={number}
            onChange={change}
            placeholder="Your number"
          />
        </label>
        <button className={style.btn}>Add contact</button>
      </form>
    </div>
  );
}

FormPhonebook.propTypes = {
  submit: PropTypes.func.isRequired,
  name: PropTypes.string.isRequired,
  number: PropTypes.string.isRequired,
  change: PropTypes.func.isRequired,
};

export default FormPhonebook;
