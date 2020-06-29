$(function () {
    let newToDOBox = $('#newtodo')
    let addToDoBtn = $('#addtodo')
    let todoList = $('#todolist')

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

})