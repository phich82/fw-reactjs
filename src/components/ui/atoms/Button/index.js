import PropTypes from 'prop-types';
import Input from '../Input';

const INPUT_TYPES = ['text', 'file', 'password', 'submit'];

const Button = ({ text, is, isDisabled, type, size, onChange, children, ...rest }) => {
  const getClassName = () => {
    let className = ` btn-${is || 'dark'}`;
    if (rest.className) {
      className += ` ${rest.className}`;
    }
    if (['small', 'large'].indexOf(size) !== -1) {
      className += ` btn-${size}`;
    }
    return `btn${className}`;
  };

  // Input type
  if (INPUT_TYPES.indexOf(type) !== -1) {
    return <Input type={type} value={text} onChange={onChange} is={is} isDisabled={isDisabled} {...rest} />
  }

  return <button {...rest} className={getClassName()} disabled={isDisabled}>{children || text}</button>;
};

Button.propTypes = {
  text: PropTypes.string,
  type: PropTypes.oneOf(INPUT_TYPES),
  is: PropTypes.oneOf(['primary', 'sencondary', 'success', 'danger', 'warning', 'info', 'light', 'dark', 'link']),
  size: PropTypes.oneOf(['small', 'medium', 'large']),
  isDisabled: PropTypes.bool,
  onChange: PropTypes.func,
};

Button.defaultProps = {
  text: '',
  type: null,
  is: 'dark',
  size: 'medium',
  isDisabled: false,
  onChange: null,
};

export default Button;
