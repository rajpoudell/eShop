import { Link } from "react-router-dom";
import { TbListDetails } from "react-icons/tb";

const ProductCard = ({ product }) => {
  return (
    <div className=" bg-slate-200 rounded-md  p-4 relative shadow-md   hover:shadow-md hover:scale-105 transition-transform duration-300 ease-in-out">
      <img
        src={`${process.env.REACT_APP_URL}/uploads/${product.image}`} // Concatenate the base URL with image filename
        alt={product.name}
        className="w-full h-52 object-cover rounded-md mx-auto aspect-square"
      />
      <h2 className="text-lg font-semibold mt-4 text-gray-800 hover:text-blue-600 transition-colors cursor-default">
        {product.name}
      </h2>
      <p className="text-gray-600  cursor-default">Rs.{product.price}</p>
      <Link
        to={`/product/${product._id}`}
        className="bg-blue-500 text-white px-4 py-2 mt-4 inline-flex items-center gap-2 rounded shadow-md hover:bg-blue-600 transition-all duration-200 ease-in-out"
      >
       <TbListDetails />
       View Details
      </Link>
    </div>
  );
};

export default ProductCard;
