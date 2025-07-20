const { ProductTemplate, OptionChoice, CompatibilityRule } = require('../models');

exports.createCompatibilityRule = async (req, res) => {
  try {
    const { template_str_id } = req.params;
    const { rule_type, primary_choice_str_id, secondary_choice_str_id } = req.body;

    // Verify template exists
    const template = await ProductTemplate.findOne({ where: { template_str_id } });
    if (!template) {
      return res.status(404).json({ error: 'Product template not found' });
    }

    // Verify both choices exist
    const primaryChoice = await OptionChoice.findOne({ where: { choice_str_id: primary_choice_str_id } });
    const secondaryChoice = await OptionChoice.findOne({ where: { choice_str_id: secondary_choice_str_id } });

    if (!primaryChoice || !secondaryChoice) {
      return res.status(404).json({ error: 'One or both option choices not found' });
    }

    const rule = await CompatibilityRule.create({
      rule_type,
      primary_choice_str_id,
      secondary_choice_str_id,
      template_str_id
    });

    res.status(201).json(rule);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.getAvailableOptions = async (req, res) => {
  try {
    const { template_str_id, target_category_str_id } = req.params;
    const { current_selections } = req.body;

    // Implementation would go here (see services/optionFilter.js)
    res.status(501).json({ message: 'Not yet implemented' });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.validateConfiguration = async (req, res) => {
  try {
    const { template_str_id } = req.params;
    const { selections } = req.body;

    // Implementation would go here (see services/configValidator.js)
    res.status(501).json({ message: 'Not yet implemented' });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};