const db = require('../db');

const getInspectionTimes = async (req, res, next) => {
  try {
    const rows = await db.query('CALL get_inspection_times(?)', [req.params.timeslot]);
    res.json(rows[0]);
  } catch (error) {
    next(error);
  }
};

const createInspectionTime = async (req, res, next) => {
  try {
    await db.query('CALL create_inspection_times(?, ?)', [req.body.timeslot, req.body.time]);
    res.status(201).send();
  } catch (error) {
    next(error);
  }
};

const deleteInspectionTime = async (req, res, next) => {
  try {
    await db.query('CALL delete_inspection_times(?, ?)', [req.body.timeslot, req.body.time]);
    res.status(204).send();
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getInspectionTimes,
  createInspectionTime,
  deleteInspectionTime
}