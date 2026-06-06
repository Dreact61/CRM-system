import http from 'http'
import employees from "../data/employees.json" with {type : "json"}
import goods from "../data/goods.json" with {type : "json"}
import deals from '../data/deals.json' with {type : "json"}
import report from "../data/reports.json" with {type: "json"}
import process from 'process'

const pid = process.pid

const employeesData = JSON.stringify(employees)
const goodsData = JSON.stringify(goods)
const dealsData = JSON.stringify(deals)
const reportData = JSON.stringify(report)

export const PORT = 5000

const server = http.createServer((req, res) => {
    res.setHeader('Access-Control-Allow-Origin', 'http://localhost:5173')
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS')
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization')

    try{
        if (req.method === 'OPTIONS') {
            res.writeHead(204)
            res.end()
            return 
        }
        
        if (req.method === 'GET') {
            res.writeHead(200, {'Content-Type':'application/json'})
            const combinedData = {
                employees: employeesData,
                goods: goodsData,
                deals: dealsData,
                reports: reportData
            }
            res.end(JSON.stringify(combinedData))
        }
    } catch(err) {
        console.error(err)
        res.writeHead(err.message)
        res.end(`Error: ${err}`)
    }
})


server.listen(PORT, () => console.log(`SERVER OK ON PORT ${PORT} (id:${pid})`))