const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');
const Category = require('./Category');

const Task = sequelize.define('Task', {
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true,
  },
  title: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  description: {
    type: DataTypes.TEXT,
    allowNull: true,
  },
  completed: {
    type: DataTypes.BOOLEAN,
    defaultValue: false,
  },
  dueDate: {
    type: DataTypes.DATE,
    allowNull: true,
  },
  priority: {
    type: DataTypes.ENUM('Low', 'Medium', 'High'),
    defaultValue: 'Medium',
  },
  categoryId: {
    type: DataTypes.UUID,
    allowNull: true,
    references: {
      model: Category,
      key: 'id',
    },
  },
}, {
  timestamps: true,
});

Task.belongsTo(Category, { foreignKey: 'categoryId', onDelete: 'SET NULL', onUpdate: 'CASCADE' });
Category.hasMany(Task, { foreignKey: 'categoryId' });

module.exports = Task;
