const { validationResult } = require('express-validator');

const checkValidationResult = (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
};

module.exports = checkValidationResult;