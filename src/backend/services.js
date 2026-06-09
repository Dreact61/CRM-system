import fs from 'fs'
import path from 'path'

export function saveToFile(fileName, data) {
    try {
        const filePath = path.resolve(`./src/data/${fileName}.json`)
        fs.writeFile(filePath, JSON.stringify(data, null, 2), 'utf-8')
    } catch (err) {
        console.error('Ошибка записи файла')
        throw new Error(`Error: ${err.message}`)
    }
}