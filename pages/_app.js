/* ==========================================Parent Component============================ */
//styling for all pages in tree
import "../styles/globals.css";
import Layout from "../components/Layout";
import { DataProvider } from "../store/GlobalState";

//parent component that is wrapped by the Layout component  and data provider
//this is to provide uniformity in global state and layout
function MyApp({ Component, pageProps }) {
  return (
    <DataProvider>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </DataProvider>
  );
}

export default MyApp;
