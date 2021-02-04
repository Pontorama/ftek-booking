const db = require('../db');

const getRooms = async (req, res, next) => {
  try {
    const rows = await db.query('CALL get_rooms()');
    res.json(rows[0]);
  } catch (error) {
    next(error);
  }
};

const createRoom = async (req, res, next) => {
  try {
    await db.query('CALL create_room(?, ?)' [req.body.name, req.body.manager]);
    res.status(201).send();
  } catch (error) {
    next(error);
  }
};

const updateRoom = async (req, res, next) => {
  try {
    await db.query('CALL update_room(?, ?)', [req.body.name, req.body.manager]);
    res.status(204).send();
  } catch (error) {
    next(error);
  }
};

const deleteRoom = async (req, res, next) => {
  try {
    await db.query('CALL delete_room(?)', [req.params.id]);
    res.status(204).send();
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getRooms,
  createRoom,
  updateRoom,
  deleteRoom
};