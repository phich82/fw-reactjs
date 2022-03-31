import React from 'react';
import { connect } from 'react-redux';
import App from '../components/App';
import { actChangeLanguage, actChangeTheme } from './../../../redux';

const mapStateToProps = state => {
  const { lang, user, theme } = state.appReducers;

  return {
    lang,
    user,
    theme,
    isLoggedIn: !!user && Object.keys(user).length > 0,
  };
};

const mapDispatchToProps = {
  actChangeLanguage,
  actChangeTheme,
};

export default connect(mapStateToProps, mapDispatchToProps)(App);
