const express = require('express')
const app = express()

app.get('/', (req, res) => {
    let result = {
        status: 200,
        message: "twitter api version 5.0"
    }
    res.json(result)
})

app.get('/api/tweets', (req, res) =>{

})

app.listen(3000, () => console.log('Example app listening on port 3000!'))