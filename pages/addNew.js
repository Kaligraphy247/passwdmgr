//*
import QuickLinks from "../components/quickLinks";

export default function AddNewPassword() {
  return (
    <>
      <h1 className="text-3xl font-bold text-center mb-2">Add New Password</h1>
      <h3 className="text-2xl font-bold py-1">Securely store your password</h3>
      <div className="container">
        <form className="grid">
          <label className="text-lg pl-1 font-medium">Account</label>
          <input
            className="bg-inherit border outline-none rounded p-1 focus:outline-1 focus:outline-blue-200 focus:border-none"
            placeholder="e.g. Facebook, Reddit, Gmail e.t.c."
          ></input>
          <label className="text-lg pl-1 font-medium">Password</label>
          <input
            className="bg-inherit border outline-none rounded p-1 focus:outline-1 focus:outline-blue-200 focus:border-none"
            placeholder="Your password in plain text. Don't worry it will be encrypted."
          ></input>
          <div className="mt-3 text-center">
            <button className="border rounded px-2 py-1 text-lg font-medium shadow hover:shadow-md">
              Save
            </button>
          </div>
        </form>
      </div>
      <QuickLinks />
    </>
  );
}
