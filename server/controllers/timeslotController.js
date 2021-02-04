const db = require('../db');

const getTimeslotsByRoom = async (req, res, next) => {
  try {
    const rows = await db.query('CALL get_timeslots_by_room(?)', [req.params.room]);
    res.json(rows[0]);
  } catch (error) {
    next(error);
  }
};

const createTimeslot = async (req, res, next) => {
  try {
    await db.query('CALL create_timeslot(?, ?, ?, ?, ?)' [req.body.room, req.body.fromTime, req.body.toTime, req.body.weekday, req.body.name]);
    res.status(201).send();
  } catch (error) {
    next(error);
  }
};

const updateTimeslot = async (req, res, next) => {
  try {
    await db.query('CALL update_timeslot(?, ?, ?, ?, ?)', [req.params.id, req.body.fromTime, req.body.toTime, req.body.weekday, req.body.name]);
    res.status(204).send();
  } catch (error) {
    next(error);
  }
};

const deleteTimeslot = async (req, res, next) => {
  try {
    await db.query('CALL delete_timeslot(?)', [req.params.id]);
    res.status(204).send();
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getTimeslotsByRoom,
  createTimeslot,
  updateTimeslot,
  deleteTimeslot
};