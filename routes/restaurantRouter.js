const Router = require('express');
const router = new Router();
const restaurantController = require('../controllers/restaurantController')
const checkRole = require('../middleware/checkRoleMiddleware')

router.post('/', checkRole('ADMIN'), restaurantController.create)
router.get('/', restaurantController.getAll)
router.get('/:id', restaurantController.getOne)

module.exports = router;