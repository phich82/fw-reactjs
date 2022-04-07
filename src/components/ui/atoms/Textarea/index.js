import PropTypes from 'prop-types';

const Textarea = ({ value, rows, cols, maxLength, isDisabled, onChange, ...rest }) => {
  const handleChange = (e) => {
    onChange && onChange(e.target.value);
  };
  return (
    <textarea
      {...rest }
      value={value}
      maxLength={maxLength}
      rows={rows}
      cols={cols}
      disabled={isDisabled}
      onChange={handleChange}
    ></textarea>
  );
};

Textarea.propTypes = {
  value: PropTypes.string,
  rows: PropTypes.number,
  cols: PropTypes.number,
  maxLength: PropTypes.number,
  isDisabled: PropTypes.bool,
};

Textarea.defaultProps = {
  value: '',
  rows: 5,
  cols: 50,
  maxLength: undefined,
  isDisabled: false,
};

export default Textarea;
