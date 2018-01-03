const express = require ('express');
const app = express();
const router = express.Router();
const socket = require('socket.io');
const settings = require('./settings/dbase');
const path = require('path'); //node pacakge for file paths
const registration = require('./routes/registration')(router);
const bodyParser = require('body-parser')
const cors = require('cors')// cross origin middleware needed because we are developing on two servers 

//orm connection 
const mongoose = require('mongoose');
mongoose.Promise = global.Promise;
mongoose.connect(settings.uri, { useMongoClient: true },(err)=>{
    if (err){
        console.log('Could not connected to the vklink ', err);
    }else{
        console.log('connected to  : ' + settings.db);
    }
});

const server = app.listen(9000, () => {
    console.log('virtual klinik server is fired up and it has ears to listen for connection at port 9000');
});


app.use(cors({
    origin: 'http://localhost:4200'
}))
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))

// parse application/json
app.use(bodyParser.json())

app.use(express.static(__dirname + '/patient/dist/'));//static directory for angualr js -frontend 
//app.use(express.static(__dirname + '/public'));//static directory for frontend without angular
app.use('/registration',registration);//handles localhost/registration

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname + '/patient/dist/index.html'));
   // res.sendFile(path.join(__dirname + '/public/index.html'));
});

const io = socket(server);

io.on('connection', (socket) => {
    console.log('our websocket sever is fired up and is now ready to exchange messages to the front side', socket.id);
    socket.on('chat', (data) => {
        io.sockets.emit('chat', data);
    })

    socket.on('typing', (data) => {
        socket.broadcast.emit('typing', data);
    })
});

