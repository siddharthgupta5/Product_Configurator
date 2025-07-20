const { OptionChoice, CompatibilityRule } = require('../models');

exports.filterAvailableOptions = async (template_str_id, target_category_str_id, current_selections) => {
  // Get all options in the target category
  const allOptions = await OptionChoice.findAll({
    where: { category_str_id: target_category_str_id },
    include: ['category']
  });

  // Get all compatibility rules for this template
  const allRules = await CompatibilityRule.findAll({
    where: { template_str_id }
  });

  // Filter options based on current selections and rules
  const availableOptions = allOptions.filter(option => {
    // Check if this option is compatible with current selections
    return isOptionCompatible(option, current_selections, allRules);
  });

  return availableOptions.map(option => ({
    choice_str_id: option.choice_str_id,
    name: option.name,
    price_delta: option.price_delta,
    category: option.category.name
  }));
};

function isOptionCompatible(option, current_selections, allRules) {
  // Check all rules that involve this option
  const relevantRules = allRules.filter(rule => 
    rule.primary_choice_str_id === option.choice_str_id || 
    rule.secondary_choice_str_id === option.choice_str_id
  );

  for (const rule of relevantRules) {
    const otherChoiceId = rule.primary_choice_str_id === option.choice_str_id 
      ? rule.secondary_choice_str_id 
      : rule.primary_choice_str_id;

    if (current_selections[otherChoiceId]) {
      if (rule.rule_type === 'INCOMPATIBLE_WITH') {
        return false;
      }
    }
  }

  return true;
}