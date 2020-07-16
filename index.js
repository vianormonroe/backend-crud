const Koa = require('koa')
const app = new Koa()

require('./db')

const config = require('./config')
const { BASE_URL } = config

const koaBody = require('koa-body')
const router = require('./router')

app.use(koaBody())
app.use(router.routes())
app.use(router.allowedMethods())

app.listen(3000, () => {
  console.log(`listening ${BASE_URL}`)
})