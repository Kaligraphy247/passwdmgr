import { useRouter } from "next/router";
import { useRef, useState } from "react";
import Head from "next/head";
import QuickLinks from "../components/quickLinks";
import { AlertInfo } from "/components/alerts";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faRightToBracket } from "@fortawesome/free-solid-svg-icons";
import Link from "next/link";

const login = <FontAwesomeIcon icon={faRightToBracket} className="pt-1" />;

export default function Login() {
  const router = useRouter();
  const [msg, setMsg] = useState();
  const usernameInput = useRef();
  const passwordInput = useRef();

  const handleSubmit = async (event) => {
    event.preventDefault();

    const data = {
      username: usernameInput.current.value,
      password: passwordInput.current.value,
    };

    //* set endpoint
    const endpoint = "/api/sessions";

    //* Form the request for sending data to the server
    const options = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    };
    const response = await fetch(endpoint, options);
    if (response.ok) {
      return router.push("/");
    } else {
      setMsg(
        <AlertInfo message="Your password is probably wrong, please check and try again." />
      );
    }
  };

  //* render page
  return (
    <>
      <Head>
        <title>Login | Password Manager</title>
      </Head>
      <h1 className="text-3xl font-bold text-center mb-2">Login</h1>
      <p>{msg}</p>
      <div className="container">
        <form className="grid" onSubmit={handleSubmit}>
          <label className="font-semibold text-xl">Username</label>
          <input
            className="border-b focus:outline-none mt-1 mb-2 border-[#8f9094] bg-transparent"
            ref={usernameInput}
            required
            placeholder="Can be an email or just a name."
          />
          <label className="font-semibold text-xl">
            Master pin or password
          </label>
          <input
            className="bg-transparent border-b focus:outline-none mt-1 mb-2 border-[#8f9094]"
            ref={passwordInput}
            required
            placeholder="Please choose a pin or password."
          />
          <div className="text-center">
            <button
              className="border mt-3 px-2 py-1 rounded shadow text-lg font-semibold hover:shadow-lg border-[#8f9094]"
              type="submit"
            >
              Login {login}
            </button>
          </div>
        </form>
        <p className="text-xs">
          Don't have an account?{" "}
          <Link href="/createuser" className="text-blue-600 hover:text-red-500">
            Create
          </Link>{" "}
          one now.
        </p>
      </div>
      <QuickLinks />
    </>
  );
}
