module.exports = (app) => {
    const todoController = require('../controllers/controllers.todos');
    app.get('/get_all_todos',todoController.getAllTodos);

    app.post('/add_todo',todoController.addTodo);

    app.put('/update_finished/:id',todoController.finishTodo);
}