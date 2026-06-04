import http from 'http'
import Router from './Router'
import StoreDeals from '../data/typeDeals'

const router = new Router()
const store = new StoreDeals()

const PORT = process.env.PORT || 5000

router.request('GET', '/deals', (req, res) => {
    res.writeHead(200, {'Content-type':"application/json"})
    res.end(store)
})

const server = http.createServer((req, res) => {
    router.handle(req, res)
})

server.listen(PORT, () => console.log(`SERVER OK ON PORT ${PORT}`))