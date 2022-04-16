const express = require('express');
const router = express.Router();

const User = require('../models/user');

router.get('/login', (req, res, next) => {
    new User({id: 1}).fetch().then((user) => {
        console.log(user.toJSON())

        res.status(200).json({
            message: user
        });
      }).catch((error) => {
        console.error(error)
      })
    
});

router.post('/login', (req, res, next) => {
    if(req.body.email){
        new User({email: req.body.email}).fetch().then((user) => {
            res.status(200).json({
                message: user.id
            });
        }).catch(User.NotFoundError, () => {
            res.status(200).json({error: 'not found'})
        }).catch((error) => {
            console.error(error)
        })
    }else{
        res.status(500).json({
            message: "Invaild details"
        });
    }
    
});
router.post('/logout', (req, res, next) => {
    
    new User({email: req.body.email}).fetch().then((user) => {
        res.status(200).json({
            message: user.id
        });
    }).catch(User.NotFoundError, () => {
        res.status(200).json({error: 'not found'})
    }).catch((error) => {
        console.error(error)
    })
});

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

router.delete('/:downloadId', (req, res, next) => {
    const id = req.params.downloadId;
    res.status(200).json({
        message: 'DELETE id '+ id +' request to /downloads'
    });
});

router.post('/:downloadId', (req, res, next) => {
    const id = req.params.downloadId;
    res.status(200).json({
        message: 'POST id '+ id +' request to /downloads'
    });
});

module.exports = router;