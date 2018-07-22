const express = require('express')
const app = express()
var tweets = [
    {
        id: 1,
        name: "@nolifelover",
        message: "hello world twitter 1 #hello #world",
        created: "2018-07-22 12:07:20"
    },
    {
        id: 2,
        name: "@nolifelover",
        message: "hello world twitter 2 #nodejs #memory",
        created: "2018-07-22 12:10:20"
    }
]

app.get('/', (req, res) => {
    let result = {
        status: 200,
        message: "twitter api version 5.0"
    }
    res.json(result)
})

app.get('/api/tweets', (req, res) =>{
    let result = {
        status: 200,
        datas: tweets
    }
    res.json(result)
})

app.post('/api/tweets', (req, res) =>{
    let data = req.body
    tweets.push(data)
    let result = {
        status: 200,
        message: "success insert tweet"
    }
    res.json(result)
})

app.get('/api/search', (req, res) =>{
    let q = req.query.q
    let result = {
        status: 200,
        datas: []
    }
    tweets.forEach((tweet) =>{
        if(tweet.message.indexOf(q) > -1){
            result.datas.push(tweet)
        }
    })
    res.json(result)
})

app.listen(3000, () => console.log('Example app listening on port 3000!'))