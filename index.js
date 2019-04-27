const express = require('express');
let {PythonShell} = require('python-shell')
const app = express();

app.use(express.static('public'));
app.set('view engine', 'ejs');
app.listen(3000,()=>{
    console.log('Listening on 3000');
})
app.get("/", runpy);
function runpy(req, res){
 var options = {
    mode: 'text',
    encoding: 'utf8',
    pythonPath: '/usr/bin/python3',
    pythonOptions: ['-u'], // get print results in real-time
    scriptPath: '.pages/',
    args: ['5', '9']

  };

   

  var test = new PythonShell('add.py', options);
  test.on('message',function(message){
      console.log(message);
  });
  res.render('index');
}