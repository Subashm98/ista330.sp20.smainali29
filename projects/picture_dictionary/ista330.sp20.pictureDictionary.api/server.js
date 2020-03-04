
// dependencies
const express = require('express');
const url = require('url');
var cors = require('cors');

//create the server
const app = express();
const port = 3001;

app.use(cors())

let themes = [
                {id: 1, name: "Supermarket"},
                {id: 2, name: "Restaurant"},
                {id: 3, name: "Housework"},
                {id: 4, name: "Weather"}
            ];

let images = [
                {id: 100, name: 'Supermarket.png', themeId: 1},
                {id: 101, name: 'Restaurant.png', themeId: 2},
                {id: 102, name: 'Housework.png', themeId: 3},
                {id: 103, name: 'Weather.png', themeId: 4}
            ];

let words = [
                {id:1, themeId: 1, imageId: 23, name:'scale', X: 145, Y:534, number: 7},
                {id:1, themeId: 1, imageId: 23, name:'aisle', X: 340, Y:210, number:10}
            ];
// the methods
app.get('/', (request, response) => {
   response.send('This is picture dictionary service.')
});

app.get('/words/:contentId/:imageId/:objectX/:objectY', (request, response) => {
  let themeId = Number(request.params.contentId);
  let imageId = Number(request.params.imageId);
  let objectX = Number(request.params.objectX);
  let objectY = Number(request.params.objectY);
  //TODO
   let word = words.find(x => x.themeId === themeId &&
                   x.imageId === imageId &&
                   (Math.abs(x.X - objectX) < 10) &&
                   (Math.abs(x.Y - objectY) < 10));
   if (word) {
     response.json({name: word.name, number: word.number});
   } else {
     response.status(404).send('No words were found.');
   }
});

app.get('/pages/:contentId/image/:imageId', (request, response) => {
   let themeId = Number(request.params.contentId);
   let imageId = Number(request.params.imageId);
   let image = images.find(x => x.id === imageId && x.themeId === themeId);
   if(image) {
       response.sendFile(__dirname + '/Data/' + image.name);
   } else {
     response.status(404).send('No images were found.')
   }

});

app.get('/pages/:contentId', (request, response) => {
  let themeId = Number(request.params.contentId);
  let ids = images.filter(x => x.themeId === themeId)
         .map(x => x.id);
    response.json(ids);
});

app.get('/contents', (request, response) => {
   response.json(themes);
});

// start the server
app.listen(port, () => console.log('Listening on port ' + port));


