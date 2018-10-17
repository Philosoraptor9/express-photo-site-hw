const express = require('express');
const User = require('../models/user');
const Photo = require('../models/photo');
const router = express.Router();

// Index route - shows all usernames
router.get('/', (req, res) => {
    User.find({}, (err, foundUsers) => {
    console.log(foundUsers);
    res.render('users/index.ejs', {users: foundUsers});
    })
});

// New route - add a new username and password
router.get('/new', (req, res) => {
    res.render('users/new.ejs');
});

router.post('/', (req, res) => {
    console.log(`req.body is ${JSON.stringify(req.body)}`);
    User.create(req.body, (err, newUser) =>{
        console.log(newUser);
        if (err) {
            console.log(err)
        } else {
            res.redirect('/users')
        }
    })
});

// Show route - shows user's username, edit and delete buttons and all photos (later)
router.get('/:id', (req, res) =>{
    User.findById(req.params.id, (err, foundUser) => {
        console.log(foundUser);
        res.render('users/show.ejs', {user: foundUser});
    })
});

// Update and delete - edit button should take you to 'edit' form, delete button should delete user
router.get('/:id/edit', (req, res) =>{
    User.findById(req.params.id, (err, foundUser) => {
        console.log(foundUser);
        res.render('users/edit.ejs', {user: foundUser});
    })
});

router.delete('/:id', (req, res)=>{
    User.findByIdAndDelete(req.params.id, (err, result)=>{
        res.redirect('/users')
    })
});

router.put('/:id', (req, res)=>{
    User.findByIdAndUpdate(req.params.id, req.body, (err, newUser)=>{
        res.redirect(`/users/${req.params.id}`)
    })
});

module.exports = router;