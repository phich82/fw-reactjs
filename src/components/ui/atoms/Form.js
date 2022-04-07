import React from 'react';
import PropTypes from 'prop-types';

const Form = ({ children, ...rest }) => {
  if (!Array.isArray(children)) {
    children = [children];
  }
  return <form {...rest}>{children.map(c => c)}</form>;
};

Form.propTypes = {};

Form.defaultProps = {};

export default Form;
