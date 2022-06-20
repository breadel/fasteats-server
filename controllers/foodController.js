const uuid = require('uuid')
const path = require('path')
const {Food} = require ('../models/models')
const ApiError = require ('../error/ApiError')

class FoodController {
    async create(req, res, next){
        try{
            const {name, price, ingredients, categoryId, restaurantId} = req.body
            const {img} = req.files
            let fileName = uuid.v4() + ".jpg"
            img.mv(path.resolve(__dirname, '..', 'static', fileName));

            const food = await Food.create({name, price, ingredients, categoryId, restaurantId, img: fileName})

            return res.json(food)
        } catch (e) {
            next(ApiError.badRequest(e.message))
        } 

    }

    async getAll(req, res){
        const {categoryId, restaurantId} = req.query
        let foods;
        if (!categoryId) {
            foods = await Food.findAll({where:{restaurantId}})
        }
        if (categoryId) {
            foods = await Food.findAll()
        }
        return res.json(foods)
    }

}

module.exports = new FoodController()