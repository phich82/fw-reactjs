import React from 'react';
import { debounce } from 'lodash';

const withPreventDoubleClickLock = WrappedComponent => {
  class PreventDoubleClickLock extends React.PureComponent {
    debouncedOnPress = () => {
      this.props.onPress && this.props.onPress();
    };

    touchedBounce = () => {
      return this.props.touchedTime;
    };

    onPress = () => {
      // previous unlock status
      let unlock = this.props.unlock === false ? false : true;
      // lock tapping on another buttons (current button is being processed)
      if (typeof this.props.setUnlock === 'function') {
        this.props.setUnlock();
      }
      // only execute onPress event when it is not locked
      unlock &&
        debounce(this.debouncedOnPress, this.touchedBounce() || 300, {
          leading: true,
          trailing: false,
        })();
    };

    render() {
      return <WrappedComponent {...this.props} onPress={this.onPress} />;
    }
  }

  const WrappedComponentName = WrappedComponent.displayName || WrappedComponent.name || 'Component';

  PreventDoubleClickLock.displayName = `withPreventDoubleClickLock(${WrappedComponentName})`;

  return PreventDoubleClickLock;
};

export default withPreventDoubleClickLock;
