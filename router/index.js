const Router = require('koa-router')
const router = new Router()

const Tasks = require('../api/task')

const catcher = err => console.error(err)

router.post('/add-task', async ctx => {
  try {
    const result = await Tasks.addTask({ ...ctx.request.body })
    ctx.body = result
  } catch (err) {
    catcher(err)
    ctx.status = 500
    ctx.body = 'Internal error'
  }
})

router.get('/task/:id', async ctx => {
  try {
    const result = await Tasks.getTask({ id: ctx.params.id })
    ctx.body = result
  } catch (err) {
    catcher(err)
    ctx.status = 500
    ctx.body = 'Internal error'
  }
})

router.get('/tasks', async ctx => {
  try {
    const result = await Tasks.getTasks()
    ctx.body = result
  } catch (err) {
    catcher(err)
    ctx.status = 500
    ctx.body = 'Internal error'
  }
})

router.patch('/update-task', async ctx => {
  try {
    const result = await Tasks.updateTask({ ...ctx.request.body })
    ctx.body = result
  } catch (err) {
    catcher(err)
    ctx.status = 500
    ctx.body = 'Internal error'
  }
})

router.patch('/delete-task', async ctx => {
  try {
    const result = await Tasks.deleteTask({ ...ctx.request.body })
    ctx.body = result
  } catch (err) {
    catcher(err)
    ctx.status = 500
    ctx.body = 'Internal error'
  }
})

router.get('/', async ctx => {
  ctx.body = 'BACKEND TODO APPLICATION'
})

module.exports = router
