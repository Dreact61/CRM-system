import express from 'express'
import axios from 'axios'
import client from '../server.js'

const dealsRouter = express.Router()

dealsRouter.get('/', async (req, res) => {
    try {
        const response = await client.query('SELECT * FROM deals')
        const items = await client.query('SELECT * FROM deal_items')
        res.status(200).json({deals: response.rows, items: items.rows})
    } catch (err) {
        res.status(500).json({message: "ОШИБКА:", error: err.message})
    }
})

dealsRouter.post('/', async(req,res) => {
    try {
        const sentData = req.body
        if (!sentData || Object.keys(sentData).length === 0) return res.status(400).json({message:'ОШИБКА:', error:'тело запроса не модет быть пустым.'})
        
        await axios.post(`http://localhost:5000/api/deals`, sentData)
        res.status(201).json({
            message:'УСПЕХ: данные о сделке успешно отправлены на сервер.',
            success: true,
        })
    } catch (err) {
        res.status(400).json({success: false, message: err.message})
    }
})

export default dealsRouter