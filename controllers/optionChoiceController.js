const { OptionCategory, OptionChoice } = require('../models');

exports.createOptionChoice = async (req, res) => {
  try {
    const { category_str_id } = req.params;
    const { choice_str_id, name, price_delta } = req.body;

    // Verify category exists
    const category = await OptionCategory.findOne({ where: { category_str_id } });
    if (!category) {
      return res.status(404).json({ error: 'Option category not found' });
    }

    const optionChoice = await OptionChoice.create({
      choice_str_id,
      name,
      price_delta,
      category_str_id
    });

    res.status(201).json(optionChoice);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};