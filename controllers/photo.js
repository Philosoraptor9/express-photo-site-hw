const express = require('express');
const router = express.Router();
const Photo = require('../models/photo');
const User = require('../models/user');


// Index route - should show all photos that have been submitted
router.get('/', (req, res) => {
    Photo.find({}, (err, foundPhotos) => {
    console.log(foundPhotos);
    res.render('photos/index.ejs', {photos: foundPhotos});
    })
});

// New route - enter username (required); url of site hosting photo; info ab photo supplied by photo (not required)
router.get('/new', (req, res) => {
    User.find({}, (err, allUsers)=> {
        res.render('photos/new.ejs', {users: allUsers});
    })
});


// Show route - shows and individual photo, edit or delete a photo
router.get('/:id', (req, res) =>{
    Photo.findById(req.params.id, (err, foundPhoto) => {
        User.findOne({'photos._id': req.params.id}, (err, foundUser) => {
        console.log(foundUser);
        res.render('photos/show.ejs', {photo: foundPhoto, user: foundUser});
        })
    })
});

// Update and delete - edit button takes you to the edit form; delete button should delete photo
router.get('/:id/edit', (req, res) =>{
    Photo.findById(req.params.id, (err, foundPhoto) => {
        console.log(foundPhoto);
        res.render('photos/edit.ejs', {photo: foundPhoto});
    })
});

router.post('/', (req, res) => {
    User.findById(req.body.userId, (err, foundUser) =>{
        console.log(`req.body is ${JSON.stringify(req.body)}`);
        Photo.create(req.body, (err, newPhoto) =>{
        foundUser.photos.push(newPhoto);
        foundUser.save((err, data) => {
            res.redirect('/photos')
            })
        })
    })
});

// Delete should delete a specific photo from it's user
router.delete('/:id', (req, res)=>{
    Photo.findByIdAndDelete(req.params.id, (err, result)=>{
        res.redirect('/photos')
    })
});

router.put('/:id', (req, res)=>{
    Photo.findByIdAndUpdate(req.params.id, req.body, (err, newPhoto)=>{
        res.redirect(`/photos/${req.params.id}`)
    })
});


module.exports = router;