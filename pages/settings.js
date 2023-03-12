import Head from "next/head";
import QuickLinks from "../components/quickLinks";
import React from "react";
import { useRouter } from "next/router";
import { withSessionSsr } from "./lib/config/withSession";

export default function Settings({ user }) {
  const router = useRouter();
  const handleClick = () => {
    const endpoint = "/api/logout";
    fetch(endpoint);
    console.log("successfull");
    router.push("/");
  };
  return (
    <>
      <Head>
        <title>Settings</title>
      </Head>
      <h1 className="text-3xl font-bold text-center mb-2">Settings</h1>
      <h3 className="text-2xl font-bold py-1">
        Manage your account here {user.firstName}
      </h3>
      <div className="container">
        <button onClick={handleClick} style={{ color: "red" }}>
          Logout
        </button>
        <p>Lorem</p>
        <p>Lorem</p>
        <p>Lorem</p>
        <p>Lorem</p>
        <p>Lorem</p>
      </div>
      <QuickLinks />
    </>
  );
}

export const getServerSideProps = withSessionSsr(async ({ req }) => {
  const user = req.session.user;

  if (!user) {
    return {
      redirect: {
        destination: "/login",
        permanent: false,
      },
    };
    // return {
    //   notFound: true,
    // };
  }

  // implicit else
  return {
    props: { user },
  };
});
