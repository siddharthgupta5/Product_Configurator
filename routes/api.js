const express = require('express');
const router = express.Router();

const productTemplateController = require('../controllers/productTemplateController');
const optionCategoryController = require('../controllers/optionCategoryController');
const optionChoiceController = require('../controllers/optionChoiceController');
const compatibilityRuleController = require('../controllers/compatibilityRuleController');

// Product Template routes
router.post('/product-templates', productTemplateController.createProductTemplate);

// Option Category routes
router.post('/product-templates/:template_str_id/option-categories', 
  optionCategoryController.createOptionCategory);

// Option Choice routes
router.post('/option-categories/:category_str_id/choices', 
  optionChoiceController.createOptionChoice);

// Compatibility Rule routes
router.post('/product-templates/:template_str_id/compatibility-rules', 
  compatibilityRuleController.createCompatibilityRule);

// Available options route
router.post('/product-templates/:template_str_id/available-options/:target_category_str_id', 
  compatibilityRuleController.getAvailableOptions);

// Validate configuration route
router.post('/product-templates/:template_str_id/validate-configuration', 
  compatibilityRuleController.validateConfiguration);

module.exports = router;