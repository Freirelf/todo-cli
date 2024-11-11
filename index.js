const fs = require('fs')
const path = require('path')

const tasksFile = path.join('tasks.json')

const addTask = (task) => {
  const tasks = JSON.parse(fs.readFileSync(tasksFile, 'utf-8'))
  tasks.push({ task, completed: false })
  fs.writeFileSync(tasksFile, JSON.stringify(tasks, null, 2))
  console.log('Task added successfully!')
}

const listTasks = () => {
  const tasks = JSON.parse(fs.readFileSync(tasksFile, 'utf-8'))
  if (tasks.length === 0) {
    console.log('No tasks Found')
  } else {
    tasks.forEach((task, index) => {
      console.log(`${index + 1}. ${task.task} - ${task.completed ? 'Completed' : 'Not Completed'}`)
    })
  }
}

const removeTask = (index) => {
  const tasks = JSON.parse(fs.readFileSync(tasksFile, 'utf-8'))
  if (index >= 1 && index <= tasks.length ) {
    const removed = tasks.splice(index -1 , 1)
    fs.writeFileSync(tasksFile, JSON.stringify(tasks, null, 2))
    console.log(`Task ${removed[0].task} removed successfully!`)
  } else {
    console.log('Invalid index')
  }
}

const [,, command, ...args] = process.argv

switch (command) {
  case 'add':
    addTask(args.join(' '))
    break
  case 'list':
    listTasks()
    break
  case 'remove': 
    removeTask(Number(args[0]))
    break
  default:
    console.log('Commands: add <task>, list, remove <index>')
    break
}