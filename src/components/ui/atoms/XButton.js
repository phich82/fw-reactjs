import PropTypes from 'prop-types';

const XButton = ({ text, children, ...rest }) => {
  return (
    <button {...rest} type="button" className="btn-close">{children || text}</button>
  );
};

XButton.propTypes = {
  text: PropTypes.string,
};

XButton.defaultProps = {
  text: '',
};

export default XButton;
