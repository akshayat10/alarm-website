import React from 'react';

const ScrollablePage = ({ children }) => {
  return (
    <div style={{ height: '100%', overflow: 'auto' }}>
      {children}
    </div>
  );
};

export default ScrollablePage;
