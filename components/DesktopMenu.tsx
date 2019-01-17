import React from 'react';
import styled from 'styled-components';
import Brand from '../models/Brand';
import colors from '../styles/colors';

const MenuItem = styled.span`
  padding: 20px;
  display: block;
  font-size: 1.1em;
  text-align: center;
  color: white;
  :hover {
    cursor: pointer;
  }
`;

const LinkItem = styled.a`
  text-decoration: none;
  color: inherit;
  display: block;
`;

const MenuLinkItem = styled.a`
  text-decoration: none;
  color: white;
  flex: 1;
`;

const BrandItem = styled.div`
  padding: 20px;
  :hover {
    background-color: ${colors.black};
    color: white;
  }
`;

const BrandsContainer = styled.div`
  position: absolute;
  display: flex;
  visibility: hidden;
  width: 95%;
  left: 0;
  right: 0;
  margin: auto;
  transform: scaleY(0);
  transform-origin: 0 0;
  flex-wrap: wrap;
  border-width: 1px;
  border-color: ${colors.border};
  border-bottom-left-radius: 10px;
  border-bottom-right-radius: 10px;
  box-shadow: 0 0 10px 2px ${colors.shadow};
  background-color: white;
  transition: all 250ms;
  overflow: hidden;
`;

const BrandMenuItem = styled.div`
  flex: 1;
  :hover > div {
    transform: scaleY(1);
    visibility: visible;
  }
`;

interface Props {
  brands: Brand[];
}

interface State {}

class DesktopMenu extends React.PureComponent<Props, State> {
  render() {
    const { brands } = this.props;
    return (
      <div
        style={{
          display: 'flex',
          justifyContent: 'center',
          position: 'relative',
          backgroundColor: colors.red,
        }}
      >
        <BrandMenuItem>
          <MenuItem>Thương hiệu</MenuItem>
          <BrandsContainer>
            {brands.map((brand) => (
              <LinkItem key={brand.id} href={`/list?brand=${brand.name}&_sort=time&_order=desc`}>
                <BrandItem>{brand.name}</BrandItem>
              </LinkItem>
            ))}
          </BrandsContainer>
        </BrandMenuItem>
        <MenuLinkItem href="/list?type=male">
          <MenuItem>Đồng Hồ Nam</MenuItem>
        </MenuLinkItem>
        <MenuLinkItem href="/list?type=female">
          <MenuItem>Đồng Hồ Nữ</MenuItem>
        </MenuLinkItem>
      </div>
    );
  }
}

export default DesktopMenu;
