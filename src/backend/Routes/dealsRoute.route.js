import express from 'express'

const dealsRouter = express.Router()

router.get('/', (req, res) => {
    res.json({msg: 'Данные с сервера запрошены'})
})
router.post('/', (req, res) => {
    res.json({msg: 'Сделка создана, данные отправлены на сервер'})
})
router.get('/', (req, res) => {
    res.json({msg: `Данные сделки №${req.params.dealId} запрошены с сервера`})
})

export default dealsRouter