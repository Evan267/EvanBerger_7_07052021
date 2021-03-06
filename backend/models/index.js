const dbConfig = require("../config/db.config");
const bcrypt = require('bcrypt');

const Sequelize = require("sequelize");
const sequelize = new Sequelize(dbConfig.DB, dbConfig.USER, dbConfig.PASSWORD, {
  host: dbConfig.HOST,
  dialect: dbConfig.dialect,
  operatorsAliases: 0,

  pool: {
    max: dbConfig.pool.max,
    min: dbConfig.pool.min,
    acquire: dbConfig.pool.acquire,
    idle: dbConfig.pool.idle
  }
});

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.users = require("./User")(sequelize, Sequelize);
db.publications = require("./Publication")(sequelize, Sequelize);
db.comments = require("./Comment")(sequelize, Sequelize);
db.likes = require("./Like")(sequelize, Sequelize);

//Association un-à-plusieurs entre User et Publication
db.users.hasMany(db.publications, { as: "publications", onDelete: 'cascade', hooks: true });
db.publications.belongsTo(db.users, {
    foreignKey: "userId",
    as: "user",
});

//Association un-à-plusieurs entre User et Comment
db.users.hasMany(db.comments, { as: "commentsUser", onDelete: 'cascade', hooks: true });
db.comments.belongsTo(db.users, {
    foreignKey: "userId",
    as: "userComment",
});

//Association un-à-plusieurs entre Publication et Comment
db.publications.hasMany(db.comments, { as: "comments", onDelete: 'cascade', hooks: true });
db.comments.belongsTo(db.publications, {
    foreignKey: "publicationId",
    as: "publication"
});

//Association un-à-plusieurs entre Publication et Like
db.publications.hasMany(db.likes, { as: "likes", onDelete: 'cascade', hooks: true });
db.likes.belongsTo(db.publications, {
    foreignKey: "publicationId",
    as: "publicationLike"
});



module.exports = db;