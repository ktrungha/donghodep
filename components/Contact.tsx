import React from 'react';
import Call from '@material-ui/icons/CallOutlined';
import Location from '@material-ui/icons/StoreOutlined';
import styled from 'styled-components';
import { media } from '../styles';

const Line = styled.div`
  display: flex;
  align-items: center;
  ${media.mobile`
    justify-content: center;
  `}
`;

const Container = styled.div`
  padding: 10px;
  ${media.mobile`
    padding: 5px;
  `}
`;

const Contact: React.SFC = () => {
  return (
    <Container>
      <Line style={{ display: 'flex', alignItems: 'center' }}>
        {
          <img
            src="https://image.flaticon.com/icons/svg/33/33702.svg"
            style={{ width: '16px', height: '16px' }}
          />
        }
        <a
          style={{ padding: '5px', textDecoration: 'none', color: 'inherit' }}
          href="https://www.facebook.com/donghodepnhat/"
        >
          Facebook
        </a>
      </Line>
      <Line style={{ display: 'flex', alignItems: 'center' }}>
        {<Call />}
        <span style={{ padding: '5px' }}>090123456</span>
      </Line>
      <Line style={{ display: 'flex', alignItems: 'center' }}>
        {<Location />}
        <span style={{ padding: '5px' }}>595 Cách Mạng Tháng Tám, Quận 10</span>
      </Line>
    </Container>
  );
};

export default Contact;
