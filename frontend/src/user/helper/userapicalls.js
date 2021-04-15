//user/:userId (get)

import { API } from "../../backend"

//user/:userId(post)
export const updateUser = (user, token) => {
    // console.log(user, `${API}/userupdate/${user.id}`);
    return fetch(`${API}/user/${user.id}`, {
        method: "PUT",
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(user)
    }).then((res) => {
        // console.log(res.json());
        return res.json();
    }).catch(e => { console.log(e); })
}

export const getUser = (user, token) => {
    return fetch(`${API}/user/${user._id}`, {
        method: "GET",
        headers: {
            Accept: "application/json",
            Authorization: `Bearer ${token}`,
        }
    }).then((res) => {
        return res.json();

    }).catch(e => { console.log(e); })
}