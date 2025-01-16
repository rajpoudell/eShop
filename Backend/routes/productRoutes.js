const express = require("express");
const router = express.Router();
const upload  = require("../middleware/multer")
const {protect ,admin} = require("../middleware/authMiddleware")
const { getProducts, addProduct, getProductById,paymentCheckOut, orderCreated, OrderLists, getCategories } = require("../controller/productController");


router.post("/checkout", paymentCheckOut);
router.post("/orderCreated", orderCreated);

router.get("/products", getProducts);
router.get("/product/:id", getProductById);
router.get("/categories", getCategories);

router.post("/addproduct",protect ,admin, upload.single('image'), addProduct);

router.get("/orderLists",protect ,admin, OrderLists);


module.exports = router;
