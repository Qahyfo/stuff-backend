const sequelize = require('../db')
const { DataTypes } = require('sequelize')

const User = sequelize.define('user', {
    id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
    email: { type: DataTypes.STRING, unique: true, },
    password: { type: DataTypes.STRING, },
    role: { type: DataTypes.STRING, defaultValue: "USER" }
},
)

const Basket = sequelize.define("basket", {
    id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
})

const BasketProduct = sequelize.define("basket_product", {
    id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
})

const Product = sequelize.define("product", {
    id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
    name: { type: DataTypes.STRING, unique: true, allowNull: false },
    price: { type: DataTypes.INTEGER, defaultValue: 0, allowNull: false },
    img: { type: DataTypes.INTEGER, allowNull: false }
})

const ProductInfo = sequelize.define("product_info", {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    title: { type: DataTypes.STRING, allowNull: false },
    description: { type: DataTypes.STRING, allowNull: false },
})


const Type = sequelize.define("type", {
    id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
    name: { type: DataTypes.STRING, unique: true, allowNull: false },
})

const Brand = sequelize.define("brand", {
    id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
    name: { type: DataTypes.STRING, unique: true, allowNull: false },
})

const TypeBrand = sequelize.define('type_brand', {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
})



User.hasOne(Basket)
Basket.belongsTo(User)

Basket.hasMany(BasketProduct)
BasketProduct.belongsTo(Basket)

BasketProduct.hasOne(Product)
Product.belongsTo(BasketProduct)

Product.hasMany(ProductInfo)
ProductInfo.belongsTo(Product)

Product.hasMany(Type)
Type.belongsTo(Product)

Product.hasMany(Brand)
Brand.belongsTo(Product)

Type.belongsToMany(Brand, { through: TypeBrand })
Brand.belongsToMany(Type, { through: TypeBrand })

module.exports = {
    User,
    Basket,
    Product,
    Type,
    Brand,
    TypeBrand,
    ProductInfo
}

