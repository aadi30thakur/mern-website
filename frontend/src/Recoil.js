import { atom, selector } from "recoil";


export const reloadState = atom({
    key: 'reloadState', // unique ID (with respect to other atoms/selectors)
    default: false, // default value (aka initial value)
});

export const Products = atom({
    key: 'Products', // unique ID (with respect to other atoms/selectors)
    default: [], // default value (aka initial value)
});


// export const charCountState = selector({
//     key: 'charCountState', // unique ID (with respect to other atoms/selectors)
//     get: ({ get }) => {
//         const text = get(reloadState);

//         return text;
//     },
// });