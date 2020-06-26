const express = require('express')
const server = express()

const todos = require('./todos')

server.use(express.json())
server.use(express.urlencoded())

server.use('/todoList',todos)

server.listen(8888)