const express = require('express')
const app = express()
const Sequelize = require('sequelize')
const Op = Sequelize.Op
const moment = require('moment')
/*const sequelize = new Sequelize('database','username','password',{
  dialect: 'sqlite',
  storage: './database.sqlite'
})*/
//connect to sqlite database
const sequelize = new Sequelize('sqlite:./database.sqlite')
//define model and table
const Tweet = sequelize.define('tweets',{
  id: {
    type: Sequelize.INTEGER,
    primaryKey: true,
    autoIncrement:true,
    unique: true
  },
  name: Sequelize.STRING,
  message: Sequelize.STRING,
  created: Sequelize.STRING
})

//create table
sequelize.sync()

var bodyParser = require('body-parser');
var multer = require('multer'); // v1.0.5
var cors = require('cors');
var upload = multer(); // for parsing multipart/form-data
app.use(cors())
app.use(bodyParser.json()); // for parsing application/json
app.use(bodyParser.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded

app.get('/', (req, res) => {
    let result = {
        status: 200,
        message: "twitter api version 5.0"
    }
    res.json(result)
})

app.get('/api/tweets', (req, res) =>{
    let tweets = []
    let result = {}
    Tweet.findAll().then((datas)=>{
      tweets =  datas;
      result = {
          status: 200,
          datas: tweets
      }
      res.json(result)
    },(err)=>{
      result = {
        status: 500,
        message: "internal server error"
      }
      res.json(result)
    })
})

app.post('/api/tweets', (req, res) =>{
    let data = req.body
    console.log(data)
    let tweet = Tweet.create({
      name: data.name,
      message: data.message,
      created: moment().format("YYYY-MM-DD HH:mm:ss")
    }).then(()=>{
      let result = {
          status: 200,
          message: "success insert tweet"
      }
      res.json(result)
    },(err)=>{
      let result = {
          status: 500,
          message: "internal server error"
      }
      res.json(result)
    })
})

app.get('/api/search', (req, res) =>{
    let q = req.query.q
    let tweets = []
    Tweet.findAll({
      where: {
        message: {
          [Op.like] : "%"+q+"%"
        }
      }
    }).then((datas)=>{
      tweets = datas
      let result = {
          status: 200,
          datas: tweets
      }
      res.json(result)
    })
})

app.listen(3000, () => console.log('Example app listening on port 3000!'))
