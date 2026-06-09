import express from 'express'

const employeesRouter = express.Router()

employeesRouter.get('/', (req, res) => {
    res.json(`Данные о сотрудниках запрошены`)
})

employeesRouter.post('/', (req, res) => {
    res.json(`Добавлен новый сотрудник в баз данных`)
})

employeesRouter.get('/', (req, res) => {
    res.json(`Запрошены данные о сотруднике ${req.params.name} ${req.params.lastName}`)
})

export default employeesRouter