import { Link } from "react-router-dom";

const ProductCard = ({ product }) => {
  return (
    <div className="border rounded-md p-4 shadow-md bg-slate-300 hover:shadow-lg hover:scale-105 transition-transform duration-300 ease-in-out">
      <img
        src={`http://localhost:5000/uploads/${product.image}`} // Concatenate the base URL with image filename
        alt={product.name}
        className="w-4/4 h-36 object-cover rounded-md mx-auto"
      />
      <h2 className="text-lg font-semibold mt-4 text-gray-800 hover:text-blue-600 transition-colors cursor-default">
        {product.name}
      </h2>
      <p className="text-gray-600  cursor-default">${product.price}</p>
      <Link
        to={`/product/${product._id}`}
        className="bg-blue-500 text-white px-4 py-2 mt-4 inline-block rounded shadow-md hover:bg-blue-600 transition-all duration-200 ease-in-out"
      >
        View Details
      </Link>
    </div>
  );
};

export default ProductCard;
