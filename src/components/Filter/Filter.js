import styles from './Filter.module.scss';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { contactsSelectors, changeFilter } from '../../redux/contacts';

const Filter = ({ currentValue, onFilterChange }) => {
    return (
        <div className={styles.filterContainer}>
            <label htmlFor="contactName" className={styles.labelInput}>Find contacts by name</label>
            <input
                id="filter"
                className={styles.filterStyle}
                type="text"
                name="filter"
                value={currentValue}
                pattern="^[a-zA-Zа-яА-Я]+(([' -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$"
                title="Имя может состоять только из букв, апострофа, тире и пробелов. 
                    Например Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan и т. п."
                onChange={onFilterChange}
            />
        </div>
    );
}

Filter.defaultProps = {
    currentValue: ''
}

Filter.propTypes = {
    currentValue: PropTypes.string,
    onFilterChange: PropTypes.func.isRequired
}

const mapStateToProps = state => ({
    currentValue: contactsSelectors.getFilter(state),
  });
  
  const mapDispatchToProps = dispatch => ({
    onFilterChange: (e) => dispatch(changeFilter(e.target.value)),
  });
  
  export default  connect(mapStateToProps, mapDispatchToProps)(Filter);