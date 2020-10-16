import React, { createContext, useContext, useReducer } from 'react';
import initialState from './initialState';
import reducer from './reducers';

export const StateContext = createContext();

export const StateProvider = ({ children }) => (
    <StateContext.Provider value={useReducer(reducer, initialState)}>{children}</StateContext.Provider>
);

StateProvider.defaultProps = {
    children: null,
};

export const d = (dispatch, type, payload) => dispatch({ type, ...payload });

export const useStateValue = () => useContext(StateContext);
