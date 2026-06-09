import dealsData from '../data/deals.json' with {type: "json"}
import employeesData from '../data/employees.json' with {type: "json"}
import goodsData from '../data/goods.json' with {type: "json"}

import express from 'express'
import cors from 'cors'
import {saveToFile} from './services'

import dealsRouter from './Routes/dealsRoute.route'
import employeesRouter from './Routes/employeesRoute.route'
import goodsRouter from './Routes/goodsRoute.route'
import reportsRouter from './Routes/reportsRoute.route'

const app = express()
app.use(cors())
app.use(express.json())

app.use('/api/deals', dealsRouter)
app.use('/api/employees', employeesRouter)
app.use('/api/goods', goodsRouter)
app.use('/api/reports', reportsRouter)

app.use((err, req, res, next) => {
    console.error(err.stack)
    res.status(500).json("Внутренняя ошибка сервера")
})

app.listen(5000, () => console.log("Сервер запущен на порту 5000"))