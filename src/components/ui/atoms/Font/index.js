import PropTypes from 'prop-types';

const Font = ({ text, color, type, size, italic, underline, bold, children, ...rest }) => {
  const getStyle = () => {
    let style = {
      fontSize: String(size).replace('px', '') + 'px',
      fontStyle: italic === true ? 'italic' : 'normal',
      textDecoration: underline === true ? 'underline' : 'none',
      fontWeight: typeof bold === 'boolean' ? 'bold' : bold,
    };
    if (color) {
      style.color = color;
    }
    if (type) {
      style.fontFamily = type;
    }
    if (rest.style) {
      style = { ...style, ...rest.style };
    }
    return style;
  };
  return (
    <div {...rest} style={getStyle()}>
      {children || text }
    </div>
  );
};

Font.propTypes = {
  text: PropTypes.string,
  color: PropTypes.string,
  type: PropTypes.string,
  size: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  italic: PropTypes.bool,
  underline: PropTypes.bool,
  bold: PropTypes.oneOfType([PropTypes.bool, PropTypes.number, PropTypes.string])
};

Font.defaultProps = {
  text: '',
  color: undefined,
  type: undefined,
  size: '13px',
  italic: false,
  underline: false,
  bold: 'normal',
};

export default Font;
