const express = require("express");
const router = express.Router();

const {
  getProducts,
  newProduct,
  getSingleProduct,
  updateProduct,
  deleteProduct,
} = require("../controllers/productController");

router.route("/items").get(getProducts);
router.route("/items/:id").get(getSingleProduct);

router.route("/items/:id").put(updateProduct);
router.route("/items/:id").delete(deleteProduct);

router.route("/items").post(newProduct);

module.exports = router;
