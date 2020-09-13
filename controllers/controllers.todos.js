const db_conn = require('../config/database');

exports.getAllTodos = (req,res) => {
    const sqlCmd = 'SELECT * FROM todos';
    db_conn.promise().query(sqlCmd)
        .then(([results]) => {
            console.log(results);
            res.status(200).json(results);
        })
        .catch((err) => {
            console.log(err);
            res.status(500).json({message: 'INTERNAL_SERVER_ERR'});
        })
}

exports.addTodo = (req, res) => {
    const {title, date_time, priority, createdAt} = req.body;
    console.log(req.body);
    const sqlCmd = 'INSERT INTO todos(title,date_time,priority) VALUES(?,?,?)';
    db_conn.promise().query(sqlCmd,[title,date_time,priority])
        .then(([results])=>{
            console.log(results);
            res.status(200).json(results);
        })
        .catch((err)=>{
            console.log(err);
            res.status(500).json({message: 'INTERNAL_SERVER_ERR'});
        });
}

exports.finishTodo = (req, res) => {
    const todoId = req.params.id;
    console.log(todoId);
    const sqlCmd = 'UPDATE todos SET is_finished = ? WHERE id = ?';
    db_conn.promise().query(sqlCmd,[req.body.isFinished, todoId])
        .then(([results])=>{
            console.log(results);
            res.status(200).json(results);
        })
        .catch((err) => {
            console.log(err);
            res.status(500).json({message: 'INTERNAL_SERVER_ERR'});
        });
}