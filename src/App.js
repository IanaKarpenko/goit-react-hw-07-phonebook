import './App.css';
import { connect } from 'react-redux';
import { contactsOperations, contactsSelectors } from './redux/contacts';
import  ContactForm  from './components/ContactForm';
import  ContactList  from './components/ContactList';
import  Filter from './components/Filter';
import { useEffect } from 'react';

const App = ({isLoadingContacts, fetchContacts}) => {

  useEffect(()=>{
    fetchContacts();
  }, []);

  return (
    <div className="App">
        <header className="App-header">
          <h1 className="Header">Phonebook</h1>
          <ContactForm />
          <h2 className="SubHeader">Contacts</h2>
          <Filter />
          <ContactList />
          { isLoadingContacts && <h4 className="Loading">Loading...</h4> }
        </header>
      </div>
  )
}

const mapStapeToProps = state => ({
  isLoadingContacts: contactsSelectors.getLoading(state),
});

const mapDispatchToProps = dispatch => ({
  fetchContacts: () => dispatch(contactsOperations.fetchContacts()),
});

export default connect(mapStapeToProps, mapDispatchToProps)(App);
