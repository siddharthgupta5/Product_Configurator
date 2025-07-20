const { ProductTemplate, CompatibilityRule } = require('../models');

exports.validateConfiguration = async (template_str_id, selections) => {
  const template = await ProductTemplate.findOne({ where: { template_str_id } });
  if (!template) {
    return { isValid: false, errors: ['Product template not found'] };
  }

  const allRules = await CompatibilityRule.findAll({ where: { template_str_id } });
  const errors = [];

  // Check all rules against current selections
  for (const rule of allRules) {
    const hasPrimary = selections[rule.primary_choice_str_id];
    const hasSecondary = selections[rule.secondary_choice_str_id];

    if (hasPrimary) {
      if (rule.rule_type === 'REQUIRES' && !hasSecondary) {
        errors.push(`${rule.primary_choice_str_id} requires ${rule.secondary_choice_str_id}`);
      } else if (rule.rule_type === 'INCOMPATIBLE_WITH' && hasSecondary) {
        errors.push(`${rule.primary_choice_str_id} is incompatible with ${rule.secondary_choice_str_id}`);
      }
    }
  }

  if (errors.length > 0) {
    return { isValid: false, errors };
  }

  // Calculate total price
  const optionChoices = await OptionChoice.findAll({
    where: { choice_str_id: Object.values(selections) }
  });

  const totalPrice = template.base_price + 
    optionChoices.reduce((sum, choice) => sum + choice.price_delta, 0);

  return {
    isValid: true,
    total_price: totalPrice,
    selections
  };
};