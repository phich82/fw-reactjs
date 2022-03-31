import useCancellablePromises from './useCancellablePromises';

const delay = n => new Promise(resolve => setTimeout(resolve, n));

const cancellablePromise = promise => {
  let isCanceled = false;

  const wrappedPromise = new Promise((resolve, reject) => {
    promise.then(
      value => (isCanceled ? reject({ isCanceled, value }) : resolve(value)),
      error => reject({ isCanceled, error }),
    );
  });

  return {
    promise: wrappedPromise,
    cancel: () => (isCanceled = true),
  };
};

const usePreventDoubleClick = (onClick, onDoubleClick) => {
  const { appendPendingPromise, clearPendingPromises, removePendingPromise } = useCancellablePromises();

  const handleClick = () => {
    clearPendingPromises();
    const waitForClick = cancellablePromise(delay(300));
    appendPendingPromise(waitForClick);

    return waitForClick.promise
      .then(() => {
        removePendingPromise(waitForClick);
        onClick();
      })
      .catch(error => {
        removePendingPromise(waitForClick);
        if (!error.isCanceled) {
          throw error.error;
        }
      });
  };

  const handleDoubleClick = () => {
    clearPendingPromises();
    onDoubleClick();
  };

  return [handleClick, handleDoubleClick];
};

export default usePreventDoubleClick;
