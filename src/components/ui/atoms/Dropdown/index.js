import PropTypes from 'prop-types';

import './style.css';

const Dropdown = ({ data, label, labelStyle, containerStyle, contentStyle, useLink, valueKey, textKey, onClick, ...rest }) => {
  const handleClick = (e, row, idx) => {
    e.preventDefault();
    onClick && onClick(row, idx);
  }

  const renderContent = () => {
    return data.map((row, idx) => {
      if (useLink) {
        return (
          <a className="row" href={row[valueKey]} key={row[valueKey]} onClick={e => handleClick(e, row, idx)}>
            row[textKey]
          </a>
        );
      }
      return (
        <div className="row" key={row[valueKey]} onClick={e => handleClick(e, row, idx)}>
          {row[textKey]}
        </div>
      )
    });
  };

  return (
    <div className="dropdown" style={containerStyle}>
      <button className="btn-dropdown" style={labelStyle}>{label}</button>
      <div className="dropdown-content" style={contentStyle}>
        {renderContent()}
      </div>
    </div>
  );
};

Dropdown.propTypes = {
  data: PropTypes.array,
  label: PropTypes.string,
  useLink: PropTypes.bool,
  valueKey: PropTypes.string,
  textKey: PropTypes.string,
  containerStyle: PropTypes.object,
  contentStyle: PropTypes.object,
  labelStyle: PropTypes.object,
  onClick: PropTypes.func,
};

Dropdown.defaultProps = {
  data: [],
  label: 'Label here',
  useLink: false,
  valueKey: 'id',
  textKey: 'name',
  containerStyle: {},
  contentStyle: {},
  labelStyle: {},
  onClick: () => {},
};

export default Dropdown;
