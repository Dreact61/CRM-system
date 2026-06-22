import express from 'express'
import client from '../server.js'

const goodsRouter = express.Router()

goodsRouter.get('/', async (req, res) => {
    try {
        const response = await client.query('SELECT * FROM GOODS')
        res.status(200).json(response.rows)
    } catch (err) {
        res.status(500).json("ОШИБКА: ", err.message)
    }
})

export default goodsRouter