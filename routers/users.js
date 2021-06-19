const mysql = require('mysql2')
const express = require('express')
const auth = require('../middleware/auth.js')
const router = express.Router();
const conn = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database: "TugasWebLanjutan"
})

conn.connect(function (err) {
    if (err) throw err
})

router.get('/', auth, function (req, res) {
    const sql = "SELECT * FROM user"
    conn.query(sql, function (err, result) {
        if (err) throw err
        res.send(result)
    })
})

router.post('/', function (req, res, next) {
    const sql = "SELECT * FROM user"
    conn.query(sql, function (err, result) {
        if (result.length > 0) {
            auth(req, res, next)
        } else {
            next()
        }
    })
}, function (req, res) {
    const check = "SELECT * FROM user WHERE username = '" + req.body.username + "'"
    conn.query(check, function (err, result) {
        console.log(result)
        console.log(result.length)
        if (result.length > 0) {
            res.status(401)
            console.log(""+req.body.username +" sudah terdaftar")
            return;
        } else {
            const sql = "INSERT INTO user(username, password) VALUES ('" + req.body.username + "' , '" + req.body.password + "')"
            conn.query(sql, function (err) {
                if(err) throw err
                console.log("User "+req.body.username +" berhasil ditambahkan")
                res.end()
            })
        }
    })
})

router.delete('/:id', auth, function (req, res) {
    const check = "SELECT * FROM user"
    conn.query(check, function (err, result) {
        if (result.length == 1)
            return
        else {
            const show = "SELECT username FROM user WHERE id = " + req.params.id
            conn.query(show, function(err, result){
                const sql = "DELETE FROM user WHERE id = " + req.params.id
                conn.query(sql, function (err) {
                    if (err) throw err
                    console.log("User "+result[0].username +" berhasil dihapuskan")
                })
            })
        }
    })
    res.end()
})

module.exports = router