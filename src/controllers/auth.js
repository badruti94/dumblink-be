const Joi = require("joi")
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const {
    user
} = require('../../models')

exports.login = async (req, res) => {
    const schema = Joi.object({
        email: Joi.string().email().min(6).required(),
        password: Joi.string().min(6).required()
    })

    const {
        error
    } = schema.validate(req.body)

    if (error) {
        return res.status(400).send({
            error: {
                message: error.details[0].message
            }
        })
    }

    try {
        const userExist = await user.findOne({
            where: {
                email: req.body.email
            }
        })

        if (!userExist) {
            return res.status(400).send({
                status: 'failed',
                message: 'user not found'
            })
        }

        const isValid = await bcrypt.compare(req.body.password, userExist.password)
        if (!isValid) {
            return res.status(400).send({
                status: 'failed',
                message: 'credential  is invalid'
            })
        }

        const token = jwt.sign({
            id: userExist.id
        }, process.env.TOKEN_KEY)

        res.send({
            status: 'success',
            data: {
                user: {
                    name: userExist.name,
                    email: userExist.email,
                },
                token
            }
        })

    } catch (error) {
        res.status(500).send({
            status: 'failed',
            message: 'Server Error'
        })
    }
}


exports.register = async (req, res) => {
    const schema = Joi.object({
        name: Joi.string().min(5).required(),
        email: Joi.string().email().min(6).required(),
        password: Joi.string().min(6).required(),
    })

    const {
        error
    } = schema.validate(req.body)

    if (error) {
        return res.status(400).send({
            error: {
                message: error.details[0].message
            }
        })
    }

    try {
        const salt = await bcrypt.genSalt(10)
        const hashPassword = await bcrypt.hash(req.body.password, salt)
        const userInserted = await user.create({
            ...req.body,
            password: hashPassword
        })

        const token = jwt.sign({
            id: userInserted.id
        }, process.env.TOKEN_KEY)

        res.send({
            status: 'success',
            data: {
                user: {
                    name: userInserted.name,
                    email: userInserted.email,
                },
                token
            }
        })

    } catch (error) {
        res.status(500).send({
            status: 'failed',
            message: 'Server Error'
        })
    }
}