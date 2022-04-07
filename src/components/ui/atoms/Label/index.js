import PropTypes from 'prop-types';

const Label = ({ text, ...rest }) => {
  return (
    <label {...rest}>{text}</label>
  );
};

Label.propTypes = {
  text: PropTypes.string,
};

Label.defaultProps = {
  text: '',
};

export default Label;
