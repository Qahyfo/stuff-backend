const { User, Basket } = require('../models/models')
const bcrypt = require('bcrypt')

class UserController {
    async registration(req, res, next) {
        const { email, password, role } = req.body
        const candidate = User.findOne({ where: { email } })
        if (candidate) {
            return res.status(400).json({ message: "Данный пользователь зарегестрирован" })
        }
        const hashPassword = bcrypt.hash(password, 5)
        const user = await User.create({ email, role, password: hashPassword })
        const basket = await Basket.create({ userId: user.id })
        const token = generateJwt(user.id, user.email, user.role)
        return res.json(token)
    }
}