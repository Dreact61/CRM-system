import express from 'express'
import { saveToFile } from '../services.js'
import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'

const __fileName = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__fileName)
const pathToJSON = path.join(__dirname,  '..', '..', 'data', 'reports.json')

let db
try {
    const fileData = fs.readFileSync(pathToJSON, 'utf-8')

    if (!fileData.trim()) {
        db = {reports: []}
    } else {
        db = JSON.parse(fileData.trim())
    }
    console.log(`Файл ${__fileName} успешно прочитан`)
} catch(err) {
    console.error('Error: ', err.message);
    db = {reports: []}
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

export default reportsRouter