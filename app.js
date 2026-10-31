
const path = require('path');
const { v4: uuid } = require('uuid');
const express = require('express');

const app = express();

// EJS setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// Middleware
app.use(express.urlencoded({ extended: true }));

// Fake database
let comments = [
    {
        id: uuid(),
        username: 'Todd',
        comment: 'lol that is so funny!'
    },
    {
        id: uuid(),
        username: 'Skyler',
        comment: 'I like to go birdwatching with my dog'
    },
    {
        id: uuid(),
        username: 'Sk8erBoi',
        comment: 'Plz delete your account, Todd'
    },
    {
        id: uuid(),
        username: 'onlysayswoof',
        comment: 'woof woof woof'
    }
];

// Home route
app.get('/', (req, res) => {
    res.redirect('/comments');
});

// Show all comments
app.get('/comments', (req, res) => {
    res.render('comments/index', { comments });
});

// Form to create a new comment
app.get('/comments/new', (req, res) => {
    res.render('comments/new');
});

// Create a new comment
app.post('/comments', (req, res) => {
    const { username, comment } = req.body;

    comments.push({
        id: uuid(),
        username,
        comment
    });

    res.redirect('/comments');
});

// Show one specific comment
app.get('/comments/:id', (req, res) => {
    const { id } = req.params;

    const comment = comments.find(c => c.id === id);

    if (!comment) {
        return res.status(404).send('Comment not found!');
    }

    res.render('comments/show', { comment });
});

// Start server
app.listen(8000, () => {
    console.log('ON PORT 8000!');
});
