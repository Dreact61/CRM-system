import express from 'express'

const goodsRouter = express.Router()

goodsRouter.get('/', (req, res) => {
    res.json('Запрошены данные о товарах')
})

goodsRouter.post('/', (req, res) => {
    res.json('Добавлен новый товар')
})

goodsRouter.get('/', (req, res) => {
    res.json(`Запрошены данные о товаре №${req.params.id}`)
})

export default goodsRouter