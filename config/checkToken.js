const jwt = require('jsonwebtoken');

const KEY = 'VILLA MYO';

exports.checkToken = (req,res,next) => {
    
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];
    console.log('TOKEN : ', token);
    if(token == null) return res.status(401).send('Token is null');

    jwt.verify(token, KEY, (err, user)=>{
        console.log(err);
        if (err) return res.status(403).send('Forbidden');
        req.user = user;
        next();
    });
}