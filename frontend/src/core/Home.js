import React, { useState, useEffect } from "react";
import { CardColumns } from "react-bootstrap";
import "../Assets/CSS/Main.css";
import Base from "./Base";
import Card from "./Card";
import { getProducts } from "./helper/coreapicalls";

const Home = () => {
  const [products, setProduct] = useState([]);
  const [error, setError] = useState(false);

  const loadAllProduct = () => {
    getProducts().then((data) => {
      if (data.error) {
        setError(data.error);
      } else {
        setProduct(data);
      }
    });
  };

  useEffect(() => {
    loadAllProduct();
  }, []);

  return (
    <Base title="HOME" description="welcome to the Brand new Tshirt store" >
      <div className="  ">

        <CardColumns>
          {products.map((product, index) => {
            return (
              <div key={index} className="d-flex justify-content-around ">
                <Card product={product} />
              </div>
            );
          })}
        </CardColumns>
      </div>
    </Base>
  );
};
export default Home;
