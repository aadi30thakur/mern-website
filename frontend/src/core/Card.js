import React, { useState, useEffect } from "react";
import ImageHelper from "./helper/ImageHelper";
import { Redirect, Link } from "react-router-dom";
import { addItemToCart, removeItemFromCart } from "./helper/CartHelper";
import '../Assets/CSS/card.css'

import Card from 'react-bootstrap/Card'
import Button from 'react-bootstrap/Button'


const CardIND = ({
  product,
  addToCart = true,
  removeFromCart = false,
  setReload = (f) => f,
  // function(f){return f}
  reload = undefined,
}) => {
  // const [count, setCount] = useState(product);
  const [redirect, setRedirect] = useState(false);
  // const [addtoCart, setAddtoCart] = useState(false)
  const addtoCart = () => {
    addItemToCart(product, () => setRedirect(true));
  };

  const getAredirect = (redirect) => {
    if (redirect) {
      return <Redirect to="/cart" />;
    }
  };
  const show_alert = () => {


  }
  const cardTitle = product ? product.name : "a photoo from pexels";
  const cardDescription = product
    ? product.discription
    : "a photoo from pexels";
  const cardPrice = product ? product.price : "a photoo from pexels";

  const ShowAddToCart = (addToCart) => {
    return (
      addToCart && (
        <div className="col-12">
          <button
            onClick={addtoCart}
            className="btn btn-outline-success mt-2 mb-2"
          >
            Add to Cart
          </button>
        </div>
      )
    );
  };

  const ShowRemoveFromCart = (removeFromCart) => {
    return (
      removeFromCart && (
        <div className="col-12">
          <button
            onClick={() => {
              removeItemFromCart(product._id);
              setReload(!reload);
            }}
            className="btn btn-block btn-outline-danger mt-2 mb-2"
          >
            Remove from cart
          </button>
        </div>
      )
    );
  };
  return (
    <>
      {/* <div className="card border border-info " id="card">
        <div className="card-header ">{cardTitle}</div>
        <div className="card-body">
          <ImageHelper product={product} />
          <p className="bg-success font-weight-normal text-wrap">
            {cardDescription}
            {getAredirect(redirect)}
          </p>
          <p className="btn btn-success rounded  btn-sm px-4"> ${cardPrice}</p>
          <div className="row">
            {ShowAddToCart(addToCart)}
            {ShowRemoveFromCart(removeFromCart)}
          </div>
        </div>
      </div> */}
      < >
        <Card style={{ width: "18rem" }}>
          <ImageHelper product={product} />
          {getAredirect(redirect)}
          <Card.Body>
            <Card.Title>{cardTitle}</Card.Title>
            <Card.Text>
              {cardDescription}
            </Card.Text>
            <Card.Text>
              Price : ${cardPrice}
            </Card.Text>

            {ShowAddToCart(addToCart)}
            {ShowRemoveFromCart(removeFromCart)}
          </Card.Body>
        </Card>
      </>
    </>
  );
};

export default CardIND;
