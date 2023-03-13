import React from 'react';
import PropTypes from 'prop-types';

import shortid from 'shortid';

import style from './contacts.module.scss';

function Contacts({ contacts, filterUsers, deleteContact }) {
  console.log(contacts);
  return (
    <ul className={style.list}>
      {contacts.map(({ userName, userNumber, id }) => {
        if (!userName.toLowerCase().includes(filterUsers)) {
          return null;
        }
        return (
          <li key={shortid()} id={id} className={style.item}>
            <span className={style.name}>{userName}</span>
            <span className={style.number}>{userNumber}</span>
            <button
              className={style.btn}
              type="button"
              onClick={deleteContact}
              id={id}
            >
              X
            </button>
          </li>
        );
      })}
    </ul>
  );
}

Contacts.propTypes = {
  contacts: PropTypes.arrayOf(
    PropTypes.shape({
      userName: PropTypes.string.isRequired,
      userNumber: PropTypes.string.isRequired,
      id: PropTypes.string.isRequired,
    })
  ).isRequired,
  filterUsers: PropTypes.string.isRequired,
  deleteContact: PropTypes.func.isRequired,
};

export default Contacts;
