import PropTypes from 'prop-types';
import Button from '../atoms/Button';
import Label from '../atoms/Label';

const Username = ({ label, placeholder, propsLabel, propsButton }) => {
  console.log('Username => ', { label, placeholder });
  return (
    <div>
      <Label text={label} {...propsLabel} />
      <Button type="text" is="light" placeholder={placeholder} {...propsButton} />
    </div>
  );
};
Username.propTypes = {
  label: PropTypes.string,
  placeholder: PropTypes.string,
  propsLabel: PropTypes.object,
  propsButton: PropTypes.object,
};

Username.defaultProps = {
  label: 'User Name',
  placeholder: 'Enter your name...',
  propsLabel: {},
  propsButton: {},
}

export default Username;
