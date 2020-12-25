export const API =
  process.env.NODE_ENV === "production"
    ? "https://tees-store.herokuapp.com/api"
    : process.env.REACT_APP_BACKEND;
