const route = require('express').Router()

let todos = [
    {Task: "Go to Doctor", Status: "Done"},
    {Task: "Plan a Trip", Status: "Undone"},
    {Task: "Parents Meeting", Status: "Undone"},
    {Task: "Work on Project", Status: "Done"},
    {Task: "Complete assignment", Status: "Undone"},
    {Task: "Find a Internship", Status: "Undone"}
]

route.get('/', (req, res) => res.send(todos))

route.post('/', (req, res) => {
    todos.push({
        Task: req.body.Task,
        Status: req.body.Status
    })
    res.send(todos)
})

route.get('/:id', (req, res) => res.send(todos[req.params.id - 1]))

route.patch('/:id', (req, res) => {
    todos[req.params.id - 1].Task = req.body.Task
    todos[req.params.id - 1].Status = req.body.Status
    res.send(todos)
})

route.delete('/:id', (req, res) => {
    todos.splice(req.params.id - 1, 1)
    res.send(todos)
})

module.exports = route