import { RecentlySaved, NoRecent } from "../components/recent";
import SearchBar from "../components/search";
import QuickLinks from "../components/quickLinks";
import { AlertInfo } from "/components/alerts";
import Link from "next/link";
import Head from "next/head";
import { fetchRecentPasswords } from "../models/models";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faFileCirclePlus,
  faMagnifyingGlass,
  faEye,
  faPenToSquare,
  faTrash,
} from "@fortawesome/free-solid-svg-icons";
import ButtonWithTooltip from "../components/buttonWithTooltip";
import { useState } from "react";
import { useRouter } from "next/router";
import { withSessionSsr } from "./lib/config/withSession";

const plus = <FontAwesomeIcon icon={faFileCirclePlus} />;
const search = <FontAwesomeIcon icon={faMagnifyingGlass} />;
const eye = <FontAwesomeIcon icon={faEye} className="pt-1" />;
const pen = <FontAwesomeIcon icon={faPenToSquare} className="pt-1" />;
const trash = <FontAwesomeIcon icon={faTrash} className="pt-1" />;

export default function App({ data, user }) {
  const router = useRouter();
  const [userStatus, setUserStatus] = useState("");

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
      // setShowClipboard(true);
    } else if (passwdIsBlurred === false) {
      setPasswdIsBlurred(true);
      showCleanPassword.classList.remove("blur-0");
      showCleanPassword.classList.add("blur-[7px]", "select-none");
      setButtonToolTipMessage("show");
      // setShowClipboard(false);
    }
  };

  // * render
  return (
    <div>
      <Head>
        <title>Password Manager</title>
      </Head>
      <h1 className="text-3xl font-bold text-center mb-2">
        Welcome, {user.firstName}.
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
      <>{userStatus}</>
      <div>
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
                    <Link href="">{website}</Link>
                  </p>
                  <p
                    className="px-2 blur-[7px] select-none truncate"
                    id={`passwdID_${id}`}
                  >
                    {password}
                  </p>
                  <span className="space-x-4 flex">
                    <ButtonWithTooltip message={buttonToolTipMessage}>
                      <button onClick={() => showPassword(id)}>{eye}</button>
                    </ButtonWithTooltip>
                    <ButtonWithTooltip message="Edit">
                      <button>
                        <Link
                          href={{
                            pathname: "/myPasswords/edit/[id]",
                            query: { id: id },
                          }}
                        >
                          {pen}
                        </Link>
                      </button>
                    </ButtonWithTooltip>
                    <ButtonWithTooltip message="Delete">
                      <button>
                        <Link
                          href={{
                            pathname: "/myPasswords/delete/[id]",
                            query: { id: id },
                          }}
                        >
                          {trash}
                        </Link>
                      </button>
                    </ButtonWithTooltip>
                  </span>
                </li>
              ))}
            </ul>
          </div>
        )}
        <QuickLinks />
      </div>
    </div>
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
  const data = await fetchRecentPasswords(user.id);
  return {
    props: { user, data },
  };
});
