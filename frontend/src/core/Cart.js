import React, { useState, useEffect } from "react";
import { CardColumns } from "react-bootstrap";
import Card from "react-bootstrap/Card";
// import "../styles.css";
import Base from "./Base";
import CardIND from "./Card";
import { loadCart } from "./helper/CartHelper";

const Cart = () => {
  const [products, setProducts] = useState([]);
  const [reload, setReload] = useState(false);

  useEffect(() => {
    setProducts(loadCart());
  }, [reload]);
  const loadAllProducts = () => {
    // console.log(products);
    return (
      <>
        <h2>Products availabble in your cart</h2>
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
      <div>{loadAllProducts()}</div>
    </Base>
  );
};
export default Cart;
