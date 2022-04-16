const express = require('express');
const router = express.Router();
const fs = require('fs');
path = require('path');

const upload = require("../../util/upload");

const UserFile = require('../models/userfile');

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

router.post('/upload_file', upload.single("file"), function(req, res, next){
    if(!req.file){
        throw Error("FILE_MISSING");
    }else{
        // console.log(res.req.file.filename);
        // console.log(req.body.user_id);
        // console.log(req.body.title);
        // console.log(req.body.description);
        UserFile.forge({
            name: res.req.file.filename,
            title: req.body.title, 
            description: req.body.description, 
            user_id: req.body.user_id
        }).save()
        .then(function(file){
            res.send({ status : "success" });
        });
        
    }
});

router.get('/userlist/:userId', (req, res, next) => {
    const id = req.params.userId;
    UserFile.where({user_id : id}).fetchAll().then(function(files){
        let userFiles = files;
        res.status(200).json({
            data: userFiles
        });
    });
});

router.delete('/:downloadId/:filename', (req, res, next) => {
    const id = req.params.downloadId;
    const filename = req.params.filename;
    const filepath = path.join(__dirname , '../../uploads' , filename);

    fs.unlink(filepath, (err) => {
    if (err) {
        console.error(err)
        return
    }
    UserFile.where({id : id}).destroy().then(function(files){
        let userFiles = files;
        res.status(200).json({
            data: id,
            message: "deleted"
        });
    });

    //file removed
    })

    
});

router.post('/:downloadId', (req, res, next) => {
    const id = req.params.downloadId;
    res.status(200).json({
        message: 'POST id '+ id +' request to /downloads'
    });
});

module.exports = router;