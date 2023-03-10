var bcrypt = require("bcryptjs");
// var passwd = "my-password";

function hashPassword(password) {
  const salt = 10;
  let hash = bcrypt.hashSync(password, salt);
  return hash;
}

// console.log(hashPassword(passwd));

function verifyPassword(providedPassword, passwordHash) {
  let result = false;
  if (bcrypt.compareSync(providedPassword, passwordHash)) {
    result = true;
    return result;
  }
  return result;
}

// let v = verifyPassword(passwd, hashPassword(passwd));
// console.log(v);

export { hashPassword, verifyPassword };
