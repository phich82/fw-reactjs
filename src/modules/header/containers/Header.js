import { connect } from 'react-redux';
import Header from '../components/Header';
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

export default connect(mapStateToProps, mapDispatchToProps)(Header);
