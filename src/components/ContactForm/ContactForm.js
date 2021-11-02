import styles from './ContactForm.module.scss';
import PropTypes from 'prop-types';
import { useState } from "react";
import { connect } from 'react-redux';
import { contactsOperations, contactsSelectors } from '../../redux/contacts';

const ContactForm = ({ contacts, onAdd }) => {

    const [name, setName] = useState("");
    const [number, setNumber] = useState("");

    const onAddButton = (evt) => {
        evt.preventDefault();
        if (contacts.find(contact=>(contact.name===name))) {
            alert(`${name} уже в списке!`);
            return;
        }
        onAdd(name, number);
        setName("");
        setNumber("")
    }

    return (
        <form id="contactForm" className={styles.formStyle}>
            <label htmlFor="contactName" className={styles.labelInput}>Name</label>
            <input
                id="contactName"
                className={styles.inputStyle}
                type="text"
                name="name"
                value={name}
                pattern="^[a-zA-Zа-яА-Я]+(([' -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$"
                title="Имя может состоять только из букв, апострофа, тире и пробелов. 
                    Например Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan и т. п."
                onChange={ evt => setName(evt.target.value) }
                required
            />
            <label htmlFor="contactNumber" className={styles.labelInput}>Number</label>
            <input
                id="contactNumber"
                className={styles.inputStyle}
                type="tel"
                name="number"
                value={number}
                pattern="\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}"
                title="Номер телефона должен состоять цифр и может содержать пробелы, тире, круглые скобки и может начинаться с +"
                onChange={ evt => setNumber(evt.target.value) }
                required
            />
            <button
                type="button"
                value="Submit"
                className={styles.formButton}
                onClick={onAddButton}
                >Add contact
            </button>
        </form>
    )

}

ContactForm.propTypes = {
    contacts: PropTypes.arrayOf(PropTypes.shape({
        id: PropTypes.string.isRequired,
        name: PropTypes.string.isRequired,
        number: PropTypes.string.isRequired,
    })),
    onAdd: PropTypes.func.isRequired
}

const mapStateToProps = state => ({
    contacts: contactsSelectors.getAllContacts(state),
  });
  
  const mapDispatchToProps = dispatch => ({
    onAdd: (name, number) => dispatch(contactsOperations.addContact(name, number))
  });
  
  export default connect(mapStateToProps, mapDispatchToProps)(ContactForm);
