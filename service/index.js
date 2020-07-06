const express = require('express')
const app = express()
const port = 1234

let sourceMap = require('source-map')


app.get('/roles', (req, res) => {
    res.send({
        status:'0',
        message:'success',
        data:{
            roles:['1']
        }
    })
})

// 启动项目
app.listen(port, () => console.log(`Example app listening on port ${port}!`))

