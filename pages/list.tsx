import React from 'react';
import Axios from 'axios';
import { NextContext } from 'next';
import Watch from '../models/Watch';
import MediaQuery from 'react-responsive';
import { desktopMinWidth, mobileMaxWidth } from '../styles';
import BaseDesktopLayout from '../components/BaseDesktopLayout';
import Contact from '../components/Contact';
import Logo from '../components/Logo';
import SearchBox from '../components/SearchBox';
import DesktopMenu from '../components/DesktopMenu';
import Brand from '../models/Brand';
import WatchesList from '../components/WatchesList';
import Head from 'next/head';
import BaseMobileLayout from '../components/BaseMobileLayout';
import MobileMenu from '../components/MobileMenu';

interface Props {
  brands: Brand[];
  watches: Watch[];
  header: string;
}

class ListPage extends React.PureComponent<Props, {}> {
  static async getInitialProps(context: NextContext) {
    let watches = [];
    let response;
    const brand = context.query.brand;
    const type = context.query.type;
    const search = context.query.search;
    let header = '';
    if (brand) {
      response = await Axios.get(
        encodeURI(`http://localhost:8001/watches?brand_like=${brand}&_sort=time&order=desc`),
      );
      watches = response.data;
      header = `${brand}`;
    } else if (type) {
      response = await Axios.get(
        encodeURI(`http://localhost:8001/watches?type=${type}&_sort=time&order=desc`),
      );
      watches = response.data;
      if (type === 'male') {
        header = 'Đồng Hồ Nam';
      } else {
        header = 'Đồng Hồ Nữ';
      }
    } else if (search) {
      response = await Axios.get(
        encodeURI(`http://localhost:8001/watches?search_like=${search}&_sort=time&order=desc`),
      );
      watches = response.data;
      header = `Tìm kiếm: ${search}`;
    }

    response = await Axios.get('http://localhost:8001/brands?_sort=name');
    const brands = response.data;

    return { watches, brands, header };
  }

  render() {
    const { watches, brands, header } = this.props;

    const content = (
      <>
        <div style={{ fontSize: '1.1em', marginTop: '10px', textAlign: 'center' }}>{header}</div>
        <WatchesList watches={watches} />
      </>
    );

    const contact = <Contact />;
    const logo = <Logo />;
    const searchBox = <SearchBox />;

    return (
      <>
        <Head>
          <title>Đồng Hồ Đẹp - Sài Gòn - Hồ Chí Minh</title>
          <meta name="viewport" content="width=device-width, initial-scale=1" />
        </Head>
        <MediaQuery minWidth={desktopMinWidth}>
          <BaseDesktopLayout
            contact={contact}
            logo={logo}
            searchBox={searchBox}
            menu={<DesktopMenu brands={brands} />}
            content={content}
          />
        </MediaQuery>
        <MediaQuery maxWidth={mobileMaxWidth}>
          <BaseMobileLayout
            contact={contact}
            logo={logo}
            searchBox={searchBox}
            menu={<MobileMenu brands={brands} />}
            content={content}
          />
        </MediaQuery>
      </>
    );
  }
}

export default ListPage;
