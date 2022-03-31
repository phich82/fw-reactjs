import React from 'react';
import { useThemeContext } from '../../hooks';

const ThemeButton = (props) => {
  const theme = useThemeContext();
  console.log('theme => ', theme)

  return (
    <button
      style={{backgroundColor: props.theme.background}}
      onClick={theme.toggleTheme}
    >Theme</button>
  );
};

export default ThemeButton;
