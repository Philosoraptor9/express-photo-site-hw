const express = require('express');
const User = require('../models/user');
const router = express.Router();

// Index route - shows all usernames
router.get('/', (req, res) => {
    res.render('users/index.ejs');
});

// New route - add a new username and password
router.get('/new', (req, res) => {
    res.render('users/new.ejs');
});

// Show route - shows user's username, edit and delete buttons and all photos (later)
router.get('/:id', (req, res) =>{
    res.render('users/show.ejs');
});

// Update and delete - edit button should take you to 'edit' form, delete button should delete user
router.get('/:id/edit', (req, res) =>{
    res.render('users/edit.ejs');
});


module.exports = router;