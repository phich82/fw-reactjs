import { connect } from 'react-redux';
import Test from '../components/Test';
import { actChangeLanguage } from './../../../redux';

const mapStateToProps = state => {
  const { appReducers } = state;
  console.log('appReducers => ', appReducers)

  return {
    lang: appReducers.lang,
  };
};

const mapDispatchToProps = {
  actChangeLanguage,
};

export default connect(mapStateToProps, mapDispatchToProps)(Test);
