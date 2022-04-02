import React from 'react';
import { debounce } from 'lodash';

const withPreventDoubleClickLock = WrappedComponent => {
  class PreventDoubleClickLock extends React.PureComponent {
    noop = () => {};

    onClick = () => {
      // previous unlock status
      let lock = this.props.lock === true ? true : false;
      // lock tapping on another buttons (current button is being processed)
      this.props.setLock && this.props.setLock();
      // only execute onPress event when it is not locked
      !lock &&
        debounce(this.props.onClick || this.noop, this.props.delay || 300, {
          leading: true,
          trailing: false,
        })();
    };

    render() {
      return <WrappedComponent {...this.props} onClick={this.onClick} />;
    }
  }

  const WrappedComponentName = WrappedComponent.displayName || WrappedComponent.name || 'Component';

  PreventDoubleClickLock.displayName = `withPreventDoubleClickLock(${WrappedComponentName})`;

  return PreventDoubleClickLock;
};

export default withPreventDoubleClickLock;
