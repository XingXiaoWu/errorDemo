const express = require('express')
const app = express()
const port = 1234

const {analyzeError} = require('./utils/utils')

// 解析map
app.get('/errorReceive',async (req, res) => {
    const {query} = req
    const {line,column,url} = query
    let result = await analyzeError(url,line,column)
    // 解析数据
    res.send(result)
})

// 解析map
app.get('/run', (req, res) => {
    // 解析数据
    res.send('running')
})

// 启动项目
app.listen(port, () => console.log(`Example app listening on port ${port}!`))

