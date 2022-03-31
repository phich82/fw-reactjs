import { usePreventDoubleClick } from '../hooks';
import withPreventDoubleClick from './withPreventDoubleClick';
import withRouter from './withRouter';

/*********************************************************************/
const ClickableBox = ({ text, onClick, ...rest }) => (
  <div {...rest} onClick={onClick}>
    {text}
  </div>
);

ClickableBox.defaultProps = {
  onClick: () => {},
  onDoubleClick: () => {},
};

const WithPreventDoubleClick = withPreventDoubleClick(ClickableBox);

const WithPreventDoubleClickExample = ({ text, onClick, ...rest }) => (
  <WithPreventDoubleClick {...rest} text={text} onClick={onClick} />
);
/*********************************************************************/

/*********************************************************************/
const ClickableBoxDemo = ({ text, onClick, onDoubleClick, ...rest }) => {
  const [handleClick, handleDoubleClick] = usePreventDoubleClick(onClick, onDoubleClick);

  return (
    <div { ...rest } onClick={handleClick} onDoubleClick={handleDoubleClick}>
      {text}
    </div>
  );
};


const WithPreventDoubleClickDemo = ({ text, onClick, onDoubleClick, ...rest }) => (
  <ClickableBoxDemo
    {...rest}
    text={text}
    onClick={onClick}
    onDoubleClick={onDoubleClick}
  />
);
/*********************************************************************/


export {
  WithPreventDoubleClickExample,
  WithPreventDoubleClickDemo,
  withRouter,
};
