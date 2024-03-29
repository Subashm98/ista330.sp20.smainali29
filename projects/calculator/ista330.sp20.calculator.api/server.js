// dependencies
const express = require('express');
const url = require('url');
const calculator = require('./calculator.js');
const cors = require('cors')

//create the server
const app = express(); 
const port = 3001;
app.use(cors())
// the methods
app.get('/', (request , response) => {
   let expression = request.query.expression;
   response.send(expression + " = " + calculator.calculate(expression));
});

// start the server
 app.listen(port, ()=> console.log (  'Listening on port'  + port ));