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
    const fileData = fs.readFileSync(pathToJSON, 'utf-8')

    if (!fileData.trim()) {
        db = {employees: []}
    } else {
        db = JSON.parse(fileData.trim())
    }
    console.log(`Файл ${__fileName} успешно прочитан`)
} catch(err) {
    console.error('Error: ', err.message);
    db = []
}


const employeesRouter = express.Router()

employeesRouter.get('/', (req, res) => {
    res.json(db.employees || db)
})

employeesRouter.post('/', async (req, res, next) => {
    try {
        const body = req.body
    
        if (!body || Object.keys(body).length === 0) return res.status(400).json('ОШИБКА: тело запроса пустое!')
        
        if (db.employees) {
            db.employees.push(body)
        } else {
            db.push(body)
        }
    
        await saveToFile('employees', db)
    
        res.status(201).json(body)
    } catch(err) {
        next(err)
    }
})

employeesRouter.get('/:name', (req, res) => {
    const name = req.params.name
    const employeesList = db.employees || db

    const foundEmployee = employeesList.find(e => e.name === name)

    if (!foundEmployee) return res.status(404).json('ОШИБКА: сотрудника с таким именем нет в базе')
    
    res.json(foundEmployee)
})

export default employeesRouter