import { useEffect } from "react";
import ProductCard from "../components/ProductCard";
import { useDispatch, useSelector } from "react-redux";
import { getProducts } from "../redux/slices/productSlice";

const Home = () => {
  const dispatch = useDispatch();
  const { products, loading, error } = useSelector((state) => state.products);

  useEffect(() => {
    dispatch(getProducts());
  }, [dispatch]);

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-2xl font-bold text-center mb-6">Latest Products</h1>
      {loading && <p className="text-center">Loading...</p>}
      {error && <p className="text-red-500">{error}</p>}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {products.map((product) => (
          <ProductCard key={product._id} product={product} />
        ))}
      </div>
    </div>
  );
};

export default Home;
