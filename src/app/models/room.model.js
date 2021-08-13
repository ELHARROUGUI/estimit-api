module.exports = (sequelize, Sequelize) => {
  const Room = sequelize.define("room", {
    title: {
      type: Sequelize.STRING
    }
  });

  return Room;
};
