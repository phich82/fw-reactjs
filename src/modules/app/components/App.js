import React, { useState } from 'react';
import { ThemeContextProvider, themes } from '../../../themes';
import { ThemeButton } from '../../../components';
import { Footer, Header } from '../../../modules';

import '../styles/App.css';
import { WithPreventDoubleClickDemo, WithPreventDoubleClickExample } from '../../../utils';
import { Link, NavLink, Outlet } from 'react-router-dom';

const App = ({ lang, isLoggedIn, theme, actChangeTheme }) => {
  const toggleTheme = () => {
    actChangeTheme(theme === 'dark' ? 'light' : 'dark');
  }

  console.log('[App][Theme] => ', theme);

  return (
    // value attribute: data that is made available to the children components
    // meangings, all their children components have to access to 'theme' prop and use 'toggleTheme' function
    <ThemeContextProvider value={{ theme: themes[theme], toggleTheme }}>
      <div className="App">
        <Header />
        <nav>
          <Link to='/'>Home</Link>
          {' | '}
          <Link to='/test'>Test</Link>
          {' | '}
          <Link to='/demo'>Demo</Link>
        </nav>

        <NavLink to='/test' style={({ isActive }) =>({color: isActive ? 'red' : ''})}>Nav Link</NavLink>
        <NavLink to='/home?brand=envy' style={({ isActive }) =>({color: isActive ? 'red' : ''})}>Nav Link</NavLink>

        <ThemeButton theme={themes[theme]} />
        <WithPreventDoubleClickExample
          text={'Click Me'}
          onClick={() => console.log('Clicked:Example')}
        />
        <WithPreventDoubleClickDemo
          text={'Click or doubleclick me'}
          onClick={() => console.log('Clicked:Demo')}
          onDoubleClick={() => console.log('Clicked double')}
          style={{ backgroundColor: 'red' }}
        />

        <Outlet />

        <Footer />
      </div>
    </ThemeContextProvider>
  );
};

export default App;
