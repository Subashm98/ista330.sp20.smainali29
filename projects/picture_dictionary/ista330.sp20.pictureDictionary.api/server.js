// dependencies
const express = require('express');
var bodyParser = require('body-parser')
const url = require('url');
const fileUpload = require('express-fileupload');
var cors = require('cors');
const db = require('./db.js');

//create the server
const app = express();
const port = 4002;

// parse application/json
app.use(bodyParser.json());

app.use(fileUpload());
app.use(cors());




app.post('/theme', (request, response) => {
  let date = new Date(Date.now()).toString();
  console.log(date + " - new theme - " + request.body.theme);
  db.saveTheme(request.body.theme)
    .then(id => response.status(200).json(id))
    .catch(e => response.status(500).send('The theme could not be added.'));

});

app.post('/image/:contentId', (request, response) => {
  console.log(`/image/${ request.params.contentId} received.`);

  let imageFile = request.files.image;

  db.saveImage(request.params.contentId)
  .then(image => {imageFile.mv('./data/' + image.name);return image;})
  .then(image => response.json(image.id))
  .catch(e => {
    console.log(e);
    response.status(500).send('The image could not be saved.');
  });
});

app.put('/image/:imageId', (request, response) => {
  console.log(`/image/${ request.params.imageId} received.`);

  let imageFile = request.files.image;

  db.getImageName(request.params.imageId)
  .then(name => {imageFile.mv('./data/' + name);})
  .then(() => response.status(200).json({message:'The image updated.'}))
  .catch(e => {
    console.log(e);
    response.status(500).send('The image could not be saved.');
  });
});
// saveLabel(name, x, y, number, imageId)
app.post('/label', (request, response) => {
  let date = new Date(Date.now()).toString();
  console.log(date + " - new word - " + request.body.name
                                      + "-" + request.body.x
                                      + "-" + request.body.y
                                      + "-" + request.body.number
                                      + "-" + request.body.imageId);
  // TODO: save the lable into the database and return the id of the label ** done ** 
  db.saveLabel(request.body.name,request.body.x,request.body.y,request.body.number,request.body.imageId)
    .then(x => {console.log("id: " + x); response.json(x)})
    .catch(e => {
      console.log(e);
      response.status(500).send('label could not be saved.');
    });
});

app.put('/label', (request, response) => {
  let date = new Date(Date.now()).toString();
  console.log(date + " - new word - " + request.body.name
                                      + "-" + request.body.id
                                      );
  // TODO: update the label name in the databse ** done **
  db.updateLabel(request.body.name, request.body.id)
  .then(id => response.json(id))
  .catch(e => {
    console.log(e);
    response.status(500).send('label could not be updated.');
  });
  
});

app.get('/contents', (request, response) => {
  let date = new Date(Date.now()).toString();
  console.log('/contents');
  db.getAllThemes()
  .then(x => response.json(x))
  .catch(e => response.status(500).send('The themes could not be retrieved.'));
});

app.get('/labels/:imageId', (request, response) => {
  let date = new Date(Date.now()).toString();
  let imageId = request.params.imageId;
  console.log('/labels/' + imageId);
   // TODO: get all the labels for the given imageId
  db.getLabels(imageId)
    .then(x => response.json(x))
    .catch(e => response.status(500).send('The label could not be retrieved.'));
 
});

app.get('/pages/:contentId', (request, response) => {
  let contentId = Number(request.params.contentId);
  db.getImageIds(contentId)
  .then(x => response.json(x.map(y => y.id)))
  .catch(e => response.status(404).send('No images were found for the content.'));
});


app.get('/pages/:contentId/image/:imageId', (request, response) => {
  let date = new Date(Date.now()).toString();
  console.log('pages...');
  let contentId = Number(request.params.contentId);
  let photoId = Number(request.params.imageId);
  console.log(`${contentId} ${photoId}`);
  db.getImageName(photoId)
  .then(x => {
    console.log('sending file ...');
    response.sendFile(__dirname + '/data/' + x);
  })
  .catch(e => response.status(404).send('No image were found.'));


});

app.get('/words/:contentId/:imageId/:objectX/:objectY', (request, response) => {
  let date = new Date(Date.now()).toString();
  console.log('pages...');
  let contentId = Number(request.params.contentId);
  let imageId = Number(request.params.imageId);
  let objectX = Number(request.params.objectX);
  let objectY = Number(request.params.objectY);
  console.log(`${contentId} ${imageId}`);
  // TODO: get the word for the given imageId, objectX and objectY
  db.getLabel(imageId, objectX, objectY)
    .then(result => {
      if(result){
        return response.json({name:result.name, number: result.number})
      }else{
        response.status(404).send('No word match found.');
      }
      
    })
    .catch(e => {
      response.status(404).send('No word found.');
    });


});

// start the server
app.listen(port, () => console.log('Listening on port ' + port));

