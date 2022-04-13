const express = require('express');
const router = express.Router();

router.get('/', (req, res, next) => {
    res.status(200).json({
        message: 'GET request to /downloads'
    });
});

router.post('/', (req, res, next) => {
    res.status(200).json({
        message: 'POST request to /downloads'
    });
});

router.post('/:downloadId', (req, res, next) => {
    const id = req.params.downloadId;
    res.status(200).json({
        message: 'POST id '+ id +' request to /downloads'
    });
});

module.exports = router;