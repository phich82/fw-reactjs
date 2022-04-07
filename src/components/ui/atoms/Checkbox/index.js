import React from 'react';
import PropTypes from 'prop-types';

const Checkbox = ({ value, isDisabled, ...rest }) => {
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
      type='checkbox'
      value={value}
      disabled={isDisabled}
    />
  );
};

Checkbox.propTypes = {
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  isDisabled: PropTypes.bool,
};

Checkbox.defaultProps = {
  value: '',
  isDisabled: false,
};

export default Checkbox;
