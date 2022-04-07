const ClickableBox = ({ text, onClick, ...rest }) => (
  <div {...rest} onClick={onClick}>
    {text}
  </div>
);

ClickableBox.defaultProps = {
  onClick: () => {},
  onDoubleClick: () => {},
};

export default ClickableBox;
