import Layout from "@/components/layout/layout";
import type { AppProps } from "next/app";
import Head from "next/head";
import "@/styles/app.scss";
import "animate.css";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <Layout>
      <Head>
        <title>DX Dashboard</title>
      </Head>
      <Component {...pageProps} />
    </Layout>
  );
}

export default MyApp;
