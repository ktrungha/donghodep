import React from 'react';
import Contact from '../components/Contact';
import Logo from '../components/Logo';
import SearchBox from '../components/SearchBox';
import BaseDesktopLayout from '../components/BaseDesktopLayout';
import DesktopMenu from '../components/DesktopMenu';
import MediaQuery from 'react-responsive';
import { desktopMinWidth, mobileMaxWidth } from '../styles';
import Axios from 'axios';
import Brand from '../models/Brand';
import Watch from '../models/Watch';
import WatchesList from '../components/WatchesList';
import Head from 'next/head';
import BaseMobileLayout from '../components/BaseMobileLayout';
import MobileMenu from '../components/MobileMenu';

interface Props {
  brands: Brand[];
  newWatches: Watch[];
}

class Home extends React.PureComponent<Props, {}> {
  static async getInitialProps() {
    let response = await Axios.get('http://localhost:8001/brands?_sort=name');
    const brands = response.data;

    response = await Axios.get('http://localhost:8001/watches?_sort=time&_order=desc&_limit=30');
    const watches = response.data;

    return { brands, newWatches: watches };
  }

  render() {
    const { brands, newWatches } = this.props;

    const contact = <Contact />;
    const logo = <Logo />;
    const searchBox = <SearchBox />;
    const content = (
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        <img
          style={{ margin: '20px', borderRadius: '10px', maxWidth: 'calc(100% - 40px)', minHeight: '200px', objectFit: 'cover' }}
          src="/static/banner.png"
        />
        <div style={{ marginTop: '20px', fontSize: '1.2em' }}>Đồng Hồ Mới:</div>
        <WatchesList watches={newWatches} />
      </div>
    );

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

export default Home;
