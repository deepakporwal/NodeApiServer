const express = require('express');
const app = express();
const fs = require('fs');
const port = 3000;

// For parsing application/json
app.use(express.json()); 

// For parsing application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }));

app.get('/',(req,res)=>{
    fs.readFile('post.json', 'utf8', (err, data) => {
        if (err) {
          console.error(err);
          return;
        }
        console.log(data);
      });
    res.send('Hello Node & Express !'); 
});

app.post('/add', function (request,response){

    var data = fs.readFileSync('post.json');
    var myObject= JSON.parse(data);
    myObject.push(request.body);
    console.log(myObject);

    var newData = JSON.stringify(myObject);
    fs.writeFile('post.json', newData, err => {
        // error checking
        if(err) throw err;
        
        console.log("New data added");
    });   
    response.status(200).send('new data added')    

    response.end();
});

app.get('/view',(req,res)=>{
    var data = fs.readFileSync('get.json');
    res.write(data);
    res.end();
})

app.listen(port,()=>{
    console.log(`Node server started at port : ` + port);
})