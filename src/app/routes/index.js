const room = require("../controllers/room.controller.js");
const member = require("../controllers/member.controller.js");

let router = require("express").Router();

router.post("/rooms/", room.create);
router.get("/rooms/", room.findAll);

router.post("/members/", member.create);
router.get("/members/", member.findAll);
router.get("/members/:id", member.findOne);
router.get("/members/room/:roomId", member.findAllByRoom);
router.put("/members/:id", member.update);
router.delete("/members/:id", member.delete);

module.exports = router;
