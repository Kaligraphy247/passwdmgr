import { createNewUser } from "/models/models";
export default async function addNewUserHandler(req, res) {
  // get data submitted in req body
  const body = req.body; //? try deconstructing instead, in the future
  // ? example
  // const { firstName, username, password, confirmPassword } = req.body;

  if (body.password != body.confirmPassword) {
    return await res.status(400).json({ data: "Passwords do not match!" });
  }

  if (body.password.length < 4) {
    return await res
      .status(400)
      .json({ data: "Passwords are too short. min (4)." });
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
    createNewUser(body.firstName, body.username, body.password);
    return await res.status(200).json({ data: "Success!" });
  }
}
