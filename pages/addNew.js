import QuickLinks from "../components/quickLinks";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSave } from "@fortawesome/free-solid-svg-icons";
import { useState } from "react";
import { AlertInfo } from "/components/alerts.js";
import { withSessionSsr } from "../lib/config/withSession";
import Head from "next/head";

const save = <FontAwesomeIcon icon={faSave} />;

export default function AddNewPassword({ user }) {
  const [pTag, setPTag] = useState(""); // todo remove me
  async function handleSubmit(event) {
    // prevent browser from reloading page
    event.preventDefault();

    //? read data from form normally
    const form = event.target;
    const formData = new FormData(form);

    // preferable when using event handlers
    const data = {
      id: user.id,
      website: event.target.website.value,
      password: event.target.password.value,
    };
    //* set endpoint
    const endpoint = "/api/addnewpassword";

    //* Form the request for sending data to the server
    const options = {
      method: "POST",
      headers: {
        // Tell the server what type of data we're sending
        // multipart/form-data is also an example
        "Content-Type": "application/json",
        // "content-type": "multipart/form-data",
      },
      body: JSON.stringify(data),
      // body: data,
    };

    //* Send the form data to forms API and get a response
    const response = await fetch(endpoint, options); // normally, save to db

    // get the response from the server as JSON.
    const result = await response.json();
    // console.log(result.data); //? debug
    setPTag(<AlertInfo message={result.data} />);

    // * reset fields
    event.target.website.value = "";
    event.target.password.value = "";

    //? not used at the end.
    // setTimeout(() => {
    //   window.location.reload(false);
    // }, 2500);
  }

  return (
    <>
      <Head>
        <title>Add New Password</title>
      </Head>
      <h1 className="text-3xl font-bold text-center mb-2">Add New Password</h1>
      {/* todo remove me */}
      <h3 className="text-2xl font-bold py-1">Securely store your password</h3>
      <>{pTag}</>
      <div className="container">
        <form className="grid" onSubmit={handleSubmit}>
          <label className="text-lg pl-1 font-medium">Account</label>
          <input
            className="bg-inherit border outline-none rounded p-1 focus:outline-1 focus:outline-blue-200 focus:border-none focus:rounded-sm border-[#8f9094]"
            id="website"
            name="website"
            placeholder="e.g. Facebook, Reddit, Gmail e.t.c."
          ></input>
          <label className="text-lg pl-1 font-medium">Password</label>
          <input
            className="bg-inherit border outline-none rounded p-1 focus:outline-1 focus:outline-blue-200 focus:border-none focus:rounded-sm border-[#8f9094]"
            id="password"
            name="password"
            placeholder="Your password in plain text. Don't worry it will be encrypted."
          ></input>
          <div className="mt-3 text-center">
            <button
              className="border rounded px-2 py-1 text-lg font-medium shadow hover:shadow-md border-[#8f9094]"
              type="submit"
            >
              Save
              <>&nbsp;</>
              {save}
            </button>
          </div>
        </form>
      </div>
      <QuickLinks />
    </>
  );
}

export const getServerSideProps = withSessionSsr(async ({ req, res }) => {
  const user = req.session.user;
  if (!user) {
    return {
      redirect: {
        destination: "/login",
        permanent: false,
      },
    };
  }

  // implicit else
  return {
    props: { user },
  };
});
