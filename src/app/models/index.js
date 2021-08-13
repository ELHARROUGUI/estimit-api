const dbConfig = require("../config/db.config.js");

const Sequelize = require("sequelize");
const sequelize = new Sequelize(dbConfig.DB, dbConfig.USER, dbConfig.PASSWORD, {
  host: dbConfig.HOST,
  dialect: dbConfig.dialect,
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

const Room = sequelize.define("room", {
  title: {
    // Should be unique
    type: Sequelize.STRING
  }
});
const Member = sequelize.define("member", {
  name: {
    // Should be unique for the room
    type: Sequelize.STRING
  }
});
Member.belongsTo(Room);

db.room = Room;
db.member = Member;
module.exports = db;
