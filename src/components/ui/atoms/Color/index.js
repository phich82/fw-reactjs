import PropTypes from 'prop-types';

const COLORS = ['primary', 'secondary', 'success', 'danger', 'warning', 'info', 'light', 'dark'];

const Color = ({ text, color, type, children, ...rest }) => {
  const getClassName = () => {
    let className = '';
    if (COLORS.indexOf(type) !== -1) {
      className = type;
    }
    return className;
  };

  const getStyle = () => {
    let style = {};
    if (color) {
      style.color = color;
    }
    if (rest.style) {
      style = { ...style, ...rest.style };
    }
    return style;
  };

  return (
    <div {...rest} className={getClassName()} style={getStyle()}>
      {children || text }
    </div>
  );
};

Color.propTypes = {
  text: PropTypes.string,
  color: PropTypes.string,
  type: PropTypes.oneOf(COLORS),
  children: PropTypes.any,
};

Color.defaultProps = {
  text: '',
  color: undefined,
  type: undefined,
  children: undefined,
};

export default Color;
