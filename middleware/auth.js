const mysql = require('mysql2')
const conn = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database: "TugasWebLanjutan"
})

conn.connect(function (err) {
    if (err) throw err
})

module.exports = function (req, res, next) {
    const username = req.headers.username
    const password = req.headers.password

    const sql = "SELECT * FROM user WHERE username = '" + username + "'"
    conn.query(sql, function (err, result) {
        if (err) throw err
        if (result.length < 1)
            res.send(401)
        else {
                if (password == result[0].password) {
                    next();
                }
                else {
                    res.send(401)
                }
            }
        })
    }