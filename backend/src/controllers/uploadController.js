const asyncHandler = require('../utils/asyncHandler');

const uploadImage = asyncHandler(async (req, res) => {
    if (!req.file) {
        return res.status(400).json({ error: 'No image file provided' });
    }

    const imageUrl = `http://localhost:3000/uploads/${req.file.filename}`;

    res.status(200).json({ 
        message: 'Image uploaded successfully', 
        imageUrl 
    });
});

module.exports = { uploadImage };