import fs from 'fs/promises'
import path from 'path'
import { fileURLToPath } from 'url'

const __dirName = path.dirname(fileURLToPath(import.meta.url))

export async function saveToFile(fileName, data) {
    try {
        const filePath = path.join(__dirName, '..', 'data', `${fileName}.json`)
        await fs.writeFile(filePath, JSON.stringify(data, null, 2), 'utf-8')
    } catch (err) {
        console.error('Ошибка записи файла')
        throw new Error(`Error: ${err.message}`)
    }
}
