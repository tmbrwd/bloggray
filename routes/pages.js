const { ApiController } = require('admin-bro');
const express = require('express');
const router = express.Router();
const mysql = require('mysql');


const db = mysql.createConnection({
    host: process.env.DATABASE_HOST,
    port: process.env.DATABASE_PORT,
    user: process.env.DATABASE_USER,
    password: process.env.DATABASE_PASSWORD,
    database: process.env.DATABASE
});

router.get('/auth/deletePost/managePost', (req, res) => {
    res.render('managepost')
})

router.get('/profileUsers', (req, res) => {
    res.render('profileUsers')
})

router.get('/', (req, res) => {
    res.render('login');
});

router.get('/index', (req, res) => {
    res.render('login');
});

router.get('/login', (req, res) => {
    res.render('login');
});

/*
router.get('/index', (req, res) => {
    res.render('index');
});
*/
router.get('/auth/register', (req, res) => {
    res.render('register')
})

router.get('/register', (req, res) => {
    res.render('register');
});

router.get('/edit/:id', (req, res) => {
    var userId = req.params.id;

    db.query('SELECT * FROM users WHERE id = ?', [userId], async(error, users) => {
        if (error) {
            console.log(error);
        } else {
            return res.render('edit', {
                users: users[0]
            })
        }
    })

});


router.get('/postEdit/:id', (req, res) => {
    var uploadId = req.params.id;
    db.query('SELECT * FROM userUploads WHERE id = ?', [uploadId], async(error, posts) => {
        if (error) {
            console.log(error)
        } else if (uploadId.length > 0) {
            return res.status(200).render('postEdit', {
                posts: posts[0]
            })
        }
    })
})





router.get('/registerUser', (req, res) => {
    res.redirect('register')
})

router.get('/uploadForm', (req, res) => {
    res.render('uploadForm')
})

router.get('/profileSection', (req, res) => {
    res.render('profileSection')
});



router.get('/userList', (req, res) => {

    db.query('SELECT * FROM users', async(error, results) => {
        if (error) {
            console.log(error);
        } else if (results.length > 0) {
            return res.render('profileUsers', {
                users: results
            })
        }
    });
});

router.get('/postStandard/:id', (req, res) => {
    var id = req.params.id
    db.query('SELECT * FROM userUploads WHERE id = ?', [id], (error, results, fields) => {
        console.log(id);
        if (error) {
            console.log(error);
        } else {

            console.log(results);
            res.render('postStandard', {
                contents: results[0]
            })
        }
    })
})



router.get('/loggedIn', function(req, res) {
    db.query('SELECT * FROM userUploads', function(error, results, fields) {
        if (!error) {
            res.render('loggedIn', { contents: results });
        } else {
            console.log(results);
        }
    })
});

router.get('/createUser', (req, res) => {
    res.render('createUser')
})

router.get('/managePost', (req, res) => {

    db.query('SELECT * FROM userUploads', async(error, results) => {
        if (error) {
            console.log(error);
        } else if (results.length > 0) {
            return res.render('managePost', {
                userUploads: results
            })
        }
    });
});

module.exports = router;