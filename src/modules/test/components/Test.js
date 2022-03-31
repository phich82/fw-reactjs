import React from 'react';

import '../styles/Test.css';

const Test = ({ lang, actChangeLanguage }) => {
  return (
    <div>
      <h1 className="test">Test</h1>
      <p>Current language: {lang}</p>
    </div>
  );
}

export default Test;
