import "bootstrap/dist/css/bootstrap.min.css";
import { AppProps } from "next/app";
import Header from "../components/Header";
import "../styles/styles.scss";

export default ({ Component, pageProps }: AppProps) => {
  return (
    <>
      <Header />
      <Component {...pageProps} />
    </>
  );
};
