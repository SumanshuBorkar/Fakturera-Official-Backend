const { DataTypes } = require('sequelize');
const sequelize = require('../db');

const Product = sequelize.define('Product', {
  articleNo: { type: DataTypes.STRING, allowNull: false },
  productService: { type: DataTypes.STRING, allowNull: false },
  inPrice: { type: DataTypes.INTEGER, allowNull: false },
  price: { type: DataTypes.INTEGER, allowNull: false },
  unit: { type: DataTypes.STRING, allowNull: false },
  inStock: { type: DataTypes.INTEGER, allowNull: false },
  description: { type: DataTypes.STRING, allowNull: false }
}, {
  tableName: 'products',
  timestamps: false,
});

module.exports = Product;
