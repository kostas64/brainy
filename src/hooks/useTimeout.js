import React from 'react';

const useTimeout = () => {
  const timeout = React.useRef();

  //** ----- EFFECTS -----
  React.useEffect(() => {
    return () => {
      if (timeout.current) {
        clearTimeout(timeout.current);
        timeout.current = null;
      }
    };
  }, []);

  return timeout;
};

export default useTimeout;
