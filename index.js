var express = require("express");
var app = express();
var port = process.env.PORT || 3700;

app.set("views", __dirname + "/views");
app.set("view engine", "jade");
app.engine("jade", require("jade").__express);
app.get("/", fnction(req,rest){
    res.render("page");
});

app.use(express.static(__dirname+'/public'));

var midPort=app.listen(port, function () {
    console.log('Node js listning on port ' + port)
})

var io = require('socket.io').listen(midPort);
io.sockets.on('connection',function(socket){
    socket.emit('message', { message:'Welcome to the Real Time Chat Engine'});
    socket.on('send', function(data){
        io.sockets.emit('message',data)
    })
})