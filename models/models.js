const { Sequelize, DataTypes, Model, Op, where } = require("sequelize");

const sequelize = new Sequelize({
  dialect: "sqlite",
  storage: "./data/db.sqlite3",
});

try {
  // await sequelize.authenticate();
  sequelize.authenticate();
  console.log("Connection to database was successful.");
} catch (error) {
  console.log(`Unable to connect to the database: ${error}`);
}

// * User model
class User extends Model {
  getUserInfo() {
    return `User: ${this.firstName} ${this.lastName}`;
  }
  // * instance level password change
  async changeMasterPassword(newMasterPassword) {
    let newPassword = this.update(
      { masterPassword: newMasterPassword },
      { where: { id: this.id } }
    );
    return newPassword;
  }
}
User.init(
  {
    firstName: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: false,
    },
    lastName: {
      type: DataTypes.STRING,
      allowNull: true,
      unique: false,
    },
    masterPassword: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: false,
    },
    // Other model options go here
  },
  {
    sequelize, // pass connection instance
    modelName: "User", // We need to choose the model name
  }
);

// * Password model
class Password extends Model {}

Password.init(
  {
    website: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: false,
    },
  },
  {
    sequelize,
    modelName: "Password",
  }
);

User.hasMany(Password, {
  // foreignKey: "userId",
  onDelete: "CASCADE",
  onUpdate: "CASCADE",
});
Password.belongsTo(User);

const makeSync = async () => {
  await sequelize.sync();
};

//* create new user
async function createNewUser(firstName, lastName, masterPassword) {
  await sequelize.sync();
  try {
    const result = await sequelize.transaction(async (t) => {
      const newUser = await User.create(
        {
          firstName: firstName,
          lastName: lastName,
          masterPassword: masterPassword,
        },
        // pass transaction object
        { transaction: t }
      );

      // optionally return newUser
      return newUser;
    });

    // If the execution reaches this line, the transaction has been committed successfully
    // `result` is whatever was returned from the transaction callback
    return result;
  } catch (error) {
    // If the execution reaches this line, an error occurred.
    // The transaction has already been rolled back automatically by Sequelize!
    console.log("An error occurred: ", error);
  }
}
// * test
// createNewUser("James2", "Bond2", "master-password");
// let james = async () => {
//   let j = await User.findByPk(1);
//   // j = j.toJSON();
//   console.log(await j.changeMasterPassword("master-pass"));
// };
// console.log(james());

async function updateUserInfo(id, firstName, lastName) {
  await sequelize.sync();
  try {
    const result = await sequelize.transaction(async (t) => {
      let user = await User.update(
        { firstName: firstName, lastName: lastName },
        { where: { id: id } },
        { transaction: t }
      );

      return user;
    });

    // If the execution reaches this line, the transaction has been committed successfully
    // `result` is whatever was returned from the transaction callback
    return result;
  } catch (error) {
    // If the execution reaches this line, an error occurred.

    console.log("An error occurred: ", error);
  }
}
//* test
// updateUserInfo(1, "Jamie", "Blond");

async function addNewPassword(userId, website, password) {
  await sequelize.sync();
  try {
    const result = await sequelize.transaction(async (t) => {
      const newPassword = await Password.create(
        {
          UserId: userId,
          website: website,
          password: password,
        },
        // pass transaction object
        { transaction: t }
      );

      // optionally return newPassword
      return newPassword;
    });

    // If the execution reaches this line, the transaction has been committed successfully
    // `result` is whatever was returned from the transaction callback
    return result;
  } catch (error) {
    // If the execution reaches this line, an error occurred.
    // The transaction has already been rolled back automatically by Sequelize!
    console.log("An error occurred: ", error);
  }
}

// * test
// addNewPassword(1, "Dummy", "dummy-password");

async function fetchAllPasswords(id) {
  let tempArray = [];
  // let passwords = await Password.findAll({ where: { userId: id } });
  let allPasswords = [];
  await Password.findAll({ where: { userId: id } }).then((data) =>
    tempArray.push(data)
  );

  for (let i = 0; i < tempArray[0].length; i++) {
    //* convert dataValues.createdAt to `toLocaleString`
    tempArray[0][i].dataValues.createdAt =
      tempArray[0][i].dataValues.createdAt.toLocaleString();

    //* convert dataValues.updatedAt to `toLocaleString`
    tempArray[0][i].dataValues.updatedAt =
      tempArray[0][i].dataValues.updatedAt.toLocaleString();

    //* finally push to main array
    allPasswords.push(tempArray[0][i].dataValues);
  }
  // console.log(allPasswords);
  //* return allPasswords
  return allPasswords;
}

//* fetch only one password
async function fetchOnePassword(id) {
  let password = await Password.findOne({ where: { id: id } });
  // console.log(password.toJSON());
  return password.toJSON();
}

// * How to use fetchOnePasswords
// let passwd = fetchOnePassword(2).then((passwd) => {
//   console.log(passwd);
//   // do something
// });
// console.log(passwd);

async function updatePassword(id, website, password) {
  await sequelize.sync();
  try {
    const result = await sequelize.transaction(async (t) => {
      let newPassword = await Password.update(
        { website: website, password: password },
        { where: { id: id } },
        { transaction: t }
      );

      return newPassword;
    });

    // If the execution reaches this line, the transaction has been committed successfully
    // `result` is whatever was returned from the transaction callback
    return result;
  } catch (error) {
    // If the execution reaches this line, an error occurred.
    console.log("An error occurred: ", error);
  }
}

// *  test
// updatePassword(1, "Facebook", "facebook-password");

async function deletePassword(id) {
  await sequelize.sync();
  try {
    const result = await sequelize.transaction(async (t) => {
      let deletePassword = await Password.destroy(
        { where: { id: id } },
        { transaction: t }
      );

      return deletePassword;
    });

    // If the execution reaches this line, the transaction has been committed successfully
    // `result` is whatever was returned from the transaction callback
    return result;
  } catch (error) {
    // If the execution reaches this line, an error occurred.

    console.log("An error occurred: ", error);
  }
}

// * test
// deletePassword(3);

export { fetchAllPasswords, fetchOnePassword, addNewPassword };
