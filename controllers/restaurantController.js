const uuid = require('uuid')
const path = require('path');
const {Restaurant} = require('../models/models');
const ApiError = require('../error/ApiError');

class RestaurantController {
    async create(req, res, next){
        try{
            const {name, price, timetodelivery} = req.body;
            const {img, preview} = req.files;
            let imgFileName = uuid.v4(img) + ".jpg";
            let previewFileName = uuid.v4(preview) + ".jpg";
            img.mv(path.resolve(__dirname, '..', 'static', imgFileName));
            preview.mv(path.resolve(__dirname, '..', 'static', previewFileName));
            const restaurant = await Restaurant.create({name, price, timetodelivery, img: imgFileName, preview: previewFileName})

            return res.json(restaurant)
        } catch (e) {
            next(ApiError.badRequest(e.message))
        } 
    }

    async delete(req, res, next){
        try{
            const {id} = req.params
            const restaurant = await Restaurant.drop(
                {
                    where: {id},
                },
            )
            return res.json(restaurant)
        } catch (e) {
            next(ApiError.badRequest(e.message))
        }
    }

    async getAll(req, res){
        const restaurants = await Restaurant.findAll()
        return res.json(restaurants)
    }

    async getOne(req, res){
        const {id} = req.params
        const restaurant = await Restaurant.findOne(
            {
                where: {id},
            },
        )
        return res.json(restaurant)
    }

}

module.exports = new RestaurantController()