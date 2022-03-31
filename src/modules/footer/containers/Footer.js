import { connect } from 'react-redux';
import Footer from '../components/Footer';
import { actChangeLanguage } from '../../../redux';

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

export default connect(mapStateToProps, mapDispatchToProps)(Footer);
