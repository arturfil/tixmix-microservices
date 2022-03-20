import "bootstrap/dist/css/bootstrap.min.css";
import buildClient from "../api/buildClient";
import { AppContext, AppProps } from "next/app";
import Header from "../components/Header";
import "../styles/styles.scss";
import { User } from "../interfaces/User";

interface Props {
  currentUser: User;
}

const AppComponent = ({ Component, pageProps }: AppProps, {currentUser}: Props) => {
  return (
    <>
      <h2>{currentUser.name}</h2>
      <Header/>
      <Component {...pageProps} />
    </>
  );
};

AppComponent.getInitialProps = async (appContext: AppContext) => {
  const client = buildClient(appContext.ctx);
  const { data } = await client.get('/api/users/currentuser');
  let pageProps = {}
  if (appContext.Component.getInitialProps) {
    pageProps = await appContext.Component.getInitialProps(appContext.ctx);
  }
  return {
    pageProps,
    ...data
  };
}

export default AppComponent;