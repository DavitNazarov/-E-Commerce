import { useGetTopProductsQuery } from "../redux/api/productApiSlice";
import { RingLoader } from "react-spinners";
import SmallProduct from "../pages/products/SmallProduct";
import ProductCarusel from "../pages/products/ProductCarusel";

const Header = () => {
  const { data, isLoading, error } = useGetTopProductsQuery();

  if (isLoading) {
    return (
      <div className="flex justify-center">
        <RingLoader />
      </div>
    );
  }
  if (error) {
    return <h1>Error</h1>;
  }
  return (
    <>
      <div className="flex justify-around">
        <div className="xl:block lg:hidden md:hidden sm:hidden">
          <div className="grid grid-cols-2">
            {data.map((product) => (
              <div key={product._id}>
                <SmallProduct product={product} />
              </div>
            ))}
          </div>
        </div>
        <ProductCarusel />
      </div>
    </>
  );
};
export default Header;
