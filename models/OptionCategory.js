module.exports = (sequelize, DataTypes) => {
    const OptionCategory = sequelize.define('OptionCategory', {
      category_str_id: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
      },
      name: {
        type: DataTypes.STRING,
        allowNull: false
      },
      template_str_id: {
        type: DataTypes.STRING,
        allowNull: false
      }
    });
  
    OptionCategory.associate = (models) => {
      OptionCategory.belongsTo(models.ProductTemplate, {
        foreignKey: 'template_str_id',
        targetKey: 'template_str_id',
        as: 'productTemplate'
      });
      OptionCategory.hasMany(models.OptionChoice, {
        foreignKey: 'category_str_id',
        sourceKey: 'category_str_id',
        as: 'choices'
      });
    };
  
    return OptionCategory;
  };