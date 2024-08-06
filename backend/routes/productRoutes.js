const express = require('express');
const router = express.Router();
const upload = require('../middleware/upload');
const { addProduct } = require('../controllers/productController');
const auth = require('../middleware/auth');

router.post('/addproduct', auth, upload.array('images'), addProduct);

module.exports = router;
