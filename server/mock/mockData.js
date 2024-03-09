const { TaskStatus, Priority } = require('../controllers/constants')
// const mockToDo = [
//     { id: 1, title: 'Title A', status: TaskStatus.ToDo, position: 0, description: 'description', priority: Priority.Hight, due_date: '2024-03-14' },
//     { id: 2, title: 'Title B', status: TaskStatus.ToDo, position: 1, description: 'description', priority: Priority.Hight, due_date: '2024-03-14' },
//     { id: 3, title: 'Title C', status: TaskStatus.ToDo, position: 2, description: 'description', priority: Priority.Hight, due_date: '2024-03-14' },
//     { id: 4, title: 'Title D', status: TaskStatus.ToDo, position: 3, description: 'description', priority: Priority.Hight, due_date: '2024-03-14' },
// ]
// const mockInProgress = [
//     { id: 5, title: 'Title E', status: TaskStatus.InProgress, position: 0, description: 'description', priority: Priority.Hight, due_date: '2024-03-14' },
//     { id: 6, title: 'Title F', status: TaskStatus.InProgress, position: 1, description: 'description', priority: Priority.Hight, due_date: '2024-03-14'  },
// ]
// const mockDone = [
//     { id: 7, title: 'Title G', status: TaskStatus.Done, position: 0, description: 'description', priority: Priority.Hight, due_date: '2024-03-14' },
//     { id: 8, title: 'Title H', status: TaskStatus.Done, position: 1, description: 'description', priority: Priority.Hight, due_date: '2024-03-14' },
//     { id: 9, title: 'Title I', status: TaskStatus.Done, position: 2, description: 'description', priority: Priority.Hight, due_date: '2024-03-14' },
// ]
// const mockCancelled = [
//     { id: 10, title: 'Title J', status: TaskStatus.Cancelled, position: 0, description: 'description', priority: Priority.Hight, due_date: '2024-03-14' },
//     { id: 11, title: 'Title K', status: TaskStatus.Cancelled, position: 1, description: 'description', priority: Priority.Hight, due_date: '2024-03-14' },
//     { id: 12, title: 'Title L', status: TaskStatus.Cancelled, position: 2, description: 'description', priority: Priority.Hight, due_date: '2024-03-14' },
//     { id: 13, title: 'Title M', status: TaskStatus.Cancelled, position: 3, description: 'description', priority: Priority.Hight, due_date: '2024-03-14' },
//     { id: 14, title: 'Title N', status: TaskStatus.Cancelled, position: 4, description: 'description', priority: Priority.Hight, due_date: '2024-03-14' },
// ]

const mockData = [
    { id: 1, title: 'Title A', status: TaskStatus.ToDo, position: 0, description: 'description', priority: Priority.Hight, due_date: '2024-03-14' },
    { id: 2, title: 'Title B', status: TaskStatus.ToDo, position: 1, description: 'description', priority: Priority.Hight, due_date: '2024-03-14' },
    { id: 3, title: 'Title C', status: TaskStatus.ToDo, position: 2, description: 'description', priority: Priority.Hight, due_date: '2024-03-14' },
    { id: 4, title: 'Title D', status: TaskStatus.ToDo, position: 3, description: 'description', priority: Priority.Hight, due_date: '2024-03-14' },

    { id: 5, title: 'Title E', status: TaskStatus.InProgress, position: 0, description: 'description', priority: Priority.Hight, due_date: '2024-03-14' },
    { id: 6, title: 'Title F', status: TaskStatus.InProgress, position: 1, description: 'description', priority: Priority.Hight, due_date: '2024-03-14'  },

    { id: 7, title: 'Title G', status: TaskStatus.Cancelled, position: 0, description: 'description', priority: Priority.Hight, due_date: '2024-03-14' },
    { id: 8, title: 'Title H', status: TaskStatus.Cancelled, position: 1, description: 'description', priority: Priority.Hight, due_date: '2024-03-14' },
    { id: 9, title: 'Title I', status: TaskStatus.Cancelled, position: 2, description: 'description', priority: Priority.Hight, due_date: '2024-03-14' },

    { id: 10, title: 'Title J', status: TaskStatus.Done, position: 0, description: 'description', priority: Priority.Hight, due_date: '2024-03-14' },
    { id: 11, title: 'Title K', status: TaskStatus.Done, position: 1, description: 'description', priority: Priority.Hight, due_date: '2024-03-14' },
    { id: 12, title: 'Title L', status: TaskStatus.Done, position: 2, description: 'description', priority: Priority.Hight, due_date: '2024-03-14' },
    { id: 13, title: 'Title M', status: TaskStatus.Done, position: 3, description: 'description', priority: Priority.Hight, due_date: '2024-03-14' },
    { id: 14, title: 'Title N', status: TaskStatus.Done, position: 4, description: 'description', priority: Priority.Hight, due_date: '2024-03-14' },
]

module.exports = { mockData }