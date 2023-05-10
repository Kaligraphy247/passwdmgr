<h1 style="font: bold; text-align: center; font-size: 3rem;">Passwdmgr</h1>

# Introduction

Passwordmgr is **self hosted password manager**. Hosting the app is very easy, all you need is Nodejs and a web browser. When you have all requirements ready, go to <a href="#Steps">Steps</a>.

# Requirements

- Familiarity with a terminal/cmd.
- [Nodejs 18+](https://nodejs.org/en/download) (Install if you don't have it installed already)
- Npm 8+ (Usually bundled with Nodejs)
- All other necessary modules are listed in `package.json`. It will be installed when you run `npm i`.

# Steps

- Clone this repository or unzip the accompanying zip file.

  ```bash
  git clone https://github.com/Kaligraphy247/passwdmgr.git
  ```

- After unzipping/cloning, change into directory

  ```bash
  cd passwordmgr
  ```

- Next, install all necessary files, run

  ```bash
  npm i
  ```

- After installation is complete, run next build for an optimized build of the app.

  ```bash
  next build
  ```

- When the build is complete, run next start to start the local server

  ```
  next start
  ```

- Open your browser, go to [http://127.0.0.1:3000](http://127.0.0.1:3000) or [localhost:3000](http://localhost:3000)

- You need a Master account and password to continue, create a new account and password.
  > This account is used to associate passwords with users and also as way to prevent others from viewing your saved passwords.

- Login after you've created your account. Add passwords.

- You can perform actions by clicking on the appropriate icon on the right.

- It is always recommended to logout when you're done. Your session data will be deleted once you close your browser or shutdown your computer, either way is fine.