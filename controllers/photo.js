const express = require('express');
const router = express.Router()
const Photo = require('../models/photo');
const User = require('../models/user');


// Index route - should show all photos that have been submitted
router.get('/', (req, res) => {
    Photo.find({}, (err, foundPhotos) => {
    console.log(foundPhotos);
    res.render('photos/index.ejs', {photos: foundPhotos});
    })
});

// New route - enter photoname (required); url of site hosting photo; info ab photo supplied by photo (not required)
router.get('/new', (req, res) => {
    res.render('photos/new.ejs');
});

router.post('/', (req, res) => {
    console.log(`req.body is ${JSON.stringify(req.body)}`);
    Photo.create(req.body, (err, newPhoto) =>{
        console.log(newPhoto);
        if (err) {
            console.log(err)
        } else {
            res.redirect('/photos')
        }
    })
});

// Show route - shows and individual photo, edit or delete a photo
router.get('/:id', (req, res) =>{
    Photo.findById(req.params.id, (err, foundPhoto) => {
        console.log(foundPhoto);
        res.render('photos/show.ejs', {photo: foundPhoto});
    })
});

// Update and delete - edit button takes you to the edit form; delete button should delete photo
router.get('/:id/edit', (req, res) =>{
    Photo.findById(req.params.id, (err, foundPhoto) => {
        console.log(foundPhoto);
        res.render('photos/edit.ejs', {photo: foundPhoto});
    })
});

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