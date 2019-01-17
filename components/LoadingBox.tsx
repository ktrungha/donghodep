import React from 'react';
import '../styles/LoadingBox.css';

const LoadingBox: React.SFC<{ message: string }> = (props) => {
  return (
    <div
      style={{
        textAlign: 'center',
      }}
    >
      <div className="spinner">
        <div className="dot1" />
        <div className="dot2" />
      </div>
      <div style={{ marginTop: '20px', textAlign: 'center' }}>{props.message}</div>
    </div>
  );
};

export default LoadingBox;
