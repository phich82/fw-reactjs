import { Signin } from '@ui';
import Label from 'components/ui/atoms/Label';

import styles from './style.module.css';

Label.test = 'testing';

console.log('Label => ', Label)

const SigninTemplate = (props) => {
  console.log('styles => ', styles);
  const propsUsername = {
    propsLabel: {
      className: 'test'
    }
  };
  const propsPassword = {
    propsLabel: {

    },
    propsButton: {
      className: 'control'
    }
  }
  return (
    <Signin propsPassword={propsPassword} propsUsername={propsUsername} />
  );
};

export default SigninTemplate;
