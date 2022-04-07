import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';

const Switch = ({ type, isOn, isDisabled, onToggle, propsContainer, ...rest }) => {
  const [isOnSwitch, setIsOnSwitch] = useState(isOn || false);
  const getClassName = () => {
    let className = `btn-switch`;
    if (rest.className) {
      className += ` ${rest.className}`;
    }
    return className;
  };

  const getType = () => {
    if (type == 'rectangle') {
      return 'slider';
    }
    return 'slider round';
  };

  const onChange = (e) => {
    onToggle && onToggle(!isOnSwitch, e)
    setIsOnSwitch(!isOnSwitch);
  };

  return (
    <label {...propsContainer} className={getClassName()}>
      <input {...rest} type="checkbox" checked={isOnSwitch} disabled={isDisabled} onChange={onChange} />
      <span className={getType()}></span>
    </label>
  );
};

Switch.propTypes = {
  type: PropTypes.oneOf(['round', 'rectangle']),
  isOn: PropTypes.bool,
  isDisabled: PropTypes.bool,
  propsContainer: PropTypes.object,
};

Switch.defaultProps = {
  type: 'round',
  isOn: false,
  isDisabled: false,
  propsContainer: {},
};

export default Switch;
