export const API =
  process.env.NODE_ENV === "production"
    ? "https://yourapp.herokuapp.com/api"
    : process.env.REACT_APP_BACKEND;
