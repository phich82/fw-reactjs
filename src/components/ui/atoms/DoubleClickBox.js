import { usePreventDoubleClick } from '@hooks';

const DoubleClickBox = ({ text, onClick, onDoubleClick, containerStyle, ...rest }) => {
  const [handleClick, handleDoubleClick] = usePreventDoubleClick(onClick, onDoubleClick);
  return (
    <div style={containerStyle} onClick={handleClick} onDoubleClick={handleDoubleClick}>
      <button {...rest}>{text}</button>
    </div>
  );
};

DoubleClickBox.defaultProps = {
  text: '',
  onClick: () => {},
  onDoubleClick: () => {},
  containerStyle: {},
};

export default DoubleClickBox;
