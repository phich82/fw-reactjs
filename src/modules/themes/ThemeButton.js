import React from 'react';
import { withTheme } from '@utils';

const ThemeButton = ({ theme }) => {
  console.log('theme => ', theme)

  return (
    <button onClick={theme.toggleTheme} style={{backgroundColor: theme.background}}>
      Theme
    </button>
  );
};

export default withTheme(ThemeButton);
