const { checkToken } = require('../config/checkToken');

module.exports = (app) => {
    const todoController = require('../controllers/controllers.todos');
    app.get('/get_all_todos',checkToken,todoController.getAllTodos);

    app.post('/add_todo',checkToken,todoController.addTodo);

    app.put('/update_finished/:id',checkToken,todoController.finishTodo);
}