import React, { useState } from 'react';
import { Footer, Header } from '../../../modules';
import { WithPreventDoubleClick, WithPreventDoubleClickHook } from '../../../utils';
import { Link, NavLink, Outlet } from 'react-router-dom';
import { ThemeContextProvider, themes, ThemeButton } from '@modules';

import '../styles/App.css';

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

        <WithPreventDoubleClick
          text="Click Me"
          onClick={() => console.log('Clicked:Example')}
        />
        <WithPreventDoubleClickHook
          text={'Click or doubleclick me'}
          onClick={() => console.log('Clicked:Demo')}
          onDoubleClick={() => console.log('Clicked double')}
          style={{ width: '200px', textAlign: 'center' }}
          containerStyle={{padding: '5px', backgroundColor: 'red'}}
        />

        <Outlet />

        <Footer />
      </div>
    </ThemeContextProvider>
  );
};

export default App;
