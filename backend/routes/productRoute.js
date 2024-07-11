import express from "express";
import formidable from "express-formidable";

const router = express.Router();

// controllers
import {
  addProduct,
  updateProduct,
  deleteProduct,
  fetchProducts,
  fetchProductById,
  fetchAllProducts,
  addProductReview,
  fetchTopProducts,
  fetchNewproduct,
} from "../controllers/productController.js";

import { authentication, admin } from "../middlewares/authMidleware.js";
import checkId from "../middlewares/checkId.js";

// adding product
router
  .route("/")
  .get(fetchProducts)
  //   admin
  .post(authentication, admin, formidable(), addProduct);

router.route("/allproducts").get(fetchAllProducts);
// reviews
router
  .route("/:id/reviews")
  .post(authentication, admin, checkId, addProductReview);
// top products from highest  rating to lowest rating
router.get("/top", fetchTopProducts);
// new products
router.get("/new", fetchNewproduct);

// update & delete products & dinamic single product pages
router
  .route("/:id")
  .get(fetchProductById)
  //   admin
  .put(authentication, admin, formidable(), updateProduct)
  .delete(authentication, admin, formidable(), deleteProduct);
export default router;
