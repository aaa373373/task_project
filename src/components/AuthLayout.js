import Head from "next/head";

const AuthLayout = ({ title, description, keywords, children }) => {
  return (
    <>
      <Head>
        <title>{title}</title>
        <meta name="description" content={description} />
        <meta name="keywords" content={keywords} />
      </Head>

      {children}
    </>
  );
};

export default AuthLayout;
