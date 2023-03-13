import { useState } from "react";
import Link from "next/link";
import Head from "next/head";
import QuickLinks from "../components/quickLinks";
import React from "react";
import { NoRecent } from "../components/recent";
import ButtonWithTooltip from "../components/buttonWithTooltip";
import { useRouter } from "next/router";
import { withSessionSsr } from "./lib/config/withSession";
import { searchForPassword } from "../models/models";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faTrash,
  faPenToSquare,
  faEye,
} from "@fortawesome/free-solid-svg-icons";

const pen = <FontAwesomeIcon icon={faPenToSquare} className="pt-1" />;
const trash = <FontAwesomeIcon icon={faTrash} className="text-red-500 pt-1" />;
const eye = <FontAwesomeIcon icon={faEye} className="pt-1" />;

export default function Settings({ data }) {
  const router = useRouter();
  const { q } = router.query;

  // * get length of passwords, use it to render ui based on length
  let searchResultLength = data.length;
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

  // * render
  return (
    <>
      <Head>
        <title>Search results for '{q}' | Password Manager</title>
      </Head>
      <h1 className="text-3xl font-bold text-center mb-2">Search Results</h1>
      <h3 className="text-2xl font-bold py-1">
        Search for "
        <span className="py-0.5 px-1 bg-blue-100 rounded font-mono font-medium">
          {q}
        </span>
        "
      </h3>
      {searchResultLength === 0 ? (
        <NoRecent message={`Oops! No record was found.`} />
      ) : (
        <div className="container overflow-auto max-h-[480px]">
          <ul>
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

export const getServerSideProps = withSessionSsr(async ({ req, query }) => {
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
  const data = await searchForPassword(user.id, query.q);
  return {
    props: { user, data },
  };
});
