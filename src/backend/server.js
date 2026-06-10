import express from 'express'
import cors from 'cors'

import dealsRouter from './Routes/dealsRoute.route.js'
import employeesRouter from './Routes/employeesRoute.route.js'
import goodsRouter from './Routes/goodsRoute.route.js'
import reportsRouter from './Routes/reportsRoute.route.js'

const app = express()
app.use(cors())
app.use(express.json())

app.use('/api/deals', dealsRouter)
app.use('/api/employees', employeesRouter)
app.use('/api/goods', goodsRouter)
app.use('/api/reports', reportsRouter)

app.get('/ping', (req, res) => {
    res.json({message: 'Сервер на связи'})
})

app.use((err, req, res, next) => {
    console.error(err.stack)
    res.status(500).json("Внутренняя ошибка сервера")
})

const PORT = 5000
app.listen(PORT, () => console.log(`Сервер запущен на порту ${PORT}`))