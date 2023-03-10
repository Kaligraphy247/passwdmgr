import QuickLinks from "../components/quickLinks";
import { AlertInfo } from "/components/alerts.js";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUserPlus } from "@fortawesome/free-solid-svg-icons";
import Link from "next/link";
import Head from "next/head";
import { useState } from "react";

const newUser = <FontAwesomeIcon icon={faUserPlus} className="pt-1 " />;

export default function CreateUser({ data }) {
  const [pTag, setPTag] = useState(""); // todo remove me
  async function handleSubmit(event) {
    event.preventDefault();

    //? read data from form normally
    const form = event.target;
    const formData = new FormData(form);

    // preferable when using event handlers
    const data = {
      firstName: event.target.firstName.value,
      username: event.target.username.value,
      password: event.target.masterPassword.value,
      confirmPassword: event.target.ConfirmMasterPassword.value,
    };
    //* set endpoint
    const endpoint = "/api/addnewuser";

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
    setPTag(<AlertInfo message={result.data} />); // todo remove me

    // * reset fields
    event.target.firstName.value = "";
    event.target.username.value = "";
    event.target.masterPassword.value = "";
    event.target.ConfirmMasterPassword.value = "";
  }
  // * render
  return (
    <>
      <Head>
        <title>Create a new user Account</title>
      </Head>
      <h1 className="text-3xl font-bold text-center mb-2">
        Create a new User Account
      </h1>
      {pTag}
      <div className="container">
        <form className="grid" onSubmit={handleSubmit}>
          <label className="font-semibold text-xl">Name</label>
          <input
            className="bg-transparent border-b focus:outline-none mt-1 mb-2"
            id="firstName"
            name="firstName"
            placeholder="What you'd like to be called."
          />
          <label className="font-semibold text-xl">Username</label>
          <input
            className="bg-transparent border-b focus:outline-none mt-1 mb-2"
            id="username"
            name="username"
            placeholder="Can be an email or just a name."
          />
          <label className="font-semibold text-xl">
            Master pin or password
          </label>
          <input
            className="bg-transparent border-b focus:outline-none mt-1 mb-2"
            id="masterPassword"
            name="masterPassword"
            placeholder="Please choose a pin or password."
          />
          <label className="font-semibold text-xl">
            Confirm master pin or password
          </label>
          <input
            className="bg-transparent border-b focus:outline-none mt-1 mb-2"
            id="ConfirmMasterPassword"
            name="ConfirmMasterPassword"
            placeholder="Confirm your pin or password"
          />
          <div className="text-center">
            <button className="border mt-3 px-2 py-1 rounded shadow text-lg font-semibold hover:shadow-lg">
              Create {newUser}
            </button>
          </div>
        </form>
        <p className="text-xs">
          Already have an account ?{" "}
          <Link href="/createuser" className="text-red-500 hover:text-blue-600">
            Login
          </Link>{" "}
          instead.
        </p>
      </div>
      <QuickLinks />
    </>
  );
}
