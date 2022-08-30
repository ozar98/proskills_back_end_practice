// index.js
let express = require('express');

// . in this folder
let routes = require('./routes/person.routes');

let app = express();

app.use(express.json());
app.use('/api', routes);

app.listen(3000, function() {
	console.log('Server is starting on port 3000!');
});