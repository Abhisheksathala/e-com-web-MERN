import productModel from "../models/ProductModel.js";

const newcollections = async (req, res) => {
  try {
    const products = await productModel
      .find({})
      .sort({ createdAt: -1 })
      .limit(8);
    console.log("newcollection featrched:", products);
    res.status(200).json({ products });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const popularInWomen = async (req, res) => {
  try {
    const category = 'women'; // Assuming you are looking for products in the 'women' category
    const products = await productModel.find({ category }).sort({ /* your sorting criteria */ }).limit(4);

    // Sending the fetched products as the response
    res.status(200).json({
      success: true,
      products
    });
  } catch (error) {
    console.error('Error while fetching products:', error);
    res.status(500).json({
      success: false,
      message: 'Server Error'
    });
  }
};

export default newcollections;
export { popularInWomen };
