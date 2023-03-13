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
  faFileCirclePlus,
} from "@fortawesome/free-solid-svg-icons";
import Link from "next/link";
import Head from "next/head";
import { useState } from "react";
import { useRouter } from "next/router";
import { withSessionSsr } from "./lib/config/withSession";

const pen = <FontAwesomeIcon icon={faPenToSquare} className="pt-1" />;
const trash = <FontAwesomeIcon icon={faTrash} className="text-red-500 pt-1" />;
const eye = <FontAwesomeIcon icon={faEye} className="pt-1" />;
const plus = <FontAwesomeIcon icon={faFileCirclePlus} />;

export default function MyPasswords({ data, user }) {
  const router = useRouter();

  // * get length of passwords, use it to render ui based on length
  let passwordsObjectLength = data.length;
  let [passwdIsBlurred, setPasswdIsBlurred] = useState(true);
  let [buttonToolTipMessage, setButtonToolTipMessage] = useState("show");

  const showPassword = (passwdId) => {
    let showCleanPassword = document.getElementById(`passwdID_${passwdId}`);

    if (passwdIsBlurred === true) {
      setPasswdIsBlurred(false);
      showCleanPassword.classList.remove("blur-[7px]", "select-none");
      showCleanPassword.classList.add("blur-0");
      setButtonToolTipMessage("hide");
    } else if (passwdIsBlurred === false) {
      setPasswdIsBlurred(true);
      showCleanPassword.classList.remove("blur-0");
      showCleanPassword.classList.add("blur-[7px]", "select-none");
      setButtonToolTipMessage("show");
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
        <h3 className="text-2xl font-bold py-1">My Passwords</h3>
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
        <NoRecent message="No passwords yet." />
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
                  <Link href="">{website}</Link>
                </p>
                <p
                  className="px-2 blur-[7px] select-none truncate"
                  id={`passwdID_${id}`}
                >
                  {password}
                </p>
                <span className="space-x-4 flex">
                  <div>
                    <ButtonWithTooltip message={buttonToolTipMessage}>
                      <button onClick={() => showPassword(id)}>{eye}</button>
                    </ButtonWithTooltip>
                  </div>

                  <ButtonWithTooltip message="Edit">
                    <button
                      onClick={() => router.push(`/myPasswords/edit/${[id]}`)}
                    >
                      {pen}
                    </button>
                  </ButtonWithTooltip>
                  <ButtonWithTooltip message="Delete">
                    <button
                      onClick={() => {
                        router.push(`/myPasswords/delete/${[id]}`);
                      }}
                    >
                      {trash}
                    </button>
                  </ButtonWithTooltip>
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
// fetch user session from cookies if available, and pass to component
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
