const Task = require('../db/models/task')

const extractDoc = output => {
  const extractedDoc = {}
  Object.keys(output._doc)
    .filter(key => !/^_/.test(key))
    .map(key => (extractedDoc[key] = output._doc[key]))
  return extractedDoc
}

exports.addTask = ({ title, description }) =>
  new Promise(async (resolve, reject) => {
    try {
      if (!title) {
        resolve({
          success: false,
          message: 'title is require'
        })
        return
      }

      const newTask = new Task({
        title,
        description
      })

      const task = await newTask.save()

      resolve({
        success: true,
        data: extractDoc(task)
      })
    } catch (err) {
      reject(err)
    }
  })

exports.getTask = ({ id: taskId }) =>
  new Promise(async (resolve, reject) => {
    try {
      if (!taskId) {
        resolve({
          success: false,
          message: 'id is require'
        })
        return
      }

      const task = await Task.findById(taskId)

      resolve({
        success: true,
        data: extractDoc(task)
      })
    } catch (err) {
      reject(err)
    }
  })

exports.getTasks = () =>
  new Promise(async (resolve, reject) => {
    try {
      const tasks = await Task.find()

      resolve({
        success: true,
        data: tasks.map(extractDoc)
      })
    } catch (err) {
      reject(err)
    }
  })

exports.updateTask = ({ id: taskId, description }) =>
  new Promise(async (resolve, reject) => {
    try {
      if (!taskId) {
        resolve({
          success: false,
          message: 'id is require'
        })
        return
      }
      const task = await Task.findById(taskId)
      task.set({ description })
      await task.save()

      resolve({
        success: true
      })
    } catch (err) {
      reject(err)
    }
  })

exports.deleteTask = ({ id: taskId }) =>
  new Promise(async (resolve, reject) => {
    try {
      if (!taskId) {
        resolve({
          success: false,
          message: 'id is require'
        })
        return
      }
      const task = await Task.findById(taskId)
      task.deleteOne()

      resolve({
        success: true
      })
    } catch (err) {
      reject(err)
    }
  })
