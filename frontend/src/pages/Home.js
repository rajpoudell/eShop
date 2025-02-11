import { useEffect } from "react";
import ProductCard from "../components/ProductCard";
import { useDispatch, useSelector } from "react-redux";
import { getProducts, setCategory } from "../redux/slices/productSlice";
import { Link } from "react-router-dom";

const Home = () => {
  const dispatch = useDispatch();
  const { filteredProduct, categories } =
    useSelector((state) => state.products);

  useEffect(() => {
    dispatch(getProducts());
  }, [dispatch]);

  return (
    <div className=" mx-auto p-6 bg-slate-100">
      {/* Hero Banner Carousel */}
      <div className="mb-6">
        <div className="bg-blue-500 text-white p-8 rounded-lg text-center">
          <h2 className="text-3xl font-bold">Welcome to Our Store!</h2>
          <p className="text-lg mt-2">
            Discover amazing deals and shop the latest trends.
          </p>
          <Link to={"/products"}>
          <button className="mt-4 bg-white text-blue-600 px-6 py-2 rounded-md font-semibold hover:bg-gray-100">
            Shop Now
          </button>
          </Link>
        </div>
      </div>

      {/* Category Navigation */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4 mb-6">
        {categories.map((category) => (
          <div
            key={category}
            className="bg-white p-4 rounded-lg shadow-md text-center cursor-pointer hover:shadow-lg"
            onClick={() => dispatch(setCategory(category))}
          >
            <p className="font-semibold">{category}</p>
          </div>
        ))}
      </div>

      {/* Flash Sale Section */}
      <div className="bg-red-600 text-white p-6 rounded-lg mb-6">
        <div className="flex justify-between items-center">
          <h2 className="text-2xl font-bold">Flash Sale</h2>
          <div className="flex items-center space-x-2">
            <span className="text-lg">Ends in:</span>
            <span className="bg-white text-red-600 px-2 py-1 rounded-md font-bold">
              02:15:33
            </span>
          </div>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4 mt-4">
          {filteredProduct.slice(0, 6).map((product) => (
            <ProductCard
              key={product._id}
              product={product}
            />
          ))}
        </div>
      </div>

      {/* Featured Products Section */}
      <div className="mb-6">
        <h2 className="text-2xl font-bold mb-4">Featured Products</h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
          {filteredProduct.slice(6, 12).map((product) => (
            <ProductCard key={product._id} product={product} />
          ))}
        </div>
      </div>

      {/* Top Brands Section */}
      <div className="mb-6">
        <h2 className="text-2xl font-bold mb-4">Top Brands</h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
          {[
            "Apple",
            "Samsung",
            "Pixel",
            "Adidas",
            "Gucci",
            "Ultima",
            "meeccha",
          ].map((brand) => (
            <div
              key={brand}
              className="bg-white p-4 rounded-lg shadow-md text-center hover:shadow-lg"
            >
              <p className="font-semibold">{brand}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Newsletter Subscription Section */}
      <div className="bg-blue-600 text-white p-8 rounded-lg text-center">
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
