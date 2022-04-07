import PropTypes from 'prop-types';

/**
 * @data
 * [
 *  {
 *    label: <string>,
 *    data: <array<object>>
 *  },
 *  {
 *    label: <string>,
 *    data: <array<object>>
 *  },
 * ]
 * or
 * [
 *  {[key1]: [value1]},
 *  {[key2]: [value2]},
 *  {[key3]: [value3]},
 *  ..................
 * ]
 */
const Select = ({
    data,
    hasOptionGroup,
    optionGroupLabelKey,
    optionGroupDataKey,
    valueKey,
    textKey,
    onChange,
    ...rest
}) => {
  const handleChange = e => {
    console.log('select => ', e.target.value)
    onChange && onChange(e);
  };
  const renderOptions = () => {
    return data.map((row, idx) => {
      if (hasOptionGroup) {
        return (
          <optgroup label={row[optionGroupLabelKey]} key={`${row[optionGroupLabelKey]}-${idx}`}>
            {row[optionGroupDataKey].map((option) => (
              <option value={option[valueKey]} key={`${option[valueKey]}`}>
                {option[textKey]}
              </option>
            ))}
          </optgroup>
        );
      }
      return (
        <option value={row[valueKey]} key={row[valueKey]}>
          {row[textKey]}
        </option>
      );
    })
  };
  return (
    <select {...rest} onChange={handleChange}>
      {renderOptions()}
    </select>
  );
};

Select.propTypes = {
  data: PropTypes.array,
  hasOptionGroup: PropTypes.bool,
  valueKey: PropTypes.string,
  textKey: PropTypes.string,
  optionGroupLabelKey: PropTypes.string,
  optionGroupDataKey: PropTypes.string,
};

Select.defaultProps = {
  data: [],
  hasOptionGroup: false,
  optionGroupLabelKey: 'label',
  optionGroupDataKey: 'data',
  valueKey: 'id',
  textKey: 'name',
};

export default Select;
