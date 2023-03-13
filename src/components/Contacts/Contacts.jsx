import React from "react";
import PropTypes from "prop-types";

import shortid from "shortid";

import style from './contacts.module.scss'

function Contacts({contacts,filter,deleteContact}) {
    return (
        <ul className={style.list}>
            {contacts.map(({ name, number, id }) => {
                if(!name.toLowerCase().includes(filter)) {
                    return null
                }
                return ( 
                    <li key={shortid()} id={id} className={style.item}>
                        <span className={style.name}>{name}</span>
                        <span className={style.number}>{number}</span>
                        <button className={style.btn} type="button" onClick={deleteContact} id={id}>X</button>
                    </li>
                )
            })}
        </ul>
    )
}

Contacts.propTypes = {
    contacts: PropTypes.arrayOf(PropTypes.shape({
        name: PropTypes.string.isRequired,
        number: PropTypes.string.isRequired,
        id: PropTypes.string.isRequired
    })).isRequired,
    filter: PropTypes.string.isRequired,
    deleteContact: PropTypes.func.isRequired
}

export default Contacts