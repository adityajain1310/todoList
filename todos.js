const route = require('express').Router()
const mysql = require('mysql2')

const connection = mysql.createConnection({
    host: 'localhost',
    user: 'todoList',
    database: 'tododb'
});

connection.query(
    `CREATE TABLE IF NOT EXISTS todoactivity (
        id INTEGER AUTO_INCREMENT PRIMARY KEY,
        task VARCHAR(100))`,
    function (err, results) {
        if (err) {
            console.errer(err)
        } else {
            console.log("Table Created Successfully")
        }
    }
)

route.get('/', (req, res) => {
    connection.query(
        'SELECT task FROM todoactivity',
        function (err, todos) {
            if (err) {
                console.error(err)
            }
            else {
                console.log(todos)
                res.send(todos)
            }
        }
    )
})

route.post('/', (req, res) => {
    console.log(req.body.task)
    connection.query(
        `INSERT INTO todoactivity (task) VALUES ("${req.body.task}")`,
        function (err, results) {
         if (err) {
             console.error(err)
         } else {
             console.log("Inserted successfully: " + results)
         }
        }
    )
    connection.query(
        'SELECT task FROM todoactivity',
        function (err, todos) {
            if (err) {
                console.error(err)
            }
            else {
                console.log(todos)
                res.send(todos)
            }
            
        }
    )
})

route.get('/:id', (req, res) => {
    connection.query(
        `SELECT task FROM todoactivity where id=${req.params.id}`,
        function (err, todos) {
            if (err) {
                console.error(err)
            } else {
                console.log(todos)
                res.send(todos)
            }
        }
    )
})

route.patch('/:id', (req, res) => {
    connection.query(
        `UPDATE todoactivity SET task="${req.body.task}" WHERE id=${req.params.id}`,
        function (err, results) {
            if (err) {
                console.error(err)
            } else {
                console.log(results)
            }
        }
    )
    connection.query(
        `SELECT task FROM todoactivity`,
        function (err, todos) {
            if (err) {
                console.error(err)
            } else {
                console.log(todos)
                res.send(todos)
            }
        }
    )
})

route.delete('/:id', (req, res) => {
    connection.query(
        `DELETE FROM todoactivity WHERE id=${req.params.id}`,
        function (err, results) {
            if (err) {
                console.error(err)
            } else {
                console.log(results)
            }
        }
    )

    connection.query(
        `DECLARE @Total AS INT
        SELECT @Total=COUNT(*) FROM `
    )
    //todos.splice(req.params.id - 1, 1)
    connection.query(
        `SELECT task FROM todoactivity`,
        function (err, todos) {
            if (err) {
                console.error(err)
            } else {
                console.log(todos)
                res.send(todos)
            }
        }
    )
})

module.exports = route