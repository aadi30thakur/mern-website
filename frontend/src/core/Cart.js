import React, { useState, useEffect } from "react";
import { CardColumns } from "react-bootstrap";
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
    return (
      <>
        {products ? (
          <>
            <h4>Products availabble in your cart</h4>
            <div className="text-center">
              <CardColumns>
                {products.map((product, index) => {
                  return (
                    <div key={index} className="d-flex justify-content-around">
                      <CardIND
                        product={product}
                        addToCart={false}
                        removeFromCart={true}
                        setReload={setReload}
                        reload={reload}
                      />
                    </div>
                  );
                })}
              </CardColumns>
            </div>
          </>
        ) : (
          <h4>No products in your cart</h4>
        )}
      </>
    );
  };
  return (
    <Base title="Cart page" description="Ready to checkout">
      <div>{loadAllProducts()}</div>
    </Base>
  );
};
export default Cart;
