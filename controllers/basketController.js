const { Food, BasketFood, Basket } = require("../models/models")
const ApiError = require('../error/ApiError');

class BasketController {
    // ------ CRUD корзины ------ //

    async addToBasket(req,res,next){
        const user = req.user
        const {foodId} = req.body
        const basket = await BasketFood.create({basketId : user.id, foodId : foodId})
        return res.json(basket)
    }

    async getBasketUser(req,res){
        const {id} = req.user
        const basket = await BasketFood.findAll({include: {
                model: Food
            }, where: {basketId: id}})

        return res.json(basket)
    }

    async delFromBasket(req, res, next){
        try{
            const {id} = req.body
            const basketF = await BasketFood.destroy(
                {
                    where: {id},
                },
            )
            return res.json(basketF)
        } catch (e) {
            next(ApiError.badRequest(e.message))
        }
    }

}

module.exports = new BasketController()