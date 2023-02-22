import Head from "next/head";
import QuickLinks from "../components/quickLinks";

export default function ImportPasswords() {
  return (
    <>
      <Head>
        <title>Import Password</title>
      </Head>
      <h1 className="text-3xl font-bold text-center mb-2">Import Passwords</h1>
      <h3 className="text-2xl font-bold py-1">Import your passwords here</h3>
      <div className="container">1</div>
      <QuickLinks />
    </>
  );
}
