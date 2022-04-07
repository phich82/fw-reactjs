import PropTypes from 'prop-types';

const Image = ({ src, type, rounded, align, ...rest }) => {
  const THUMBNAIL_SIZE = '100px';
  const BORDER_RADIUS = '10px';

  const getStyle = () => {
    let style = {};
    if (rest.style) {
      style = rest.style;
    }
    if (type == 'thumbnail') {
      style.width = rest.hasOwnProperty('size') ? rest.size : THUMBNAIL_SIZE;
      style.height = style.width;
    }
    if (rounded) {
      style.boderRadius = BORDER_RADIUS;
    }
    return style;
  };
  return (
    <img {...rest} src={src} style={getStyle()} />
  );
};

Image.propTypes = {
  src: PropTypes.string,
  rounded: PropTypes.bool,
  type: PropTypes.oneOf(['thumbnail']),
  align: PropTypes.oneOf([
    'left',
    'right',
    'center',
    'top',
    'bottom',
    'top,left',
    'left,top',
    'top,right',
    'right,top',
    'bottom,left',
    'left,bottom',
    'bottom,right',
    'right,bottom',
    'center,left',
    'left,center',
    'center,right',
    'right,center',
    'center,top',
    'top,center',
    'center,bottom',
    'bottom,center',
  ]),
};

Image.defaultProps = {
  src: undefined,
  type: undefined,
  rounded: false,
  align: 'left',
};

export default Image;
