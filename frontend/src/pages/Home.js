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
    <div className="container mx-auto p-6 bg-slate-200">
      <h1 className="text-2xl font-bold text-center mb-6">Latest Products</h1>

      {/* Category Filter Dropdown */}
      <div className="flex  mb-6">
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

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6 px-4 md:px-6 lg:px-8 py-6">
        {filteredProduct.map((product) => (
          <ProductCard key={product._id} product={product} />
        ))}
      </div>
    </div>
  );
};

export default Home;
