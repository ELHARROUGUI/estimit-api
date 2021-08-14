const db = require("../models");
const Member = db.member;
const Op = db.Sequelize.Op;

exports.create = (req, res) => {
  if (!req.body.name || !req.body.room.id) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
    return;
  }
  const member = {
    name: req.body.name,
    room: req.body.room
  };
  Member.create(member)
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Some error occurred while creating the Member."
      });
    });
};

exports.findAll = (req, res) => {
  const name = req.query.name;
  var condition = name ? { name: { [Op.like]: `%${name}%` } } : null;

  Member.findAll({ where: condition })
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Some error occurred while retrieving members."
      });
    });
};

exports.findOne = (req, res) => {
  const id = req.params.id;

  Member.findByPk(id)
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message: "Error retrieving Member with id=" + id
      });
    });
};

exports.findAllByRoom = (req, res) => {
  const roomId = req.params.roomId;
  Member.findAll({ where: { room: { id: roomId } } })
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Some error occurred while retrieving rooms."
      });
    });
};

exports.update = (req, res) => {
  const id = req.params.id;

  Member.update(req.body, {
    where: { id: id }
  })
    .then((num) => {
      if (num === 1) {
        res.send({
          message: "Member was updated successfully."
        });
      } else {
        res.send({
          message: `Cannot update Member with id=${id}. Maybe Member was not found or req.body is empty!`
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: "Error updating Member with id=" + id
      });
    });
};

exports.delete = (req, res) => {
  const id = req.params.id;
  Member.destroy({
    where: { id: id }
  })
    .then((num) => {
      if (num === 1) {
        res.send({
          message: "Member was deleted successfully!"
        });
      } else {
        res.send({
          message: `Cannot delete Member with id=${id}. Maybe Member was not found!`
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: "Could not delete Member with id=" + id
      });
    });
};
