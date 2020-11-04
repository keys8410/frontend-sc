import React from 'react';

const Error = ({ error }) => {
  if (!error) return null;

  return <p className="text-danger m-0 p-0 small text-right">{error}</p>;
};

export default Error;
