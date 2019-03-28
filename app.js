const express = require('express');
const fileUpload = require('express-fileupload');
var bodyParser=require("body-parser");
const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static('public'))
app.engine('html',require('ejs').renderFile);
app.set("view engine","html");
// default options
app.use(fileUpload());
app.get("/",(req,res)=>{
    res.render("index.html");
})
app.post('/upload', function(req, res) {
    console.log("upload entered");
  if (Object.keys(req.files).length == 0) {
    return res.status(400).send('No files were uploaded.');
  }

  // The name of the input field (i.e. "sampleFile") is used to retrieve the uploaded file
  let sampleFile = req.files.sampleFile;

  // Use the mv() method to place the file somewhere on your server


  uploadPath = '/home/pujitha/Desktop/myweb-projects/expressupload' + '/uploads/' + sampleFile.name;
  sampleFile.mv(uploadPath, function(err) {
    if (err)
      return res.status(500).send(err);

    res.send('File uploaded!');
  });
});

app.listen(5000,(req,res)=>{
    console.log("listening");
})