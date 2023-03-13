<h1 style="font: bold; text-align: center; font-size: 3rem;">Passwdmgr</h1>

# Introduction

Passwordmgr is **self hosted password manager**. Hosting the app is very easy, all you need is Nodejs and a web browser. When you have all requirements ready, go to <a href="#Steps">Steps</a>.

# Requirements

- Familiarity with a terminal/cmd.
- Nodejs 18+. (Install if you don't have it installed already)
- Npm 8+ (Usually bundled with nodejs)
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

- You need a Master account and password to continue, create a new account and password. This account is used to associate passwords with users and also as way to prevent others from viewing your saved passwords.
- Login after you've created your account. Add passwords.

# Software Architecture

Seeing as this a web app, the architecture at its roots, is an MVC (Model-View -Controller). The backend framework uses Nextjs, while following this architecture takes it one step further by viewing files in project folder "**Pages**" as routes. Other files in the project subfolder are treated as routes while files containing "**[]**" are treated as dynamic routes. All files in the subfolder "**pages/api**" are treated as api routes. Each page/route does one particular thing, even though it can handle much more. This makes it easy to maintain and fix bugs. Testing is also easier.
The frontend is done with React. Nextjs uses React for it's frontend. React makes it easy to write web component which can be viewed as independent sections of a webpage. This web components can be reused at anytime. React is written with `JSX` which is an extension of HTML using JavaScript.
