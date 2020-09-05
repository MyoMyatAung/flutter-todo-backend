const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(cors());

app.get('/',(req,res)=>{
    res.send('Hello todo');
});

require('./routes/routes.todos')(app);

app.listen(3000,()=>{
    console.log(`Server is Running on PORT : ${3000}`);
});