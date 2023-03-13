// * create a new user.
// * user's master password is hashed.

import { createNewUser } from "/models/models";
import { hashPassword } from "../../lib/config/bcryptjs-config";

export default async function addNewUserHandler(req, res) {
  // get data submitted in req body
  const body = req.body; // ? try deconstructing instead, in the future
  // ? example

  if (body.password != body.confirmPassword) {
    return await res.status(400).json({ data: "Passwords do not match!" });
  }

  if (body.password.length < 4) {
    return await res
      .status(400)
      .json({ data: "Password is too short. min (4)." });
  }

  if (
    !body.firstName ||
    !body.username ||
    !body.password ||
    !body.confirmPassword
  ) {
    return await res.status(400).json({ data: "All fields are required." });
  } else {
    //* save to db
    const hashedPassword = hashPassword(body.password);
    createNewUser(body.firstName, body.username, hashedPassword);
    return await res.status(200).json({ data: "Success!" });
  }
}
