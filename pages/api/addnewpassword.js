import { addNewPassword } from "/models/models";
export default function addNewPasswordHandler(req, res) {
  // get data submitted in req body
  const body = req.body;

  if (!body.website || !body.password) {
    return res
      .status(400)
      .json({ data: "Account name, or password not found!" });
  }
  // implicit else
  //* save to db
  addNewPassword(1, body.website, body.password);
  res.status(200).json({ data: "Saved!" });
}
