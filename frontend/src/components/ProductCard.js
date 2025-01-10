import { Link } from "react-router-dom";

const ProductCard = ({ product }) => {
  return (
    <div className="border rounded-lg p-4 shadow-2xl">
      <img
        src={`${
           "http://localhost:5000"
        }/uploads/${product.image}`} // Concatenate the base URL with image filename
        alt={product.name}
        className="w-3/4  h-40 object-fill rounded"
      />
      <h2 className="text-lg font-semibold mt-2">{product.name}</h2>
      <p className="text-gray-600">${product.price}</p>
      <Link
        to={`/product/${product._id}`}
        className="bg-blue-500 text-white px-4 py-2 mt-2 inline-block rounded"
      >
        View Details
      </Link>
    </div>
  );
};

export default ProductCard;
