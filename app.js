const path = require('path');
let {PythonShell} = require('python-shell')
const bodyParser = require('body-parser');
const express = require('express');
const app = express();
 
app.use(express.static('public'));
app.use(bodyParser.urlencoded({ extended: true }));
app.get('/', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'pages/index.html'));
});

app.post('/', function (req, res){
    let file = req.body.file;
    var options = {
        mode: 'text',
        encoding: 'utf8',
        pythonPath: '/usr/bin/python3',
        pythonOptions: ['-u'], // get print results in real-time
        scriptPath: './pages/',
        args: ['--image='+file]
    
      };
  var test = new PythonShell('mask_rcnn.py', options);
  test.on('message',function(message){
      console.log(message);
  });
  setTimeout(function () {
    console.log('timeout completed'); 
    res.sendFile(path.resolve('file:///home/shashank/fyp/pages', file.split('.')[0]+'_mask_rcnn_out_py.jpg'));
}, 3000); 
  
})
 
app.listen(3000, function () {
    console.log(' app listening on port 3000!')
  })