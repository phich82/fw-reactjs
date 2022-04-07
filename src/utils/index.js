import { ClickableBox, DoubleClickableBox } from '../components/ui';
import withPreventDoubleClick from './withPreventDoubleClick';
import withRouter from './withRouter';
import withTheme from './withTheme';

const WithPreventDoubleClick = withPreventDoubleClick(ClickableBox);
const WithPreventDoubleClickHook = DoubleClickableBox;

export {
  WithPreventDoubleClick,
  WithPreventDoubleClickHook,
  withRouter,
  withTheme,
};
