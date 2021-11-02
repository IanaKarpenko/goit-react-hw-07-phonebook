import styles from './ContactList.module.scss';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import {contactsOperations, contactsSelectors} from '../../redux/contacts'

const ContactList = ({ contacts, onDelete }) => {
    return (
        <ul className={styles.listStyle}>
            {contacts.map(contact => {
                return (
                    <li key={contact.id} className={styles.item}>
                        <div className={styles.itemInternal}>
                        <span className={styles.name}>{contact.name}</span>
                            :<span className={styles.number}>{contact.number}</span>
                        </div>
                            <button type='button' name={contact.name} className={styles.deleteButton} onClick={()=>onDelete(contact.id)}>Delete</button>
                        
                    </li>
                )
            })}
        </ul>      
    );
}

ContactList.propTypes = {
    contacts: PropTypes.arrayOf(PropTypes.shape({
        id: PropTypes.string.isRequired,
        name: PropTypes.string.isRequired,
        number: PropTypes.string.isRequired
    })),
    onDelete: PropTypes.func.isRequired
}

const mapStateToProps = (state) => ({
    contacts: contactsSelectors.getVisibleContacts(state),
  });
  
  const mapDispatchToProps = dispatch => ({
    onDelete: (id) => dispatch(contactsOperations.deleteContact(id)),
  });
  
  export default connect(mapStateToProps, mapDispatchToProps)(ContactList);
