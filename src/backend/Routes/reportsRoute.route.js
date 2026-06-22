import express from 'express'
import axios from 'axios'
import client from '../server.js'

const reportsRouter = express.Router()

reportsRouter.get('/', async (req, res) => {
    try {
        const response = await client.query('SELECT * FROM reports')
        res.status(200).json(response.rows)
    } catch (err) {
        res.status(500).json("ОШИБКА: ", err.message)
    }
})

reportsRouter.post('/', async(req,res) => {
    try {
        const {from_address, to_address, report, was_written, expires_at} = req.body
        if (!from_address || !to_address || !report || !was_written || !expires_at) return res.status(400).json({success: false, msg: 'ОШИБКА: тело запроса не модет быть пустым.'})

        const queryReq = `INSERT INTO reports (from_address, to_address, report, was_written, expires_at) 
                         VALUES ($1, $2, $3, $4, $5)
                         RETURNING *`

        const values = [from_address, to_address, report, was_written, expires_at || null]
        
        const result = client.query(queryReq, values)
        const created = (await result).rows
        res.status(201).json({
            msg:'УСПЕХ: данные об отчете успешно отправлены на сервер.',
            success: true,
            created: created
        })
    } catch (err) {
        res.status(400).json({success: false, msg: err.message})
    }
})

export default reportsRouter