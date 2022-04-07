import PropTypes from 'prop-types';

const OutlineButton = ({ text, is, isDisabled, size, children, ...rest }) => {
  const getClassName = () => {
    let className = ` btn-outline-${is}`;
    if (rest.className) {
      className += ` ${rest.className}`;
    }
    if (['small', 'large'].indexOf(size) !== -1) {
      className += ` btn-${size}`;
    }
    return `btn${className}`;
  };
  return (
    <button {...rest} className={getClassName()} disabled={isDisabled}>
      {children || text}
    </button>
  );
};

OutlineButton.propTypes = {
  text: PropTypes.string,
  is: PropTypes.oneOf([
    'primary',
    'secondary',
    'success',
    'danger',
    'warning',
    'info',
    'light',
    'dark'
  ]),
  size: PropTypes.oneOf(['small', 'medium', 'large']),
  isDisabled: PropTypes.bool,
};

OutlineButton.defaultProps = {
  text: '',
  is: 'dark',
  size: 'medium',
  isDisabled: false,
};

export default OutlineButton;
