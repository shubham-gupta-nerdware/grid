const express = require('express');
const app = express();
const port = process.env.PORT || 3000;
const path = require('path');
const http = require('http');
const bodyParser = require('body-parser');
app.use(express.static(__dirname + '/public', { maxage: '1000d' }));
app.set('views', __dirname + '/public/views');
app.engine('html', require('ejs').renderFile);
let server = http.createServer(app).listen(3000);

//for Post Method
app.use(bodyParser.urlencoded({ extended: false,limit:'250mb' }));



console.log('Discover amazing things to do on Woovly on Port:' + port);



app.get('/',function(req,res){
        res.render('login.html', {});
})



app.get('/image', function (req, res) {
    const data ={};
    data.imgId =-1;
    res.render('index.html',  { dt: data });
});


app.get('/image/:id',function(req,res){
    const data ={};
    data.imgId =req.params.id;
    res.render('index.html', { dt: data });
});


