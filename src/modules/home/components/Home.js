import React from 'react';
import { withRouter } from './../../../utils';

import '../styles/Home.css';
import { i18n, trans, changeLocale } from '../../../locales';
import { Validator } from '../../../services';

const Home = ({ lang, actChangeLanguage, navigation }) => {
  console.log('navigation => ', navigation);

  // let errorValidation1 = Validator.validate({
  //   current_password: 'dfgdffdgfdg',
  //   new_password: 'xxxxxxxx',
  //   confirm_password: 'xxxxxxxx'
  // }, {
  //   current_password: 'required|min:6',
  //   new_password: 'required|min:6',
  //   confirm_password: 'required|min:6|force_equal:new_password',
  // });
  // let errorValidation2 = Validator.validate({
  //   addresses: true
  // }, {
  //   addresses: 'array',
  // }, {
  //   'addresses': {
  //     // array: 'It is an array.'
  //   }
  // });
  // let errorValidation2 = Validator.validate({
  //   addresses: '2022-12-11'
  // }, {
  //   // addresses: 'even',
  //   // addresses: 'in:{"a":1,"b":2}',
  //   addresses: 'datetime_after:2022-12-13',
  // }, {
  //   // 'addresses': {
  //   //   numeric: 'asdadasdadasdas'
  //   // }
  // });
  // let errorValidation3 = Validator.validate({
  //   addresses: {
  //     //shipping: {street: "Foobar"}
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
  // console.log('errorValidation => ', errorValidation2);
  // Validator.Fn({foo: "some value"}, {foo: {custom: "some options"}});
  // Validator.Fn({foo: "some value"}, {foo: {custom: "some options"}});
  // let errorValidation4 = Validator.Fn({myAttribute: {a:"other"}}, {myAttribute: {
  //   // type: "string",
  //   type: {
  //     // type: function(value) {
  //     //   return Array.isArray(value);
  //     // },
  //     type: 'array',
  //     message: '^xxxxxxxxxxxxxxxxxxxxxxxxxxxxx'
  //   }
  // }});
  // let errorValidation2 = Validator.Fn({
  //   // addresses: '2022-12-11',
  //   addresses: '2022-12-11'
  // }, {
  //   addresses: {
  //     custom: {
  //       // message: 'xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx'
  //     },
  //   },
  // }, {
  //   // 'addresses': {
  //   //   numeric: 'asdadasdadasdas'
  //   // }
  // });
  // let errorValidation2 = Validator.Fn.async({
  //   // addresses: '2022-12-11',
  //   addresses: 1.5
  // }, {
  //   addresses: {
  //     customAsync: {
  //       // message: 'xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx'
  //     },
  //   },
  // }).then(
  //   result => {
  //     console.log('errorValidation => ', result)
  //   },
  //   error => console.log('errorValidation[error] => ', error)
  // );
  let errorValidation2 = Validator.validateAsync({
    address: '4',
    age: 1
  }, {
    'address': 'custom_async',
    'age': 'custom_async',
  }, {
    address: {
      custom_async: 'Address shipping can\'t be blank'
    },
    address: {
      age: 'Age shipping can\'t be blank'
    },
  });
  errorValidation2.then(
    success => console.log('errorValidation2 => ', success),
    error => console.log('errorValidation2 [error] => ', error)
  );
  // console.log('errorValidation => ', errorValidation2);
  // changeLocale('jp');
  console.log('trans => ', trans('test'), trans('demo', { num: 2 }))
  return (
    <div>
      <h1 className="test">Home</h1>
      <button onClick={() => navigation.navigate('test')}>Go Test</button>
    </div>
  );
};

export default withRouter(Home);
