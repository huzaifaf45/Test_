const Product = require('../models/product');
const cloudinary = require('../config/cloudinary');

exports.addProduct = async (req, res) => {
    try {
        const { name, price, quantity } = req.body;
        const imageFiles = req.files;

        const imageUploadPromises = imageFiles.map(file => 
            cloudinary.uploader.upload(file.path)
        );
        const uploadedImages = await Promise.all(imageUploadPromises);

        const imageUrls = uploadedImages.map(result => result.secure_url);


        const product = new Product({
            name,
            price,
            quantity,
            images: imageUrls,
            user: req.user._id
        });

        await product.save();
        res.status(201).json({ message: 'Product added successfully', product });
    } catch (err) {
        res.status(500).json({ message: 'Server error' });
    }
};
