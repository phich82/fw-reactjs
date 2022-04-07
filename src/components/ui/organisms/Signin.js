import { PropTypes } from 'prop-types';
import Form from '../atoms/Form';
import Password from '../molecules/Password';
import Username from '../molecules/Username';

const Signin = ({ propsUsername, propsPassword }) => {
  return (
    <div>
      <Form id="#frm-signin">
        <Username {...propsUsername} />
        <Password {...propsPassword} />
      </Form>
    </div>
  );
};

Signin.propTypes = {
  propsUsername: PropTypes.object,
  propsPassword: PropTypes.object,
}

Signin.defaultProps = {
  propsUsername: { label: 'UserName', placeholder: 'Your name' },
  propsPassword: { label: 'Your password', placeholder: 'xxxxxxxxxxxxxx' },
}

export default Signin;
