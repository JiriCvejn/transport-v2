const { DataTypes } = require("sequelize");
const sequelize = require("../db");
const User = require("./User");

const Task = sequelize.define("Task", {
  from: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  to: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  priority: {
    type: DataTypes.BOOLEAN,
    defaultValue: false,
  },
  status: {
    type: DataTypes.ENUM("open", "assigned", "done"),
    defaultValue: "open",
  },
  assignedTo: {
    type: DataTypes.STRING,
    allowNull: true,
  },
});

module.exports = Task;
