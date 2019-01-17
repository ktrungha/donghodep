import React from 'react';
import Axios from 'axios';
import { NextContext } from 'next';
import Watch from '../models/Watch';
import BaseDesktopLayout from '../components/BaseDesktopLayout';
import Contact from '../components/Contact';
import Logo from '../components/Logo';
import SearchBox from '../components/SearchBox';
import DesktopMenu from '../components/DesktopMenu';
import Brand from '../models/Brand';
import MediaQuery from 'react-responsive';
import { desktopMinWidth, mobileMaxWidth } from '../styles';
import WatchDetails from '../components/WatchDetails';
import Head from 'next/head';
import BaseMobileLayout from '../components/BaseMobileLayout';
import MobileMenu from '../components/MobileMenu';

declare const FB: any;
declare const window: { fbAsyncInit: any };

interface Props {
  watch: Watch;
  brands: Brand[];
}

interface State {
  commentLoaded: boolean;
}

class WatchPage extends React.PureComponent<Props, State> {
  static async getInitialProps(context: NextContext) {
    const watchId = context.query.id;
    let response = await Axios.get(`http://localhost:8001/watches/${watchId}`);
    const watch = response.data;

    response = await Axios.get('http://localhost:8001/brands?_sort=name');
    const brands = response.data;

    return { watch, brands };
  }

  constructor(props: Props) {
    super(props);

    this.state = { commentLoaded: false };

    this.commentLoaded = this.commentLoaded.bind(this);
  }

  commentLoaded() {
    this.setState({ commentLoaded: true });
  }

  componentDidMount() {
    if (typeof FB === 'undefined') {
      window.fbAsyncInit = () => {
        FB && (FB as any).Event.subscribe('xfbml.render', this.commentLoaded);
      };
    } else {
      FB.Event.subscribe('xfbml.render', this.commentLoaded);
    }

    (function(d, s, id) {
      let js = d.getElementsByTagName(s)[0] as HTMLScriptElement;
      const fjs = d.getElementsByTagName(s)[0];
      if (d.getElementById(id)) return;
      js = d.createElement(s) as HTMLScriptElement;
      js.id = id;
      js.src =
        'https://connect.facebook.net/vi_VN/sdk.js' +
        '#xfbml=1&version=v3.2&appId=2220937081486681&autoLogAppEvents=1';
      fjs.parentNode && fjs.parentNode.insertBefore(js, fjs);
    })(document, 'script', 'facebook-jssdk');
  }

  componentWillUnmount() {
    FB.Event.unsubscribe('xfbml.render', this.commentLoaded);
  }

  render() {
    const { brands, watch } = this.props;

    const content = <WatchDetails watch={watch} commentLoaded={this.state.commentLoaded} />;

    return (
      <>
        <Head>
          <title>Đồng Hồ Đẹp - Sài Gòn - Hồ Chí Minh - {watch.brand}</title>
          <meta name="viewport" content="width=device-width, initial-scale=1" />
          <meta property="fb:app_id" content="789655611427204" />
        </Head>
        <MediaQuery minWidth={desktopMinWidth}>
          <BaseDesktopLayout
            contact={<Contact />}
            logo={<Logo />}
            searchBox={<SearchBox />}
            menu={<DesktopMenu brands={brands} />}
            content={content}
          />
        </MediaQuery>
        <MediaQuery maxWidth={mobileMaxWidth}>
          <BaseMobileLayout
            contact={<Contact />}
            logo={<Logo />}
            searchBox={<SearchBox />}
            menu={<MobileMenu brands={brands} />}
            content={content}
          />
        </MediaQuery>
      </>
    );
  }
}

export default WatchPage;
