import React from 'react';
import PropTypes from 'prop-types';

import './style.css';

const Radio = ({ value, isDisabled, ...rest }) => {
  const getClassName = () => {
    let className = `btn-check`;
    if (rest.className) {
      className += ` ${rest.className}`;
    }
    return className;
  };
  return (
    <input
      {...rest}
      className={getClassName()}
      type='radio'
      value={value}
      disabled={isDisabled}
    />
  );
};

Radio.propTypes = {
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  isDisabled: PropTypes.bool,
};

Radio.defaultProps = {
  value: '',
  isDisabled: false,
};

export default Radio;
