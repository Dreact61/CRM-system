import express from 'express'
import cors from 'cors'
import {Client} from 'pg'
import dotenv from 'dotenv'

import dealsRouter from './Routes/dealsRoute.route.js'
import employeesRouter from './Routes/employeesRoute.route.js'
import goodsRouter from './Routes/goodsRoute.route.js'
import reportsRouter from './Routes/reportsRoute.route.js'

dotenv.config()
const app = express()
app.use(cors())
app.use(express.json())

const client = new Client ({
    host: process.env.DB_HOST || 'localhost',
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME || 'CRM',
    user: process.env.DB_USER || 'postgres',
    port: Number(process.env.DB_PORT) || 5432
})
export default client
await client.connect()

app.use('/api/deals', dealsRouter)
app.use('/api/employees', employeesRouter)
app.use('/api/goods', goodsRouter)
app.use('/api/reports', reportsRouter)

const dbCheck = await client.query('select current_database()')
console.log('Connected to database:', dbCheck.rows[0].current_database)

const PORT = 5000
app.listen(PORT, () => console.log(`Сервер запущен на порту ${PORT}`))