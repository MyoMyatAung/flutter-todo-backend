const db_conn = require('../config/database');
const crypto = require('crypto');
const jwt = require('jsonwebtoken');

const KEY = 'VILLA MYO';

exports.signup = (req,res)=>{
    console.log(req.body);
    let password = crypto.createHash('sha256').update(req.body.password).digest('hex');
    const sqlCmd = 'SELECT * FROM users WHERE username = ?';
    db_conn.promise().query(sqlCmd,[req.body.username])
        .then(([result])=>{
            console.log(result.length);
            if(result.length == 0){
                const sqlInsrtCmd = 'INSERT INTO users(username, password) VALUES(?,?)';
                db_conn.promise().query(sqlInsrtCmd,[req.body.username, password])
                    .then(([result])=>{
                        console.log(result);
                        res.status(201);
                        res.send("Success");
                    })
                    .catch((err) => {
                        console.log(err);
                    });
            }else{
                res.status(409);
                res.send("An user with that username already exists");
            }
        })
        .catch((err) => {
            console.log(err);
        });
}

exports.login = (req,res) => {
    console.log(req.body);
    let {username, password} = req.body;
    password = crypto.createHash('sha256').update(password).digest('hex');
    console.log(password);
    const sqlCmd = 'SELECT * FROM users WHERE username = ? AND password = ?';
    db_conn.promise().query(sqlCmd,[username, password])
        .then(([result])=>{
            console.log(result.length);
            if(result.length > 0){
                let payload = {
                    username: username,
                  };
                let token = jwt.sign(payload,KEY,{algorithm:'HS256',expiresIn:"10m"});
                res.send(token);
            }else{
                res.status(401)
                res.send("There's no user matching that");
            }
        })
        .catch((err)=>{
            console.log(err);
        });

}