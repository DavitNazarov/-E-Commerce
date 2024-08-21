import { Link } from "react-router-dom";

const Product = ({ product }) => {
  return (
    <div className="w-[30rem] ml-[2rem] p-3 relative">
      <div className="relative">
        <img
          src={product.image}
          alt={product.name}
          className="w-[23rem] rounded aspect-square object-cover"
        />
      </div>
    </div>
  );
};

export default Product;
