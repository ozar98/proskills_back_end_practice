let express = require('express');

let router = require('./routes/person.routes');

let app=express();

app.use(express.json());
app.use('/api', router);

app.listen(3000, ()=> {
    console.log('Server started on port: 3000');
})