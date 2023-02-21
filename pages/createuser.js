import QuickLinks from "../components/quickLinks";
import SearchBar from "../components/search";
import { NoRecent } from "../components/recent";
import ButtonWithTooltip from "../components/buttonWithTooltip";
// import { fetchAllPasswords } from "../models/models";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faTrash,
  faPenToSquare,
  faEye,
  faEyeSlash,
  faClipboardList,
  faFileCirclePlus,
  faCopy,
  faUserPlus,
} from "@fortawesome/free-solid-svg-icons";
import Link from "next/link";
import { DeleteModal } from "../components/modal";
import { useState } from "react";

const pen = <FontAwesomeIcon icon={faPenToSquare} className="pt-1" />;
const trash = <FontAwesomeIcon icon={faTrash} className="text-red-500 pt-1" />;
const eye = <FontAwesomeIcon icon={faEye} className="pt-1" />;
const plus = <FontAwesomeIcon icon={faFileCirclePlus} />;
const eyeSlash = <FontAwesomeIcon icon={faEyeSlash} className="pt-1" />;
const clipboard = <FontAwesomeIcon icon={faClipboardList} className="pt-1 " />;
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
    setPTag(result.data); // todo remove me

    // * reset fields
    event.target.firstName.value = "";
    event.target.username.value = "";
    event.target.masterPassword.value = "";
    event.target.ConfirmMasterPassword.value = "";
  }
  // * render
  return (
    <>
      <h1 className="text-3xl font-bold text-center mb-2">
        Create a new User Account
      </h1>
      <p>{pTag}</p>
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
      </div>
      <QuickLinks />
    </>
  );
}