const express = require('express')
const dotenv = require('dotenv')
const morgan = require('morgan')
const exec = require('child_process').exec
const fs = require('fs')
const path = require('path')
const bodyParser = require('body-parser');
require('colors')

dotenv.config({ path: path.resolve(__dirname, '../../config/server.env') })
dotenv.config({ path: path.resolve(__dirname, '../../config/api.env') })

const app = express();
// use this for body parser
// app.use(express.json())
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use(morgan(':method :url :status :res[content-length] - :response-time ms'))

const router = require('./router')

app.use('/api', router)
// app.get('/', (req, res) => res.send('Hello World!!!'))
// 这里主要是为了处理pkg 打包带来的问题
app.get('/static/*', async (req, res, next) => {
  let ext = req.path.split('.');
  const length = ext.length;
  ext = ext[length - 1];
  ext = {js: 'application/javascript', css: 'text/css', gif: 'image/gif', woff: 'font/woff'}[ext]
  res.setHeader('Content-Type', ext || 'text/text') // 如果不设置返回类型，会变成二进制文件
  res.send(await fs.readFileSync(path.resolve(__dirname, `../../dist${req.path}`)))
  res.end()
})
// app.use(express.static(path.resolve(__dirname, '../../dist')))

// 这里是为了解决前端history路由的问题

app.use('/*', async (req, res) => {
  res.setHeader('Content-Type', 'text/html; charset=UTF-8') // 如果不设置返回类型，会变成二进制文件
  res.send(await fs.readFileSync(path.resolve(__dirname, '../../dist/index.html')))
  res.end()
})

const PORT = process.env.PORT

app.listen(PORT, _ => {
  console.log(`Server running in ${process.env.NODE_ENV} mode on ${PORT}`.yellow.bold)
  // exec('ls', (err, std, str) => {
  //   console.log(std.green)
  // })
})
