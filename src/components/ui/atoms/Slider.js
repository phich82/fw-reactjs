import { useState } from 'react';
import PropTypes from 'prop-types';

const SLIDER_TYPES = ['square', 'circle', 'image'];

const Slider = ({ min, max, value, type, isDisabled, onChange, propsContainer, ...rest }) => {
  const [valueSlider, setValueSlider] = useState(value);

  const getClassName = () => {
    let className = '';
    if (SLIDER_TYPES.indexOf(type) !== -1) {
      className += `slider ${type}`;
    }
    return className;
  };

  const handleChange = e => {
    onChange && onChange(e.target.value);
    setValueSlider(e.target.value);
  };

  return (
    <div {...propsContainer} className="slider-container">
      <input
        {...rest}
        type="range"
        min={min}
        max={max}
        value={valueSlider}
        className={getClassName()}
        onChange={handleChange}
        disabled={isDisabled}
      />
    </div>
  );
};

Slider.propTypes = {
  mix: PropTypes.number,
  max: PropTypes.number,
  value: PropTypes.number,
  type: PropTypes.oneOf(SLIDER_TYPES),
  isDisabled: PropTypes.bool,
  propsContainer: PropTypes.object,
};

Slider.defaultProps = {
  min: 0,
  max: 100,
  value: undefined,
  type: undefined,
  isDisabled: false,
  propsContainer: {},
};

export default Slider;
