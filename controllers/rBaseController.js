const { response } = require('express');
/**
 * Generate a message when the End Point is the Route Base
 * @function RBaseController
 * @param req - The Request to the Server
 * @param res - The Response from the Server
 */
const RBaseController = async (req, res = response) => {
    res.status(200).json({
        msg: 'Basic EndPoint'
    });
};

module.exports = { RBaseController };