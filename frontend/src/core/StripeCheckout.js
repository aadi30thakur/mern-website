import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useRecoilState, useRecoilValue } from "recoil";
import { isAuthenticated } from "../auth/helper";
import Base from "./Base";
import { cartEmpty, loadCart } from "./helper/CartHelper";
import { Products, reloadState } from "../Recoil";
import { getMeToken, processPayment } from "./helper/paymentHelper";
import { createOrder } from "./helper/orderHelper"
import DropIn from "braintree-web-drop-in-react"



const StripeCheckout = () => {
    const [reload, setReload] = useRecoilState(reloadState);
    const [products, setProducts] = useRecoilState(Products);
    //     const [info, setInfo] = useState({
    //         loading: false,
    //         success: false,
    //         clientToken: null,
    //         error: "", instance: {}
    //     })
    //     const { token, user } = isAuthenticated();
    //     const userId = user._id;
    //     const getToken = (userId, token) => {
    //         getMeToken(userId, token).then(info => {
    //             console.log("INFORMATION", info);
    //             if (info.error) {
    //                 setInfo({ ...info, error: info.error })
    //             } else {
    //                 const clientToken = info.clientToken
    //                 setInfo({ clientToken })
    //             }
    //         }).catch();
    //     }
    //     useEffect(() => {
    //         getToken(userId, token)

    //     }, [])


    //     const onPurchase = () => {
    //         setInfo({ loading: true })
    //         let nonce;
    //         let getNonce = info.instance
    //             .requestPaymentMethod()
    //             .then(data => {
    //                 nonce = data.nonce
    //                 const paymentData = {
    //                     paymentMethodNonce: nonce,
    //                     amount: getAmount()
    //                 };

    //                 processPayment(userId, token, paymentData)
    //                     .then(response => {
    //                         setInfo({ ...info, success: response.success, loading: false })
    //                         //todo empty the cart
    //                         //force reload
    //                         const orderData = {
    //                             products: products,
    //                             transaction_id: response.transaction_id,
    //                             amount: response.transaction.amount
    //                         }

    //                         createOrder(userId, token, orderData);

    //                         cartEmpty(() => {

    //                         })

    //                         setReload(!reload);

    //                     })
    //                     .catch(
    //                         error => {
    //                             setInfo({
    //                                 loading: false, success: false
    //                             })
    //                         }
    //                     )

    //             })


    //     }

    //     const getAmount = () => {
    //         let amount = 0
    //         products.map(p => {
    //             amount = amount + p.price
    //         })
    //         return amount;
    //     }
    //     const showbtdropIn = () => {
    //         return (
    //             <div>
    //                 {info.clientToken !== null && products.length > 0 ? (
    //                     <div>
    //                         <DropIn
    //                             options={{ authorization: info.clientToken }}
    //                             onInstance={(instance) => (info.instance = instance)}
    //                         />
    //                         <button className="btn btn-block btn-outline-success" onClick={onPurchase}>Buy</button>
    //                     </div>
    //                 ) : (<h3>Please Login or add some thing to cart</h3>)}
    //             </div>
    //         )
    //     }


    //     return (
    //         <div>
    //             <h3>Yout bill is {getAmount()}</h3>
    //             {showbtdropIn()}
    //         </div>
    //     )
    // }
    const [info, setInfo] = useState({
        loading: false,
        success: false,
        clientToken: null,
        error: "",
        instance: {}
    });

    const userId = isAuthenticated() && isAuthenticated().user._id;
    const token = isAuthenticated() && isAuthenticated().token;

    const getToken = (userId, token) => {
        getMeToken(userId, token).then(info => {
            // console.log("INFORMATION", info);

            const clientToken = info.clientToken;
            setInfo({ clientToken });

        });
    };

    const showbtdropIn = () => {
        return (
            <div>
                {info.clientToken !== null && products.length > 0 ? (
                    <div>
                        <DropIn
                            options={{ authorization: info.clientToken }}
                            onInstance={instance => (info.instance = instance)}
                        />
                        <button className="btn btn-block btn-success" onClick={onPurchase}>
                            Buy
            </button>
                    </div>
                ) : (
                    <h3>Please login or add something to cart</h3>
                )}
            </div>
        );
    };

    useEffect(() => {
        getToken(userId, token);
    }, []);

    const onPurchase = () => {
        setInfo({ loading: true });
        let nonce;
        let getNonce = info.instance.requestPaymentMethod().then(data => {
            nonce = data.nonce;
            const paymentData = {
                paymentMethodNonce: nonce,
                amount: getAmount()
            };
            processPayment(userId, token, paymentData)
                .then(response => {
                    setInfo({ ...info, success: response.success, loading: false });
                    console.log("PAYMENT SUCCESS");
                    //createOrder(userId, token, products);
                    // cartEmpty();
                    setReload(!reload);
                })
                .catch(error => {
                    setInfo({ loading: false, success: false, error: error });
                    console.log("PAYMENT FAILED", error);
                });
        });
    };

    const getAmount = () => {
        let amount = 0;
        products.map(p => {
            amount = amount + p.price;
        });
        return amount;
    };

    return (
        <div>
            <h3>Your bill is {getAmount()} $</h3>
            {showbtdropIn()}
        </div>
    );
};

export default StripeCheckout;
