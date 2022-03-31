import React from 'react';
import { debounce } from 'lodash';

const withPreventDoubleClick = WrappedComponent => {
  class PreventDoubleClick extends React.PureComponent {
    debouncedOnClick = () => {
      this.props.onClick && this.props.onClick();
    };

    clickedBounce = () => {
      return this.props.clickedTime;
    };

    onClick = debounce(this.debouncedOnClick, this.clickedBounce() || 300, {
      leading: true,
      trailing: false,
    });

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
