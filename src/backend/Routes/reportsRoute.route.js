import express from 'exprress'
import reportsData from '../data/reports.json' with {type: "json"}
import { saveToFile } from '../services'

const reportsRouter = express.Router()

const db = reportsData

reportsRouter.get('/', (req, res) => {
    res.json(db.reports || db)
})

reportsRouter.post('/', async (req, res, next) => {
    const body = req.body

    if (!body || Object.keys(body).length === 0) return res.status(400).json('Тело запроса пустое!')
    
    if (db.reports) {
        db.reports.push(body)
    } else {
        db.push(body)
    }

    await saveToFile('reports', db)

    res.status(201).json(body)
})

reportsRouter.get('/', (req, res, date) => {
    const reportDate = req.params.wasWritten
    const exists = db.reports.find(reportDate === date)

    if (!exists) return res.status(404).json('Отчета за это число не существует')
    
    if (exists) {
        return exists
    } else {
        return db.find(reportDate === date)
    }
})

export default reportsRouter