'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Comments extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Comments.init({
    commentsId: {
      primaryKey: true,
      type: DataTypes.INTEGER, 
      },
    postId: DataTypes.STRING,
    userId: DataTypes.STRING,
    nickname: DataTypes.STRING,
    comments:DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Comments',
  });
  return Comments;
};