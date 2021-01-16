const db = require('../db');

const getReservations = async (req, res, next) => {
    const year = req.body.year;
    const month = req.body.month;
    db.query('CALL get_public_reservations(?, ?)',
    [year, month], 
    (err, rows) => {
        if (err)
            return next(err);
        else
            res.json(rows[0]);
    });
};

module.exports = {
    getReservations
};