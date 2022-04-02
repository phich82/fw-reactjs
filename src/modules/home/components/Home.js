import React from 'react';
import { withRouter } from '@utils';

import '../styles/Home.css';
import { i18n, trans, changeLocale } from '@locales';
import { Pipe, Validator } from '@services';

const Home = ({ lang, actChangeLanguage, navigation }) => {
  console.log('navigation => ', navigation);

  // let errorValidation = Validator.validate({
  //   addresses: {
  //     shipping: {street: "12 pham van dong"}
  //   }
  // }, {
  //   'addresses.shipping': 'required',
  //   'addresses.shipping.street': 'format:^[0-9]+.+$',
  // }, {
  //   'addresses.shipping': {
  //     required: 'Addresses shipping can\'t be blank'
  //   },
  //   'addresses.shipping.street': {
  //     format: 'The street for the shipping address must be a valid street name'
  //   }
  // });
  // console.log('errorValidation => ', errorValidation);

  // let errorValidation2 = Validator.validateAsync({
  //   address: '4aa',
  //   age: 1
  // }, {
  //   'address': 'custom_async',
  //   'age': 'custom_async',
  // }, {
  //   address: {
  //     custom_async: 'Address shipping can\'t be blank'
  //   },
  //   address: {
  //     age: 'Age shipping can\'t be blank'
  //   },
  // });
  // errorValidation2.then(
  //   success => console.log('errorValidation2 [async] => ', success),
  //   error => console.log('errorValidation2 [async][error] => ', error)
  // );

  // console.log('pipe => ', Pipe('sdfdfvbcv').uppercase().substr(1, 4).repeat(3).done())

  // changeLocale('jp');
  // console.log('trans => ', trans('test'), trans('demo', { num: 2 }));

  return (
    <div>
      <h1 className="test">Home</h1>
    </div>
  );
};

export default withRouter(Home);
