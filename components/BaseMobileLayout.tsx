import React from 'react';
import colors from '../styles/colors';
import '../styles/burgerMenu.css';

interface Props {
  contact: React.ReactNode;
  logo: React.ReactNode;
  searchBox: React.ReactNode;
  menu: React.ReactNode;
  content: React.ReactNode;
}

const width = '1200px';

const BaseMobileLayout: React.SFC<Props> = (props) => {
  const { contact, logo, searchBox, menu, content } = props;
  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
      <div
        style={{
          position: 'sticky',
          top: 0,
          zIndex: 1001,
          backgroundColor: 'white',
          alignSelf: 'stretch',
        }}
      >
        {contact}
        <div style={{ height: '5px', backgroundColor: colors.red }} />
      </div>
      <div style={{ maxWidth: width, display: 'flex', alignItems: 'center', width: '100%' }}>
        <div>{menu}</div>
        <div style={{ flex: 1 }}>{logo}</div>
      </div>
      <div style={{ alignSelf: 'stretch', backgroundColor: colors.red, padding: '10px' }}>
        {searchBox}
      </div>
      <div style={{ maxWidth: width, width: '100%' }}>{content}</div>
    </div>
  );
};

export default BaseMobileLayout;
