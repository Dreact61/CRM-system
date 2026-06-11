import express from 'express'
import { saveToFile } from '../services.js'
import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'

const __fileName = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__fileName)
const pathToJSON = path.join(__dirname,  '..', '..', 'data', 'goods.json')

let db
try {
    const fileData = fs.readFileSync(pathToJSON, 'utf-8')

    if (!fileData.trim()) {
        db = {goods: []}
    } else {
        db = JSON.parse(fileData.trim())
    }
    console.log(`Файл ${__fileName} успешно прочитан`)
} catch(err) {
    console.error('Error: ', err.message);
    db = []
}


const goodsRouter = express.Router()

goodsRouter.get('/', (req, res) => {
    res.json(db.goods || db)
})

goodsRouter.post('/', async (req, res, next) => {
    try {
        const newGood = req.body
    
        if (!newGood || Object.keys(newGood).length === 0) return res.status(404).json('ОШИБКА: тело запроса не может быть пустым')
    
        if (db.goods) {
            db.goods.push(newGood)
        } else {
            db.push(newGood)
        }
    
        await saveToFile('goods', db)
    
        res.status(201).json(newGood)
    } catch(err) {
        next(err)
    }
})

goodsRouter.get('/:id', (req, res) => {
    const targetId = req.params.id
    const goodsList = db.goods || db

    const foundGood = goodsList.find(g => g.id === targetId)

    if(!targetId) return res.status(404).json('ОШИБКА: Товара с данным id не существует')

    res.json(foundGood)
})

export default goodsRouter