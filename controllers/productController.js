const { Product, ProductInfo } = require('../models/models')
const uuid = require('uuid')
const path = require('path');
class ProductController {

    async create(req, res, next) {
        try {
            const { name, price, brandId, typeId, info } = req.body
            const { img } = req.files
            let fileName = uuid.v4() + ".jpg"
            img.mv(path.resolve(__dirname, '..', 'uploads', fileName))
            const device = await Product.create({ name, price, brandId, typeId, img: fileName });

            if (info) {
                info = JSON.parse(info)
                info.forEach(i =>
                    ProductInfo.create({
                        title: i.title,
                        description: i.description,
                        deviceId: device.id
                    })
                )
            }
        } catch (error) {
            next(console.log(error))
        }

    }

    async getAll(req, res) {
        const products = await Product.findAll()
        res.json(products)
    }

    async getOne(req, res) {
        const { id } = req.params
        const product = Product.findOne(
            {
                where: { id },
                include: [{ model: ProductInfo, as: 'info' }]
            }
        )
        return res.json(product)
    }


}

module.exports = new ProductController