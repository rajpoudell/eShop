import { useEffect } from "react";
import ProductCard from "../components/ProductCard";
import { useDispatch, useSelector } from "react-redux";
import { getProducts, setCategory } from "../redux/slices/productSlice";

const Home = () => {
  const dispatch = useDispatch();
  const { filteredProduct, categories, selectedCategory, loading, error } =
    useSelector((state) => state.products);

  useEffect(() => {
    dispatch(getProducts());
  }, [dispatch]);

  return (
    <div className="  mx-auto p-6 bg-slate-200">
    

      <h1 className="text-2xl font-bold text-center mb-6">Latest Products</h1>

      {/* Category Filter Dropdown */}
      <div className="flex mb-6">
        <select
          className="p-2 border rounded-md"
          value={selectedCategory}
          onChange={(e) => dispatch(setCategory(e.target.value))}
        >
          {categories.map((category) => (
            <option key={category} value={category}>
              {category}
            </option>
          ))}
        </select>
      </div>

      {loading && <p className="text-center">Loading...</p>}
      {error && <p className="text-red-500">{error}</p>}

      {/* Product Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 px-4 md:px-6 lg:px-8 py-6">
        {filteredProduct.map((product) => (
          <ProductCard key={product._id} product={product} />
        ))}
      </div>

      {/* Featured Products Section */}
      <div className="mt-10">
        <h2 className="text-2xl font-bold text-center mb-6">Featured Products</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {/* Replace with your featured products */}
          {filteredProduct.slice(0, 4).map((product) => (
            <ProductCard key={product._id} product={product} />
          ))}
        </div>
      </div>

      {/* Newsletter Subscription Section */}
      <div className="mt-10 bg-blue-600 text-white p-8 rounded-lg text-center">
        <h2 className="text-2xl font-bold">Subscribe to Our Newsletter</h2>
        <p className="text-lg mt-2">
          Get the latest updates, exclusive offers, and more!
        </p>
        <form className="mt-4 flex justify-center">
          <input
            type="email"
            placeholder="Enter your email"
            className="p-2 rounded-l-md w-64 text-black"
          />
          <button
            type="submit"
            className="bg-white text-blue-600 px-4 py-2 rounded-r-md font-semibold hover:bg-gray-100"
          >
            Subscribe
          </button>
        </form>
      </div>
    </div>
  );
};

export default Home;