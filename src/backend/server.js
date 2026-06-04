import http from 'http'
import Router from './Router.js'
import employees from "../data/employees.json" with {type : "json"}

const router = new Router()
const employeesData = JSON.stringify(employees)

const PORT = 5000

router.request('GET', '/deals', (req, res) => {
    res.writeHead(200, {'Content-type':"application/json"})
    res.end(employeesData)
})

const server = http.createServer((req, res) => {
    router.handle(req, res)
})

server.listen(PORT, () => console.log(`SERVER OK ON PORT ${PORT}`))