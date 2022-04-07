import PropTypes from 'prop-types';
import Button from '../atoms/Button';
import Checkbox from '../atoms/Checkbox';
import Color from '../atoms/Color';
import Dropdown from '../atoms/Dropdown';
import Font from '../atoms/Font';
import Input from '../atoms/Input';
import Label from '../atoms/Label';
import Link from '../atoms/Link';
import OutlineButton from '../atoms/OutlineButton';
import Radio from '../atoms/Radio';
import Select from '../atoms/Select';
import Slider from '../atoms/Slider';
import Switch from '../atoms/Switch';
import Textarea from '../atoms/Textarea';
import XButton from '../atoms/XButton';

const Password = ({ label, placeholder, propsLabel, propsButton }) => {
  let data = [
    {id: 1, name: 'Name 1', age: 20},
    {id: 2, name: 'Name 2', age: 21},
    {id: 3, name: 'Name 3', age: 23},
    {id: 4, name: 'Name 4', age: 30},
  ];
  // let data = [
  //   {
  //     "label": 'Label 1',
  //     "data": [
  //       {id: 1, name: 'Name 1', age: 20},
  //       {id: 2, name: 'Name 2', age: 21},
  //       {id: 3, name: 'Name 3', age: 23},
  //       {id: 4, name: 'Name 4', age: 30}
  //     ]
  //   },
  //   {
  //     "label": 'Label 2',
  //     "data": [
  //       {id: 5, name: 'Name 5', age: 20},
  //       {id: 6, name: 'Name 6', age: 21},
  //       {id: 7, name: 'Name 7', age: 23},
  //       {id: 8, name: 'Name 8', age: 30}
  //     ]
  //   },
  //   {
  //     "label": 'Label 3',
  //     "data": [
  //       {id: 11, name: 'Name 11', age: 20},
  //       {id: 12, name: 'Name 12', age: 21},
  //       {id: 13, name: 'Name 13', age: 23},
  //       {id: 14, name: 'Name 14', age: 30}
  //     ]
  //   },
  // ];

  return (
    <div>
      <Label text={label} {...propsLabel} />
      <Button type="password" is="light" placeholder={placeholder} {...propsButton} />
      {/* <OutlineButton>Outline Button 1</OutlineButton>
      <OutlineButton is="primary">Outline Button 2</OutlineButton>
      <Input type="password" value="Password Input" is="light" />
      <Button is="primary">Submit</Button>
      <Button is="link">Link</Button> */}
      {/* <Checkbox />
      <Checkbox />
      <Radio name="radios" />
      <Radio name="radios" checked/> */}
      <Switch type="round" isOn={false} onToggle={isOn => {
        console.log('isOn => ', isOn)
      }} />
      <Slider type="image" value={0} onChange={value => console.log(value)} />
      <Textarea value="Hello textarea" />
      <Font size="25px" color="red" bold={true} underline={true} italic={true}>Test Font</Font>
      <Color type="success">Text Color</Color>
      <Select data={data} hasOptionGroup={false} valueKey="id" textKey="name" className="form-select" />
      <Link url="https://google.com" isBlank={true}>Test Link</Link>
      <Dropdown data={data} label="User List" labelStyle={{backgroundColor: 'red'}} onClick={(item, index) => {
        console.log({index, item})
      }} />
      <XButton />
    </div>
  );
};

Password.propTypes = {
  label: PropTypes.string,
  placeholder: PropTypes.string,
  propsLabel: PropTypes.object,
  propsButton: PropTypes.object,
};

Password.defaultProps = {
  label: 'Password',
  placeholder: '**********',
  propsLabel: {},
  propsButton: {},
};

export default Password;
