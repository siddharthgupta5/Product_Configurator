module.exports = (sequelize, DataTypes) => {
    const ProductTemplate = sequelize.define('ProductTemplate', {
      template_str_id: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
      },
      name: {
        type: DataTypes.STRING,
        allowNull: false
      },
      base_price: {
        type: DataTypes.FLOAT,
        allowNull: false
      }
    });
  
    ProductTemplate.associate = (models) => {
      ProductTemplate.hasMany(models.OptionCategory, {
        foreignKey: 'template_str_id',
        sourceKey: 'template_str_id',
        as: 'optionCategories'
      });
      ProductTemplate.hasMany(models.CompatibilityRule, {
        foreignKey: 'template_str_id',
        sourceKey: 'template_str_id',
        as: 'compatibilityRules'
      });
    };
  
    return ProductTemplate;
  };