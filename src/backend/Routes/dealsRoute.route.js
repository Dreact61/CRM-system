import express from 'express'
import { saveToFile } from '../services.js'
import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'

const __fileName = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__fileName)
const pathToJSON = path.join(__dirname,  '..', '..', 'data', 'deals.json')

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

const dealsRouter = express.Router()

dealsRouter.get('/', (req, res) => {
    res.json(db.deals || db)
})

dealsRouter.post('/', async (req, res, next) => {
    try {
        const body = req.body
    
        if (!body || Object.keys(body).length === 0) return res.status(400).json('ОШИБКА: тело запроса пустое!')
        
        if (db.deals) {
            db.deals.push(body)
        } else {
            db.push(body)
        }
    
        await saveToFile('deals', db)
    
        res.status(201).json(body)
    } catch(err) {
        next(err)
    }
})

dealsRouter.get('/:dealId', (req, res) => {
    const id = req.params.dealId
    const dealsList = db.deals || db

    const foundDeal = dealsList.find(d => d.dealId === id)

    if (!foundDeal) return res.status(404).json('ОШИБКА: сделки с данным id не существует')
    
    res.json(foundDeal)
})

export default dealsRouter