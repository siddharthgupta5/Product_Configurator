const { ProductTemplate, OptionCategory } = require('../models');

exports.createOptionCategory = async (req, res) => {
  try {
    const { template_str_id } = req.params;
    const { category_str_id, name } = req.body;

    // Verify template exists
    const template = await ProductTemplate.findOne({ where: { template_str_id } });
    if (!template) {
      return res.status(404).json({ error: 'Product template not found' });
    }

    const optionCategory = await OptionCategory.create({
      category_str_id,
      name,
      template_str_id
    });

    res.status(201).json(optionCategory);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};