import { usePreventDoubleClick } from '@hooks';

const DoubleClickableBox = ({ text, onClick, onDoubleClick, containerStyle, ...rest }) => {
  const [handleClick, handleDoubleClick] = usePreventDoubleClick(onClick, onDoubleClick);
  return (
    <div style={containerStyle} onClick={handleClick} onDoubleClick={handleDoubleClick}>
      <button {...rest}>{text}</button>
    </div>
  );
};

DoubleClickableBox.defaultProps = {
  text: '',
  onClick: () => {},
  onDoubleClick: () => {},
  containerStyle: {},
};

export default DoubleClickableBox;
