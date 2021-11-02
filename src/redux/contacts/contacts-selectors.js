import { createSelector } from '@reduxjs/toolkit';

const getAllContacts = state => state.contacts.contacts;

const getFilter = state => state.contacts.filter;

const getLoading = state => state.contacts.loading;

const getVisibleContacts = createSelector(
  [getAllContacts, getFilter],
  (contacts, filter) => {
    const normalizedFilter = filter.toLowerCase();

    return contacts.filter(({ name }) =>
      name.toLowerCase().includes(normalizedFilter),
    );
  },
);

export default {
  getAllContacts,
  getFilter,
  getLoading,
  getVisibleContacts,
};
