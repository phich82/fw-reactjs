import React from 'react';
import { ThemeContext } from './ThemeContext';

export const ThemeContextProvider = (props) => {
  return (
    <ThemeContext.Provider value={props.value}>
      {props.children}
    </ThemeContext.Provider>
  );
};
