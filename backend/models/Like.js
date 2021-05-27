const { DataTypes } = require("sequelize");

module.exports = (sequelize, Sequelize) => {
    const Like = sequelize.define('like', {
        usersLiked: {
            type: DataTypes.SMALLINT,
        },
    });
    return Like;
}