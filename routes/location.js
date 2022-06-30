// const express = require('express')
// const router = express.Router();

// var AuthorController = require('../controllers/authorController');

// router.get('/', AuthorController.authorList);

// router.get('/:id', AuthorController.authorDetail);

// router.get('/create', AuthorController.authorCreateForm);

// module.exports = router;

const express = require('express');
const router = express.Router();
router.get('/', (req,res) => {
    console.log('Funciona');
    res.json(`lcation`);
})
module.exports = router;