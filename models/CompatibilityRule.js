module.exports = (sequelize, DataTypes) => {
    const CompatibilityRule = sequelize.define('CompatibilityRule', {
      rule_type: {
        type: DataTypes.ENUM('REQUIRES', 'INCOMPATIBLE_WITH'),
        allowNull: false
      },
      primary_choice_str_id: {
        type: DataTypes.STRING,
        allowNull: false
      },
      secondary_choice_str_id: {
        type: DataTypes.STRING,
        allowNull: false
      },
      template_str_id: {
        type: DataTypes.STRING,
        allowNull: false
      }
    });
  
    CompatibilityRule.associate = (models) => {
      CompatibilityRule.belongsTo(models.ProductTemplate, {
        foreignKey: 'template_str_id',
        targetKey: 'template_str_id',
        as: 'productTemplate'
      });
    };
  
    return CompatibilityRule;
  };