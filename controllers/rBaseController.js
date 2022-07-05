const { response } = require('express');

const RBaseController = async (req, res = response) => {
    res.status(200).json({
        msg: 'EndPoint Basico'
    });
};

module.exports = { RBaseController };