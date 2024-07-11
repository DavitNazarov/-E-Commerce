import asyncHandler from "../middlewares/asyncHandler.js";
import Product from "../models/productModel.js";

const addProduct = asyncHandler(async (req, res) => {
  try {
    // add product in swith case is errors to fill out all required fields. if all required fields are filled out then add product.
    const { name, description, price, category, quantity, brand } = req.fields;
    switch (true) {
      case !name:
        return res.json({ error: "Name not provided, please provide a name." });
      case !description:
        return res.json({
          error: "Description not provided, please provide a description.",
        });
      case !price:
        return res.json({
          error: "Price not provided, please provide a price.",
        });
      case !category:
        return res.json({
          error: "Category not provided, please provide a category.",
        });
      case !quantity:
        return res.json({
          error: "Quantity not provided, please provide a  quantity.",
        });
      case !brand:
        return res.json({
          error: "Brand not provided, please provide a brand.",
        });
    }
    const product = new Product({ ...req.fields }); // create product
    await product.save(); //save product
    res.json(product); //show product
  } catch (error) {
    console.error(error);
    res.status(400).json(error.message);
  }
});

const updateProduct = asyncHandler(async (req, res) => {
  try {
    // update product
    const { name, description, price, category, quantity, brand } = req.fields;
    switch (true) {
      case !name:
        return res.json({ error: "Name not provided, please provide a name." });
      case !description:
        return res.json({
          error: "Description not provided, please provide a description.",
        });
      case !price:
        return res.json({
          error: "Price not provided, please provide a price.",
        });
      case !category:
        return res.json({
          error: "Category not provided, please provide a category.",
        });
      case !quantity:
        return res.json({
          error: "Quantity not provided, please provide a  quantity.",
        });
      case !brand:
        return res.json({
          error: "Brand not provided, please provide a brand.",
        });
    }

    const product = await Product.findByIdAndUpdate(
      req.params.id,
      { ...req.fields },
      { new: true }
    ); // couse in  route L13 i need id
    await product.save();
    res.json(product);
  } catch (error) {
    console.error(error);
    res.status(400).json(error.message);
  }
});

const deleteProduct = asyncHandler(async (req, res) => {
  try {
    const product = await Product.findByIdAndDelete(req.params.id);
    res.json(product);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Server error" });
  }
});

const fetchProducts = asyncHandler(async (req, res) => {
  try {
    // fetch products and in one page will be 6 products
    const pageSize = 6;
    const keyword = req.query.keyword
      ? { name: { $regex: req.query.keyword, $options: "i" } }
      : {};
    const count = await Product.countDocuments({ ...keyword });
    const products = await Product.find({ ...keyword }).limit(pageSize);
    res.json({
      products,
      page: 1,
      pages: Math.ceil(count / pageSize),
      hasMore: false,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Server error" });
  }
});

const fetchProductById = asyncHandler(async (req, res) => {
  try {
    // get product by id, if it exists show the product
    const product = await Product.findById(req.params.id);

    if (product) {
      return res.json(product);
    } else {
      res.status(404);
      throw new Error("Product not found");
    }
  } catch (error) {
    console.error(error);
    res.status(404).json({ error: "Product Not Found" });
  }
});

const fetchAllProducts = asyncHandler(async (req, res) => {
  try {
    // get all products
    const products = await Product.find({})
      .populate("category")
      .limit(12)
      .sort({ createAt: -1 });
    res.json(products);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Server Error" });
  }
});

const addProductReview = asyncHandler(async (req, res) => {
  try {
    // get rating & comment from the user & specific product
    const { rating, comment } = req.body;
    const product = await Product.findById(req.params.id);

    if (product) {
      // if user already reviewed i am sending err -//!Product already reviewed
      const alreadyReviewed = product.reviews.find(
        (r) => r.user.toString() === req.user._id.toString()
      );

      if (alreadyReviewed) {
        res.status(400);
        throw new Error("Product already reviewed");
      }
      // if not i am geting here user id , rating, comment & user name
      const review = {
        name: req.user.username,
        rating: Number(rating),
        comment,
        user: req.user._id,
      };

      // update reviews here
      product.reviews.push(review);
      product.numReviews = product.reviews.length;
      // incrise & decrise rating
      product.rating =
        product.reviews.reduce((acc, item) => item.rating + acc, 0) /
        product.reviews.length;
      //save product
      await product.save();
      res.status(201).json({ message: "REVIEW is successfully added." });
    } else {
      res.status(404).json({ message: "Product not found." });
    }
  } catch (error) {
    console.error(error);
    res.status(400).json(error.message);
  }
});
const fetchTopProducts = asyncHandler(async (req, res) => {
  try {
    const products = await Product.find({}).sort({ rating: -1 }).limit(4);
    res.json(products);
  } catch (error) {
    console.error(error);
    res.status(400).json(error.message);
  }
});

const fetchNewproduct = asyncHandler(async (req, res) => {
  try {
    const products = await Product.find().sort({ _id: -1 }).limit(5);
    res.json(products);
  } catch (error) {
    console.error(error);
    res.status(400).json(error.message);
  }
});

export {
  addProduct,
  updateProduct,
  deleteProduct,
  fetchProducts,
  fetchProductById,
  fetchAllProducts,
  addProductReview,
  fetchTopProducts,
  fetchNewproduct,
};
