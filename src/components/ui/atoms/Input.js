import { useState } from 'react';
import PropTypes from 'prop-types';

const INPUT_TYPES = ['text', 'file', 'password', 'submit'];

const Input = ({ value, is, isDisabled, type, size, onChange, ...rest }) => {
  const [inputValue, setInputValue ]= useState(value);

  const getClassName = () => {
    let className = ` btn-${is || 'light'}`;
    if (rest.className) {
      className += ` ${rest.className}`;
    }
    if (['small', 'large'].indexOf(size) !== -1) {
      className += ` btn-${size}`;
    }
    return `btn${className}`;
  };

  const handleChange = (e) => {
    setInputValue(e.target.value);
    onChange && onChange(e.target.value);
  };

  return (
    <input
      {...rest}
      className={getClassName()}
      type={type || 'text'}
      value={inputValue}
      onChange={handleChange}
      disabled={isDisabled}
    />
  );
};

Input.propTypes = {
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  type: PropTypes.oneOf(INPUT_TYPES),
  is: PropTypes.oneOf(['primary', 'sencondary', 'success', 'danger', 'warning', 'info', 'light', 'dark']),
  size: PropTypes.oneOf(['small', 'medium', 'large']),
  isDisabled: PropTypes.bool,
  onChange: PropTypes.func,
};

Input.defaultProps = {
  value: '',
  type: 'text',
  is: 'light',
  size: 'medium',
  isDisabled: false,
  onChange: () => {},
};

export default Input;
