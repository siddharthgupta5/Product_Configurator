const sequelize = require('../config/db');
const ProductTemplate = require('./ProductTemplate');
const OptionCategory = require('./OptionCategory');
const OptionChoice = require('./OptionChoice');
const CompatibilityRule = require('./CompatibilityRule');

// Set up associations
ProductTemplate.associate({ OptionCategory, CompatibilityRule });
OptionCategory.associate({ ProductTemplate, OptionChoice });
OptionChoice.associate({ OptionCategory });
CompatibilityRule.associate({ ProductTemplate });

module.exports = {
  sequelize,
  ProductTemplate,
  OptionCategory,
  OptionChoice,
  CompatibilityRule
};