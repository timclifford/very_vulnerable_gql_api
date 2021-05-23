import App from "next/app";
import { UserProvider } from "../context/UserContext";
import { withApollo } from "../lib/withApollo";
import '../styles/index.css';

class MyApp extends App {
  static async getInitialProps({ Component, ctx }) {
    let pageProps = {};
    if (Component.getInitialProps) {
      pageProps = await Component.getInitialProps(ctx);
    }

    const token = ctx?.req?.headers?.cookie ? ctx.req.headers.cookie : null;

    pageProps.query = ctx.query;
    pageProps.token = token;

    return { pageProps };
  }

  render() {
    const { pageProps, Component } = this.props;
    return (
      <UserProvider>
        <Component {...pageProps} />
      </UserProvider>
    );
  }
}
export default withApollo({ ssr: true })(MyApp);
