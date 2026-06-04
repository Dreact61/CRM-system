export default class Router {
    constructor() {
        this.routes = {
            GET: {},
            POST: {},
            PUT: {},
            DELETE: {}
        }
    }

    request(method, path, handler) {
        const upperMethod = method.toUpperCase()
        if (this.routes[upperMethod]) {
            this.routes[upperMethod][path] = handler
        } else {
            console.error = `ERROR: This route doesn't support method ${upperMethod}`
        }
    }

    handle(req, res) {
        const {method, url} = req
        
        const handler = this.routes[method]?.[url]

        if (!handler) {
            res.writeHead(404, {'Content-type': "text/plain"})
            res.end(`Route ${method} ${url} Not Found`)
        } else {
            handler(req, res)
        }
    }
}