import Head from "next/head";
import { ToastContainer } from "react-toastify";

const Layout = ({ title, description, keywords, children }) => {
  return (
    <>
      <Head>
        <title>{title}</title>
        <meta name="description" content={description} />
        <meta name="keywords" content={keywords} />
      </Head>

      {children}
      <ToastContainer />
    </>
  );
};

export default Layout;
