// dependencies
const express = require('express');
const url = require('url');
// const calculator = require('./calculator.js');
const cors = require('cors')

//create the server
const app = express(); 
const port = 3001;
app.use(cors())


var tableOfContent = [
                        {id: 1, theme: "Supermarket", imageId:1},
                        {id: 2, theme: "Restaurant", imageId:2},
                        {id: 3, theme: "Housework", imageId: 3},
                        {id: 4, theme: "Weather", imageId: 4}
                     ];


var wordbank = [
                {id: 1, words:[
                    {id:1,  meaning: "deli counter"},
                    {id:2,  meaning: "frozen foods"},
                    {id:3,  meaning: "freezer"},
                    {id:4,  meaning: "dairy products"},
                    {id:5,  meaning: "milk"},
                    {id:6,  meaning: "shelf"},
                    {id:7,  meaning: "scale"},
                    {id:8,  meaning: "shopping basket"},
                    {id:9,  meaning: "produce"},
                    {id:10, meaning: "aisle"},
                    {id:11, meaning: "baked goods"},
                    {id:12, meaning: "bread"},
                    {id:13, meaning: "canned goods"},
                    {id:14, meaning: "beverages"},
                    ]
                    
                },
                {id: 2, words:[
                    {id:1,  meaning: "eat"},
                    {id:2,  meaning: "drink"},
                    {id:3,  meaning: "serve"},
                    {id:4,  meaning: "cook"},
                    {id:5,  meaning: "order"},
                    {id:6,  meaning: "clear"},
                    {id:7,  meaning: "pay"},
                    {id:8,  meaning: "set(the table)"},
                    {id:9,  meaning: "give"},
                    {id:10, meaning: "take"},
                    {id:11, meaning: "spread"},
                    {id:12, meaning: "hold"},
                    {id:13, meaning: "light"},
                    {id:14, meaning: "burn"},
                    ]
                            
                }
];


app.get('/contents', (request , response) => {
    //console.log("hello");
    response.json(tableOfContent);
 });  

app.get('/contents/:contentId', (request , response) => {
    let contentId = request.params.contentId;
    console.log("geting wordbank: " + contentId);
    for (var i=0; i < wordbank.length; i++) {
        if (wordbank[i].id === contentId) {
            console.log(wordbank[i]);
            response.json(wordbank[i]);
        }
    }

});


app.get('/pages/:contentId/image/:imageId', (request , response) => {
    console.log("getting page");
    let contentId = request.params.contentId;
    let imageId   = request.params.imageId;
    console.log(contentId + " " + imageId);
    for (var i=0; i < tableOfContent.length; i++) {
        //console.log("<>* " + tableOfContent[i].id);
        if (tableOfContent[i].id == contentId) {
            //console.log("**. " );
            if(imageId == tableOfContent[i].imageId){
                response.json(tableOfContent[i]);
                return;

            }
        }
    }

    response.status(404).send('Not Found');


});

app.get('/contents/:contentId/:imageId/:objectX/:objectY', (request , response) => {

});

// start the server
app.listen(port, ()=> console.log (  'Listening on port'  + port ));

