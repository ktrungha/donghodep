import React from 'react';
import colors from '../styles/colors';

interface Props {
  contact: React.ReactNode;
  logo: React.ReactNode;
  searchBox: React.ReactNode;
  menu: React.ReactNode;
  content: React.ReactNode;
}

const width = '1200px';

const BaseDesktopLayout: React.SFC<Props> = (props) => {
  const { contact, logo, searchBox, menu, content } = props;
  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
      <div
        style={{
          maxWidth: width,
          display: 'flex',
          alignItems: 'center',
          width: '100%',
          backgroundColor: 'white',
        }}
      >
        <div style={{ flex: 1, maxWidth: '350px' }}>{contact}</div>
        <div style={{ flex: 1 }}>{logo}</div>
        <div style={{ flex: 1, maxWidth: '350px' }}>{searchBox}</div>
      </div>
      <div
        style={{
          alignSelf: 'stretch',
          backgroundColor: colors.red,
          justifyContent: 'center',
          display: 'flex',
          position: 'sticky',
          top: 0,
          zIndex: 1,
        }}
      >
        <div style={{ maxWidth: width, width: '100%' }}>{menu}</div>
      </div>
      <div style={{ maxWidth: width, width: '100%' }}>{content}</div>
    </div>
  );
};

export default BaseDesktopLayout;
