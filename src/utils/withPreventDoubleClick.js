import React from 'react';
import { debounce } from 'lodash';

const withPreventDoubleClick = WrappedComponent => {
  class PreventDoubleClick extends React.PureComponent {
    noop = () => {};

    onClick = debounce(
      this.props.onClick || this.noop,
      this.props.delay || 300,
      {
        leading: true,
        trailing: false,
      }
    );

    render() {
      return <WrappedComponent {...this.props} onClick={this.onClick} />;
    }
  }

  const WrappedComponentName = WrappedComponent.displayName || WrappedComponent.name || 'Component';

  PreventDoubleClick.displayName = `withPreventDoubleClick(${WrappedComponentName})`;

  PreventDoubleClick.defaultProps = {
    onClick: () => {},
  };

  return PreventDoubleClick;
};

export default withPreventDoubleClick;
