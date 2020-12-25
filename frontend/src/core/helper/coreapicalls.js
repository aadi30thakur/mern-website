const { API } = require("../../backend");

export const getProducts = () => {
  // console.log(API);
  return fetch(`${API}/products`, { method: "GET" })
    .then((response) => {
      return response.json();
    })
    .catch((err) => console.log(err));
};
