var bcrypt = require("bcryptjs");

function hashPassword(password) {
  const salt = 10;
  let hash = bcrypt.hashSync(password, salt);
  return hash;
}
function verifyPassword(providedPassword, passwordHash) {
  let result = false;
  if (bcrypt.compareSync(providedPassword, passwordHash)) {
    result = true;
    return result;
  }
  return result;
}

export { hashPassword, verifyPassword };
