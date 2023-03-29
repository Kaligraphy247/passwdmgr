// * This API handles the saves the data sent to it the database

import { addNewPassword } from "/models/models";
import { encrypt, KEY } from "../../lib/config/cipher";

export default function addNewPasswordHandler(req, res) {
  // get data submitted in req body
  const body = req.body;

  if (!body.website || !body.password) {
    return res
      .status(400)
      .json({ data: "Account or password field cannot be empty!" });
  }
  // implicit else
  //* encrypt password before saving to db
  let encryptedPasswd = encrypt(body.password, KEY)
  
  //* save to db
  addNewPassword(body.id, body.website, encryptedPasswd);
  res.status(200).json({ data: "Saved!" });
}
