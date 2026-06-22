import express from 'express'
import client from '../server.js'

const employeesRouter = express.Router()

employeesRouter.get('/', async (req, res) => {
    try {
        const response = await client.query('SELECT * FROM EMPLOYEES')
        res.status(200).json(response.rows)
    } catch (err) {
        res.status(500).json("ОШИБКА: ", err.message)
    }
})

export default employeesRouter