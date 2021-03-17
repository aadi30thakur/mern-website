import React, { useState, useEffect } from "react";
import { CardColumns } from "react-bootstrap";
import Card from "react-bootstrap/Card";
import { Link } from "react-router-dom";
import { useRecoilState } from "recoil";
import { reloadState, Products } from "../Recoil";
// import "../styles.css";
import Base from "./Base";
import CardIND from "./Card";
import { loadCart } from "./helper/CartHelper";


const Cart = () => {
  const [products, setProducts] = useRecoilState(Products);
  const [reload, setReload] = useRecoilState(reloadState);
  // const [product, set] = useRecoilState(reloadState);

  useEffect(() => {
    setProducts(loadCart());
  }, [reload]);

  const loadAllProducts = (products) => {
    // console.log(products);
    return (
      <>
        <h2>Products available in your cart</h2>
        <button >
          <Link to="/Checkout">Checkout</Link>
        </button>
        <div className='text-center'>
          <CardColumns>
            {products.map((product, index) => {
              return (
                <div key={index} className="col-2 mb-4">
                  <CardIND
                    product={product}
                    addToCart={false}
                    removeFromCart={true}
                    setReload={setReload}
                    reload={reload}
                  />
                </div>)
            }

            )}
          </CardColumns>
        </div>
      </>
    );
  };

  const loadCheckout = () => {
    return (
      <div>
        <h2>this section for checkout</h2>
      </div>
    );
  };

  return (
    <Base title="Cart page" description="Ready to checkout">
      {/* <div className="row text-center">
        <div className="col-6">{loadCheckout()}</div>
      </div> */}
      <div>{products !== undefined ? loadAllProducts(products) : (<h3>No Products  in cart</h3>)}</div>
    </Base>
  );
};
export default Cart;
