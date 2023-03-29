// *  edit password based on id

import { updatePassword } from "/models/models";
import { encrypt, KEY } from "../../lib/config/cipher";

export default function updatePasswordHandler(req, res) {
  // get data submitted in req body
  const body = req.body;
  console.log(body);

  if (!body.website || !body.password) {
    return res
      .status(400)
      .json({ data: "Account name, or password not found!" });
  }
  // implicit else
  //* encrypt password before saving to db
  let encryptedPasswd = encrypt(body.password, KEY)

  //* save to db
  updatePassword(body.id, body.website, encryptedPasswd);
  return res.status(200).json({ data: "Saved!" });
}
