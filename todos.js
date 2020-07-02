const route = require('express').Router()
const mysql = require('mysql2')

let todos = []

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

connection.query(
    `SELECT task FROM todoactivity`,
    function (err, results) {
        if (err) {
            console.error(err)
        } else {
            console.log(results)
            for(todo of results) {
                todos.push({
                    task: todo.task
                })
            }
        }
    } 
)
route.get('/', (req, res) => {
    res.send(todos)
})

route.post('/', (req, res) => {
    todos.push({
        task: req.body.task
    })
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
    res.send(todos)
})

route.patch('/:id', (req, res) => {
    console.log(todos[req.params.id - 1].task)
    connection.query(
        `UPDATE todoactivity SET task="${req.body.task}" WHERE task="${todos[req.params.id - 1].task}"`,
        function (err, results) {
            if (err) {
                console.error(err)
            } else {
                console.log(results)
            }
        }
    )

    todos[req.params.id - 1].task = req.body.task
    
    res.send(todos)
})

route.delete('/:id', (req, res) => {
    connection.query(
        `DELETE FROM todoactivity WHERE task=${todos[req.params.id - 1].task}`,
        function (err, results) {
            if (err) {
                console.error(err)
            } else {
                console.log(results)
            }
        }
    )
    
    todos.splice(req.params.id - 1, 1)

    res.send(todos)

})

module.exports = route