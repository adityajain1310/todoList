$(function () {
    let showToDoList = $('#showtodo')
    let newToDOBox = $('#newtodo')
    let indexBox = $('#index')
    let addToDoBtn = $('#addtodo')
    let todoList = $('#todolist')
    let updateToDoBtn = $('#updatetodo')
    let deleteToDoBtn = $('#deletetodo')

    showToDoList.click(function () {
        $.get(
            '/todoList',
            function (data) {
                todoList.empty();
                for (todo of data) {
                    todoList.append("<li>" + todo.task + "</li>")
                }
            }
        )
    })

    addToDoBtn.click(function () {
        let newToDo = newToDOBox.val()
        
        $.post(
            '/todoList',
            {task: newToDo},
            function (data) {
                todoList.empty();
                for (todo of data) {
                    todoList.append("<li>" + todo.task + "</li>")
                }
            }
        )
    })

    updateToDoBtn.click(function () {
        let index = indexBox.val()
        let newToDo = newToDOBox.val()
        $.patch(
            '/todoList/' + index,
            {task: newToDo},
            function (data) {
                todoList.empty();
                for(todo of data) {
                    todoList.append("<li>" + todo.task + "<li>")
                }
            }
        )
    })

})