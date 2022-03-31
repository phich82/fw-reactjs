import { connect } from 'react-redux';
import Home from '../components/Home';
import { actChangeLanguage } from '../../../redux';

const mapStateToProps = state => {
  const { appReducers } = state;
  return {
    lang: appReducers.lang,
  };
};

const mapDispatchToProps = {
  actChangeLanguage,
};

export default connect(mapStateToProps, mapDispatchToProps)(Home);
