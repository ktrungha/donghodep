import React from 'react';
import App, { Container } from 'next/app';
import '../styles/index.css';
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import red from '@material-ui/core/colors/red';
import Router from 'next/router';
import withGA from 'next-ga';

const theme = createMuiTheme({
  palette: {
    primary: red,
  },
  typography: {
    useNextVariants: true,
  },
});

class MyApp extends App {
  static async getInitialProps({ Component, router, ctx }) {
    let pageProps = {};

    if (Component.getInitialProps) {
      pageProps = await Component.getInitialProps(ctx);
    }

    return { pageProps };
  }

  render() {
    const { Component, pageProps } = this.props;

    return (
      <Container>
        <MuiThemeProvider theme={theme}>
          <Component {...pageProps} />
        </MuiThemeProvider>
      </Container>
    );
  }
}

export default withGA('UA-133182441-1', Router)(MyApp);
