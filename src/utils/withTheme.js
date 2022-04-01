import React from 'react';
import { useThemeContext } from '@hooks';

const withTheme = (Component)  => {
  return function ComponentWithTheme(props) {
    const theme = useThemeContext();
    return (
      <Component
        {...props}
        theme={{
          ...(theme.theme),
          toggleTheme: theme.toggleTheme
        }}
      />
    );
  };
};

export default withTheme;
