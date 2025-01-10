const express = require("express");
const router = express.Router();
const upload  = require("../middleware/multer")
const { getProducts, addProduct, getProductById,paymentCheckOut, orderCreated, OrderLists, getCategories } = require("../controller/productController");


router.post("/addproduct",upload.single('image'), addProduct);
router.post("/checkout", paymentCheckOut);
router.post("/orderCreated", orderCreated);

router.get("/products", getProducts);
router.get("/product/:id", getProductById);
router.get("/orderLists", OrderLists);
router.get("/categories", getCategories);


module.exports = router;
