import React from 'react';

const useFetch = () => {
  const [data, setData] = React.useState(null);
  const [error, setError] = React.useState(null);
  const [loading, setLoading] = React.useState(null);

  const request = React.useCallback(async (fnc = {}) => {
    let res;

    try {
      setError(null);
      setLoading(true);

      res = await fnc;

      console.log(res);
    } catch ({ message }) {
      res = null;

      setError(message);
    } finally {
      setData(res);
      setLoading(false);

      return { res };
    }
  }, []);

  return { data, loading, error, request };
};

export default useFetch;
