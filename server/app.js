const express = require('express')
const path = require('path')
const app = express()

// 注册中间件
// app.use('/dist', express.static(path.join(__dirname, 'dist')))
app.use(express.static('dist'))

app.listen(3000, () => {
  console.log('server running at http://127.0.0.1:3000')
})