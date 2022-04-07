import PropTypes from 'prop-types';

const Link = ({ text, url, isBlank, children, ...rest }) => {
  return (
    <a target={isBlank === true ? '_blank' : '_self'} {...rest} href={url}>
      {children || text}
    </a>
  );
};

Link.propTypes = {
  text: PropTypes.string,
  url: PropTypes.string,
  isBlank: PropTypes.bool,
};

Link.defaultProps = {
  text: '',
  url: '#',
  isBlank: false,
};

export default Link;
