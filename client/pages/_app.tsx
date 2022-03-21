import "bootstrap/dist/css/bootstrap.min.css";
import buildClient from "../api/buildClient";
import { AppContext } from "next/app";
import Header from "../components/Header";
import "../styles/styles.scss";
import { User } from "../interfaces/User";

interface Props {
  currentUser: User | null;
}

export default function AppComponent({ Component, pageProps, currentUser}: any) {
  return (
    <>
      <Header currentUser={currentUser}/>
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
  console.log("user -> ", data.currentUser);
  return {
    pageProps,
    currentUser: data.currentUser
  };
}
