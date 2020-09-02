const express= require('express');
const App =express();
const signUP=require('./router/signUp');
const signIn= require('./router/signIn');
const upload= require('./router/upload');
const videoList =require('./router/videoList');

const morgan =require('morgan');
const cors=require('cors');
const bodyParser=require('body-parser');
const mongoose =require('mongoose');

const checkAuth =require('./middlewares/check-auth');

mongoose.connect('mongodb://127.0.0.1/videoServer',{
    useCreateIndex: true,
    useNewUrlParser:true,
    useUnifiedTopology:true
});
mongoose.Promise= global.Promise;

App.use(morgan('dev'));
App.use(cors());
App.use(bodyParser.urlencoded({ extended: false}));
App.use(bodyParser.json());

//route
// App.get('/', (req,res)=>{
//     res.send("app is working now yaa.... ");
// });

App.use('/api/videos', express.static('media/uploads'));


App.use('/api/signUP', signUP);
App.use('/api/signIn', signIn);
App.use('/api/upload',checkAuth, upload);
App.use('/api/videoList',checkAuth , videoList);
module.exports=App;