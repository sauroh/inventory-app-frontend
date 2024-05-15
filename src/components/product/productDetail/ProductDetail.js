import React, { useEffect } from 'react';
import useRedirectLoggedOutUser from '../../../customHook/useRedirectLoggedOutUser';
import { useDispatch, useSelector } from 'react-redux';
import "./ProductDetail.scss";
import { useParams } from 'react-router-dom';
import { selectIsLoggedIn } from '../../../redux/features/auth/authSlice';
import { getProduct } from '../../../redux/features/product/productSlice';
import Card from '../../card/Card';
//import { SpinnerImg } from '../../loader/Loader';
import DOMPurify from "dompurify";

const ProductDetail = () => {
  useRedirectLoggedOutUser("/login");
  const dispatch = useDispatch();

  const {id} = useParams();

  const isLoggedIn = useSelector(selectIsLoggedIn)

  const {product, isError, message} = useSelector((state) => state.product);

  const stockStatus = (quantity) => {
    if (quantity > 0) {
      return <span className="--color-success">In Stock</span>;
    }
    return <span className="--color-danger">Out Of Stock</span>;
  };

  useEffect(() => {
    if(isLoggedIn === true) {
      dispatch(getProduct(id))
      console.log(product);
    }

    if (isError) {
      console.log(message);
    }
  },[isLoggedIn, isError, message, dispatch, id, product /* products */])

  return <div className="product-detail">
    <h3 className="--mt">Product Detail</h3> 
    <p>{id}</p>
    <Card cardClass="card">
    
    {product && (
      <div className="detail">
        <Card cardClass="group">
              {product?.image ? (
                <img
                  src={product.image.filePath}
                  alt={product.image.fileName}
                />
              ) : (
                <p>No image set for this product</p>
              )}
        </Card>
        <h4>Product Availability: {stockStatus(product.quantity)}</h4>
        <hr />
        <h4>
          <span className="badge">Name: </span> &nbsp; {product.name}
        </h4>
        <p>
          <b>&rarr; SKU : </b> {product.sku}
        </p>
        <p>
          <b>&rarr; Category : </b> {product.category}
        </p>
        <p>
          <b>&rarr; Price : </b> {"$"}
          {product.price}
        </p>
        <p>
          <b>&rarr; Quantity in stock : </b> {product.quantity}
        </p>
        <p>
          <b>&rarr; Total Value in stock : </b> {"$"}
          {product.price * product.quantity}
        </p>
        <hr />
        <div dangerouslySetInnerHTML={{
            __html: DOMPurify.sanitize(product.description),
          }} ></div>
          
        <hr />
        <code className="--color-dark">
          Created on: {product.created_at.toLocaleString("en-US")}
        </code>
        <br />
        <code className="--color-dark">
          Last Updated: {product.updated_at.toLocaleString("en-US")}
        </code>
      </div>
    )}
    </Card>

    
    </div>
  
}

export default ProductDetail