const Product = require("../models/product");
const ErrorHandler = require("../utils/errorHandler");
const cacheAsyncErrors = require("../middlewares/catchAsyncErrors");
const APIFeatures = require("../utils/apiFeatures");

// create new product => /api/items (POST)
exports.newProduct = cacheAsyncErrors(async (req, res, next) => {
  const product = await Product.create(req.body);
  res.status(201).json({
    success: true,
    product,
  });
});

//get all products => /api/items?keyword=apple (GET)
exports.getProducts = cacheAsyncErrors(async (req, res, next) => {
  const resPerPage = 4;
  const productCount = await Product.countDocuments();

  const APIFeature = new APIFeatures(Product.find(), req.query)
    .search()
    .filter()
    .pagination(resPerPage);

  const products = await APIFeature.query;

  res.status(200).json({
    success: true,
    count: products.length,
    products,
    productCount,
  });
});
//get single product => /api/items/:id (GET)
exports.getSingleProduct = cacheAsyncErrors(async (req, res, next) => {
  const product = await Product.findById(req.params.id);

  if (!product) {
    return next(new ErrorHandler("product not found", 404));
  }

  res.status(200).json({
    success: true,
    product,
  });
});

//update product => /api/items/:id (PUT)
exports.updateProduct = cacheAsyncErrors(async (req, res, next) => {
  let product = await Product.findById(req.params.id);

  if (!product) {
    return next(new ErrorHandler("product not found", 404));
  }

  product = await Product.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
    useFindAndModify: false,
  });

  res.status(200).json({
    success: true,
    product,
  });
});

//delete product => /api/items/:id (DELETE)
exports.deleteProduct = cacheAsyncErrors(async (req, res, next) => {
  const product = await Product.findById(req.params.id);

  if (!product) {
    return next(new ErrorHandler("product not found", 404));
  }

  await product.remove();

  res.status(200).json({
    success: true,
    mesasge: "Product is deleted",
  });
});
