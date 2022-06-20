const sequelize = require('../db');
const {DataTypes} = require('sequelize')

const User = sequelize.define('user', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    email: {type: DataTypes.STRING, unique: true,},
    password: {type: DataTypes.STRING},
    role: {type: DataTypes.STRING, defaultValue: "USER"}
})

const Basket = sequelize.define('basket', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
})

const BasketFood = sequelize.define('basket_food', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
})

const Food = sequelize.define('food', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    name: {type: DataTypes.STRING, allowNull: false},
    price: {type: DataTypes.STRING, allowNull: false},
    ingredients: {type: DataTypes.STRING, allowNull: false},
    img: {type: DataTypes.STRING, allowNull: false},
})

const Category = sequelize.define('category', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    name: {type: DataTypes.STRING, unique: true, allowNull: false},
})

const Restaurant = sequelize.define('restaurant', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    name: {type: DataTypes.STRING, unique: true, allowNull: false},
    price: {type: DataTypes.STRING, allowNull: false},
    img: {type: DataTypes.STRING, allowNull: false},
    preview: {type: DataTypes.STRING, allowNull: false},
    timetodelivery: {type: DataTypes.STRING, allowNull: false}, 
})

const CategoryRestaurant = sequelize.define('category_restaurant', { 
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
})

User.hasOne(Basket)
Basket.belongsTo(User)

Basket.hasMany(BasketFood)
BasketFood.belongsTo(Basket)

Category.hasMany(Food)
Food.belongsTo(Category)

Restaurant.hasMany(Food)
Food.belongsTo(Restaurant)

Food.hasMany(BasketFood)
BasketFood.belongsTo(Food)

Category.belongsToMany(Restaurant, {through: CategoryRestaurant})
Restaurant.belongsToMany(Category, {through: CategoryRestaurant})

module.exports = {
    User,
    Basket,
    BasketFood,
    Food,
    Category,
    Restaurant,
    CategoryRestaurant
}