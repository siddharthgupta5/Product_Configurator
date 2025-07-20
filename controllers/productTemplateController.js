const { ProductTemplate } = require('../models');

exports.createProductTemplate = async (req, res) => {
  try {
    const { template_str_id, name, base_price } = req.body;
    const productTemplate = await ProductTemplate.create({
      template_str_id,
      name,
      base_price
    });
    res.status(201).json(productTemplate);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};