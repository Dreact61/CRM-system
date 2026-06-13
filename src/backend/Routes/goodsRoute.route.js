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

export default goodsRouter