import express from 'express'
import { saveToFile } from '../services.js'
import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'

const __fileName = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__fileName)
const pathToJSON = path.join(__dirname,  '..', '..', 'data', 'employees.json')

let db
try {
    const fileData = fs.readFile(pathToJSON, 'utf-8', (err) => {
        console.error(err)
    })

    const valid = fileData ? fileData : '[]'
    db = JSON.parse(valid)
} catch(err) {
    console.error('Error: ', err.message);
    db = []
}

const reportsRouter = express.Router()

reportsRouter.get('/', (req, res) => {
    res.json(db.reports || db)
})

reportsRouter.post('/', async (req, res, next) => {
    try {
        const body = req.body
    
        if (!body || Object.keys(body).length === 0) return res.status(400).json('ОШИБКА: тело запроса пустое!')
        
        if (db.reports) {
            db.reports.push(body)
        } else {
            db.push(body)
        }
    
        await saveToFile('reports', db)
    
        res.status(201).json(body)
    } catch(err) {
        next(err)
    }
})

reportsRouter.get('/:wasWritten', (req, res) => {
    const reportDate = req.params.wasWritten
    const reportsList = db.reports || db

    const foundReport = reportsList.find(r => r.wasWritten === reportDate)

    if (!foundReport) return res.status(404).json('ОШИБКА: отчета за это число не существует')
    
    res.json(foundReport)
})

export default reportsRouter