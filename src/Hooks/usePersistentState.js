import React from 'react';

const usePersistentState = (key, defaultState) => {
  const [state, setState] = React.useState(defaultState);

  React.useEffect(() => {
    if (localStorage.getItem(key)) {
      setState(JSON.parse(localStorage.getItem(key) ?? ''));
    }
  }, [key]);

  React.useEffect(() => {
    localStorage.setItem(key, JSON.stringify(state));
  }, [key, state]);

  return [state, setState];
};

export default usePersistentState;
