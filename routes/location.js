// const express = require('express')
// const router = express.Router();

// var AuthorController = require('../controllers/authorController');

// router.get('/', AuthorController.authorList);

// router.get('/:id', AuthorController.authorDetail);

// router.get('/create', AuthorController.authorCreateForm);

// module.exports = router;

// Complete location for your IP address

const express = require('express');
const { LocationGet } = require('../controllers/locationController');
const router = express.Router();
router.get('/',LocationGet);
module.exports = router;