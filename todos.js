const route = require('express').Router()

let todos = [
    {task: "Go to Doctor"},
    {task: "Plan a Trip"},
    {task: "Parents Meeting"},
    {task: "Work on Project"},
    {task: "Complete assignment"},
    {task: "Find a Internship"}
]

route.get('/', (req, res) => res.send(todos))

route.post('/', (req, res) => {
    todos.push({
        task: req.body.task
    })
    res.send(todos)
})

route.get('/:id', (req, res) => res.send(todos[req.params.id - 1]))

route.patch('/:id', (req, res) => {
    todos[req.params.id - 1].task = req.body.task
    res.send(todos)
})

route.delete('/:id', (req, res) => {
    todos.splice(req.params.id - 1, 1)
    res.send(todos)
})

module.exports = route