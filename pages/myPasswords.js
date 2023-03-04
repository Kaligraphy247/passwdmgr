import QuickLinks from "../components/quickLinks";
import SearchBar from "../components/search";
import { NoRecent } from "../components/recent";
import ButtonWithTooltip from "../components/buttonWithTooltip";
import { fetchAllPasswords } from "../models/models";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faTrash,
  faPenToSquare,
  faEye,
  faEyeSlash,
  faClipboardList,
  faFileCirclePlus,
  faEllipsisVertical,
  faCopy,
  fas,
} from "@fortawesome/free-solid-svg-icons";
import Link from "next/link";
import Head from "next/head";
import { DeleteModal } from "../components/modal";
import { useState } from "react";
import { useRouter } from "next/router";
import { withSessionSsr } from "./lib/config/withSession";

const pen = <FontAwesomeIcon icon={faPenToSquare} className="pt-1" />;
const trash = <FontAwesomeIcon icon={faTrash} className="text-red-500 pt-1" />;
const eye = <FontAwesomeIcon icon={faEye} className="pt-1" />;
const plus = <FontAwesomeIcon icon={faFileCirclePlus} />;
const more = (
  <FontAwesomeIcon icon={faEllipsisVertical} className="mt-1 mr-2" />
);
const eyeSlash = <FontAwesomeIcon icon={faEyeSlash} className="pt-1" />;
const clipboard = <FontAwesomeIcon icon={faClipboardList} className="pt-1 " />;

export default function MyPasswords({ data, user }) {
  const router = useRouter();

  // * get length of passwords, use it to render ui based on length
  let passwordsObjectLength = data.length;
  let [passwdIsBlurred, setPasswdIsBlurred] = useState(true);
  let [buttonToolTipMessage, setButtonToolTipMessage] = useState("show");
  let [showClipboard, setShowClipboard] = useState(false);

  // ! under construction
  // let nearPerfectData = data.filter()

  let [clip, setClip] = useState(" ");
  let [buttonToolTipLabel, setButtonToolTipLabel] = useState(eye);
  // ! end

  const showPassword = (passwdId) => {
    let showCleanPassword = document.getElementById(`passwdID_${passwdId}`);

    if (passwdIsBlurred === true) {
      setPasswdIsBlurred(false);
      showCleanPassword.classList.remove("blur-[7px]", "select-none");
      showCleanPassword.classList.add("blur-0");
      setButtonToolTipMessage("hide");
      // setShowClipboard(true);
    } else if (passwdIsBlurred === false) {
      setPasswdIsBlurred(true);
      showCleanPassword.classList.remove("blur-0");
      showCleanPassword.classList.add("blur-[7px]", "select-none");
      setButtonToolTipMessage("show");
      // setShowClipboard(false);
    }
  };

  const toEditPage = (id) => {
    router.push(`/myPasswords/edit/${[id]}`);
  };

  // * render
  return (
    <>
      <Head>
        <title>My passwords | Password Manager</title>
      </Head>
      <h1 className="text-3xl font-bold text-center mb-2">
        {user.firstName}'s Passwords
      </h1>
      <SearchBar />
      <div className="flex justify-between mb-1">
        <h3 className="text-2xl font-bold py-1">Recently saved passwords</h3>
        <button
          className="px-2 py-0.5 mb-1 rounded text-md shadow hover:shadow-md bg-green-500 text-white"
          onClick={() => {
            router.push("/addNew");
          }}
        >
          Add new {plus}
        </button>
      </div>
      {passwordsObjectLength < 1 ? (
        <NoRecent />
      ) : (
        <div className="container overflow-auto max-h-[480px]">
          <ul className="">
            {data.map(({ website, password, id }) => (
              <li
                className="flex justify-between p-2 rounded shadow hover:bg-slate-100 hover:shadow-slate-400 mb-5"
                key={id}
                {...passwdIsBlurred}
              >
                <p className="truncate">
                  <Link href="">
                    {website}
                    {/* . */}
                  </Link>
                </p>
                <p
                  className="px-2 blur-[7px] select-none truncate"
                  id={`passwdID_${id}`}
                >
                  {password}
                </p>

                <span className="space-x-4 flex">
                  {/* {more} */}
                  <Actions id={id} />
                  {/* <ButtonWithTooltip message={buttonToolTipMessage}>
                    <button onClick={() => showPassword(id)}>
                      {eye}
                    </button>
                  </ButtonWithTooltip> */}

                  {/* <ButtonWithTooltip message="Edit">
                    <button
                      onClick={() => router.push(`/myPasswords/edit/${[id]}`)}
                    >
                      {pen}
                    </button>
                  </ButtonWithTooltip> */}

                  {/* <ButtonWithTooltip message="Delete">
                    <button
                      onClick={() => {
                        router.push(`/myPasswords/delete/${[id]}`);
                      }}
                    >
                      {trash}
                    </button>
                  </ButtonWithTooltip> */}
                </span>
              </li>
            ))}
          </ul>
        </div>
      )}
      <QuickLinks />
    </>
  );
}

function Actions({ id }) {
  const router = useRouter();
  let [passwdIsBlurred, setPasswdIsBlurred] = useState(true);
  let [optionLabel, setOptionLabel] = useState("show");

  const showPassword = (passwdId) => {
    let showCleanPassword = document.getElementById(`passwdID_${passwdId}`);

    if (passwdIsBlurred === true) {
      setPasswdIsBlurred(false);
      showCleanPassword.classList.remove("blur-[7px]", "select-none");
      showCleanPassword.classList.add("blur-0");
      setOptionLabel("hide");
    } else if (passwdIsBlurred === false) {
      setPasswdIsBlurred(true);
      showCleanPassword.classList.remove("blur-0");
      showCleanPassword.classList.add("blur-[7px]", "select-none");
      setOptionLabel("hide");
    }
  };
  return (
    <>
      <select
        onChange={(e) => {
          const optionValue = e.target.value;
          if (optionValue === "show") {
            console.log(optionValue);
            showPassword(id);
          }
          if (optionValue === "hide") {
            console.log(optionValue);
            showPassword(id);
          }
          if (optionValue === "edit") {
            console.log(optionValue);
            router.push(`/myPasswords/edit/${[id]}`);
          } else if (optionValue === "delete") {
            console.log(optionValue);
            router.push(`/myPasswords/delete/${[id]}`);
          }
        }}
        className="w-20 h-5 text-xs border border-solid border-blue-200 bg-blue-100 rounded shadow-md focus:outline-none"
      >
        <option disabled defaultValue selected>
          Select
        </option>
        <option value={optionLabel}>{optionLabel}</option>
        <option value="edit">Edit</option>
        <option value="delete">Delete</option>
      </select>
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
  const data = await fetchAllPasswords(user.id);
  return {
    props: { user, data },
  };
});
