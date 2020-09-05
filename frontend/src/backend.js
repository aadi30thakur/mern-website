if (process.env.NODE_ENV === "production") {
  export const API = "https://tees-store.herokuapp.com/api";
} else {
  export const API = process.env.REACT_APP_BACKEND;
}
