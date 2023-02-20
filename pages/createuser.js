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
} from "@fortawesome/free-solid-svg-icons";
import Link from "next/link";
// import DeleteModal from "../components/modal";
import { DeleteModal } from "../components/modal";
import { useEffect, useState } from "react";

const pen = <FontAwesomeIcon icon={faPenToSquare} className="pt-1" />;
const trash = <FontAwesomeIcon icon={faTrash} className="text-red-500 pt-1" />;
const eye = <FontAwesomeIcon icon={faEye} className="pt-1" />;
const plus = <FontAwesomeIcon icon={faFileCirclePlus} />;
const eyeSlash = <FontAwesomeIcon icon={faEyeSlash} className="pt-1" />;
const clipboard = <FontAwesomeIcon icon={faClipboardList} className="pt-1 " />;

export default function CreateUser({ data }) {
  // * render
  return (
    <>
      <h1 className="text-3xl font-bold text-center mb-2">Create User</h1>
      <div className="container">
        <div className="grid">
          <label className="font-semibold text-2xl">Username</label>
          <input
            className="bg-transparent border-b focus:outline-none py-1 placeholder:indent-2"
            placeholder="Can be an email or just a name."
          />
          <label className="font-semibold text-2xl">
            master pin or password
          </label>
          <input
            className="bg-transparent border-b focus:outline-none py-1 placeholder:indent-2"
            placeholder="Please choose a pin or password."
          />
          <label className="font-semibold text-2xl">
            confirm master pin or password
          </label>
          <input
            className="bg-transparent border-b focus:outline-none py-1 placeholder:indent-2"
            placeholder="Confirm your pin or password"
          />
          <div className="text-center">
            <button className="border mt-3 px-2 py-1 rounded shadow text-lg font-semibold hover:shadow-lg">
              Create
            </button>
          </div>
        </div>
      </div>
      <QuickLinks />
    </>
  );
}
