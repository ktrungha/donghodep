import React from 'react';

const Logo: React.SFC = () => {
  return (
    <div style={{ textAlign: 'center', padding: '15px' }}>
      <a href="/"><img src="/static/logo.png" style={{ width: '250px' }} /></a>
    </div>
  );
};

export default Logo;
