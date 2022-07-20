const express = require('express')
const history = require('connect-history-api-fallback')
const compression = require('compression')

const app = express()
// 在其他中间件前使用
app.use(compression())

// 解决服务器上刷新问题
app.use('/', history())
app.use(express.static('dist'))

app.listen(3000, () => {
  console.log('server running at http://127.0.0.1:3000')
})
