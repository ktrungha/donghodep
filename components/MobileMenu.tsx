import React from 'react';
import styled from 'styled-components';
import { slide as Menu } from 'react-burger-menu';
import Brand from '../models/Brand';

const A = styled.a`
  text-decoration: none;
  color: inherit;
  flex-grow: 1;
`;

const UL = styled.ul`
  transform-origin: 0 0 ;
  animation: openBrands 200ms;
`;

interface Props {
  brands: Brand[];
}

interface State {
  openBrands: boolean;
}

class MobileMenu extends React.PureComponent<Props, State> {
  state = { openBrands: false };

  render() {
    const { brands } = this.props;
    const { openBrands } = this.state;
    return (
      <Menu>
        <div onClick={() => this.setState({ openBrands: !openBrands })}>
          Thương Hiệu
          {openBrands && (
            <UL>
              {brands.map((brand) => (
                <li key={brand.id} style={{ padding: '10px' }}>
                  <A href={`/list?brand=${brand.name}`}>{brand.name}</A>
                </li>
              ))}
            </UL>
          )}
        </div>
        <A key={1} href="/list?type=male">
          <span>Đồng Hồ Nam</span>
        </A>
        <A key={1} href="/list?type=female">
          <span>Đồng Hồ Nữ</span>
        </A>
      </Menu>
    );
  }
}

export default MobileMenu;
