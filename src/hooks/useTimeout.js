/* eslint-disable react-hooks/exhaustive-deps */
import React from 'react';

const useTimeout = () => {
  const timeout = React.useRef();

  //** ----- EFFECTS -----
  React.useEffect(() => {
    return () => {
      !!timeout.current && clearTimeout(timeout.current);
    };
  }, []);

  return timeout;
};

export default useTimeout;
