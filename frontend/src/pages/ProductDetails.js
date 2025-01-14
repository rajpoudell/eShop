import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import { useDispatch, useSelector } from "react-redux";
import { addToCart } from "../redux/slices/cartSlice";
import { getProducts } from "../redux/slices/productSlice";
import toast from "react-hot-toast";

const API_URL = process.env.REACT_APP_URL;

const ProductDetails = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  //all products
  const { products } = useSelector((state) => state.products);

  const [product, setProduct] = useState(null);

  useEffect(() => {
    if (!products.length) {
      dispatch(getProducts());
    } else {
      setProduct(products.find((p) => p._id === id));
    }
  }, [dispatch, products, id]);

  if (!product) {
    return <div>Loading...</div>;
  }
  return (
    <section className="text-gray-600 overflow-hidden bg-slate-200">
      <div className="container px-5 py-24 mx-auto">
        <div className="lg:w-4/5 mx-auto flex flex-wrap">
          <img
            alt="ecommerce"
            className="lg:w-1/2 w-full lg:h-auto h-50 aspect-square object-cover object-center rounded bg-slate-100"
            src={`${API_URL}/uploads/${product.image}`} // Concatenate the base URL with image filename
          />
          <div className="lg:w-1/2 w-full lg:pl-10 lg:py-6 mt-6 lg:mt-0">
            <h2 className="text-sm title-font text-gray-500 tracking-widest">
              {product.category}
            </h2>
            <h1 className="text-gray-900 text-3xl title-font font-medium mb-1">
              {product.name}
            </h1>
            <div className="flex mb-4">
              <span className="flex items-center">
                {/* Add your rating logic here */}
                <svg
                  fill="currentColor"
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  className="w-4 h-4 text-indigo-500"
                  viewBox="0 0 24 24"
                >
                  <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"></path>
                </svg>
                {/* Repeat for the rest of the stars */}
                <span className="text-gray-600 ml-3">4 Reviews</span>
              </span>
            </div>
            <p className="leading-relaxed">{product.description}</p>

            <div className="flex">
              <span className="title-font font-medium text-2xl text-gray-900">
                ${product.price}
              </span>
            </div>
            <div className="flex gap-5 mt-8">
              <button
                onClick={() => {dispatch(addToCart(product));
                  toast.success('Add Product!');
                }}
                className="flex  text-white bg-indigo-500 border-0 py-2 px-6 focus:outline-none hover:bg-indigo-600 rounded"
              >
                Add to Cart
              </button>
              <button className="flex  text-white bg-indigo-500 border-0 py-2 px-6 focus:outline-none hover:bg-indigo-600 rounded">
                Buy Now !
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProductDetails;
