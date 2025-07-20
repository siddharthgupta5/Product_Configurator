module.exports = (sequelize, DataTypes) => {
    const OptionChoice = sequelize.define('OptionChoice', {
      choice_str_id: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
      },
      name: {
        type: DataTypes.STRING,
        allowNull: false
      },
      price_delta: {
        type: DataTypes.FLOAT,
        allowNull: false,
        defaultValue: 0
      },
      category_str_id: {
        type: DataTypes.STRING,
        allowNull: false
      }
    });
  
    OptionChoice.associate = (models) => {
      OptionChoice.belongsTo(models.OptionCategory, {
        foreignKey: 'category_str_id',
        targetKey: 'category_str_id',
        as: 'category'
      });
    };
  
    return OptionChoice;
  };