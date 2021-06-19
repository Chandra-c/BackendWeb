const mysql = require('mysql2')
const express = require('express')
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


router.post('/', function (req, res) {
    const sql = "INSERT INTO data(deskripsi) VALUES('" + req.body.deskripsi + "')"
    conn.query(sql, function (err) {
        if (err) throw err
        console.log("Deskripsi "+req.body.deskripsi +" telah ditambahkan")
    })
    res.end()
})

router.delete('/:id', function (req, res) {
    const show = "SELECT deskripsi FROM data WHERE id = " + req.params.id
    conn.query(show, function(err, result){
        const sql = "DELETE FROM data WHERE id = " + req.params.id
        conn.query(sql, function (err) {
            if (err) throw err
            console.log("Deskripsi "+result[0].deskripsi +" berhasil dihapuskan")
        })
        res.end()
    })
})

router.get('/', function (req, res) {
    const sql = "SELECT * FROM data"
    conn.query(sql, function (err, result) {
        if (err) throw err
        res.send(result)
    })
})

module.exports = router