const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
    res.send("prayer movement get page");
});

router.post('/', (req, res) => {

});

router.put('/:id', (req, res) => {

});

router.delete('/:id', (req, res) => {

});

module.exports = router;