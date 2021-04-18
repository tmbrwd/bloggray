const mysql = require('mysql');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const fileUpload = require("express-fileupload");
const { response } = require('express');


const db = mysql.createConnection({
    host: process.env.DATABASE_HOST,
    port: process.env.DATABASE_PORT,
    user: process.env.DATABASE_USER,
    password: process.env.DATABASE_PASSWORD,
    database: process.env.DATABASE
});

exports.login = async(req, res) => {

    try {
        const { username, password } = req.body;
        if (!username || !password) {
            return res.status(400).render('login', {
                message: 'Please enter an email or password'
            })
        }

        db.query('SELECT * FROM users WHERE username = ?', [username], async(error, results) => {
            console.log(results);
            if (!results || !(await bcrypt.compare(password, results[0].password))) {
                res.status(401).render('login', {
                    message: 'EMAIL OR PASSWORD IS INCORRECT'
                })
            } else {
                const id = results[0].id;
                const token = jwt.sign({ id }, process.env.JWT_SECRET, {

                })
            }
            res.redirect('/loggedin')
        })

    } catch (error) {
        console.log(error);
    }

}





exports.register = (req, res) => {
    console.log(req.body);



    const {
        username,
        firstname,
        lastname,
        email,
        password,
    } = req.body;
    const photo = req.files.profilePhoto;
    var fileName = photo.name;

    photo.mv('../public/upload/' + fileName);
    db.query('SELECT email FROM users WHERE email = ?', [email], async(error, results) => {
        if (error) {
            console.log(error);
        } else if (results.length > 0) {
            return res.render('register', {
                message: 'that email is already in darling'
            })
        }

        let hashedPassword = await bcrypt.hash(password, 8);
        console.log(hashedPassword);

        db.query('INSERT INTO users SET ? ', { username: username, firstname: firstname, lastname: lastname, email: email, profilePictures: fileName, password: hashedPassword }, (error) => {
            if (error) {
                console.log(error);
            } else {
                console.log(results);
                return res.render('login', {
                    message: 'User registered'
                })
            }

        })

    });


}

exports.editUser = (req, res) => {
    console.log(req.body);
    const {
        id,
        username,
        firstname,
        lastname,
        email,
        password
    } = req.body;
    //let hashedPassword = bcrypt.hash(password, 8);
    //console.log(hashedPassword);
    db.query('UPDATE users SET username=?, firstname=?,lastname=?,email=? WHERE id=?', [username, firstname, lastname, email, req.params.id], (error, results) => {
        if (error) {
            console.log(error);
        } else {
            console.log(results);
            res.redirect('/userList');
        }

    })

};



exports.deleteUser = (req, res) => {
    console.log(req.body);
    //let hashedPassword = bcrypt.hash(password, 8);
    //console.log(hashedPassword);

    db.query('DELETE FROM users WHERE id=?', [req.params.id], (error, results) => {
        if (error) {
            console.log(error);
        } else {
            console.log(results);
            res.redirect('/userList')
        }

    })

};



exports.uploadForm = (req, res) => {
    const {
        id,
        header,
        highlight,
        main,
        userid,
        image
    } = req.body
    const photo = req.files.image;
    var photoName = photo.name;

    photo.mv('./public/upload/' + photoName);

    db.query('INSERT INTO userUploads SET ? ', { header: header, highlight: highlight, main: main, image: photoName }, (error, results) => {

        if (error) {
            console.log(error);
        } else {
            console.log(results);
            res.render('uploadForm')
        }
    })
}
exports.editPost = (req, res) => {
    console.log(req.body);
    const {
        id,
        header,
        highlight,
        main,
        image,
        password
    } = req.body;
    //let hashedPassword = bcrypt.hash(password, 8);
    //console.log(hashedPassword);
    db.query('UPDATE userUploads SET header = ? , highlight = ?, main = ?, image = ? WHERE id = ?', [header, highlight, main, image, req.params.id], (error, results) => {
        if (error) {
            console.log(error);
        } else {
            console.log(results);
            res.redirect('/managePost')
        }

    })

};

exports.deletePost = (req, res) => {
    var id = req.params.id;
    db.query('DELETE FROM userUploads WHERE id = ?', [id], function(err, results, fields) {
        if (err) {
            console.log(err)
        } else {
            res.redirect('/managePost')
        }
    })

}