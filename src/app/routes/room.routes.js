module.exports = (app) => {
  const room = require("../controllers/room.controller.js");

  var router = require("express").Router();

  router.post("/", room.create);
  router.get("/", room.findAll);

  app.use("/api/rooms", router);
};
