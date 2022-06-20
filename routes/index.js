const Router = require('express');
const router = new Router();
const foodRouter = require('./foodRouter')
const userRouter = require('./userRouter')
const restaurantRouter = require('./restaurantRouter')
const categoryRouter = require('./categoryRouter')
const basketRouter = require('./basketRouter')

router.use('/user', userRouter)
router.use('/category', categoryRouter)
router.use('/restaurant', restaurantRouter)
router.use('/food', foodRouter)
router.use('/basket', basketRouter)

module.exports = router;