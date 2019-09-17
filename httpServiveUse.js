var http = require('http');
var querystring = require('querystring');
var fs = require('fs');
var data = {};
var arr=[];

function readFile() {
    var file = 'onmyoji.json';
    fs.readFile(file,function (err,file) {
        if(err){
            console.log('err')
        }else{
            data = file.toString();
        }
    })
}
readFile();


var server = http.createServer(function (req, res) {
    res.statusCode = 200;
    res.setHeader('Content-Type', 'text/plain');
    res.setHeader('Access-Control-Allow-Origin','*');
    res.end(JSON.stringify(data))
    /*req.on('data',function (chunk) {
        post +=chunk;
        console.log(post);
    });
    req.on('end',function () {
        post = querystring.parse(post,'&','=');
        console.log(post);
        arr.push(post);
        res.end(JSON.stringify(arr))
    })*/
}).listen(3000);


