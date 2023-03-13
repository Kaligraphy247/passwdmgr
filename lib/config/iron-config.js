export const ironOptions = {
  cookieName: "Password Manager Cookie",
  password: "sgf63534y89a#@tjw80M_93GS3)hh9*/", // * do not post in prod
  // secure: true, //* should be used in production (HTTPS) but can't be used in development (HTTP)
  cookieOptions: {
    secure: process.env.NODE_ENV === "production" ? true : false,
  },
};
