export const API =
  process.env.REACT_APP_BACKEND === "production"
    ? "https://tees-store.herokuapp.com/api"
    : "http://localhost:8000/api";
