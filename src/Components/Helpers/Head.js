import React from 'react';

const Head = ({ title }) => {
  React.useEffect(() => {
    document.title = `${title} | SC`;
  }, [title]);

  return <></>;
};

export default Head;
